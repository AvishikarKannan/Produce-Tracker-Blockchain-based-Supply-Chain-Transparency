import React, { useState, useEffect } from "react";
import { getContract } from "./ethersConfig";
import { QRCodeSVG } from "qrcode.react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Accordion,
} from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

interface Update {
  status: number;
  action: string;
  location: string;
  actor: string;
  timestamp: number;
}

function App() {
  const [produceId, setProduceId] = useState<number>(0);
  const [history, setHistory] = useState<Update[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const count = await contract.totalProduces();
      setTotal(Number(count));

      if (produceId > 0) {
        if (produceId < 1 || produceId > Number(count)) {
          setError(`⚠️ Invalid Produce ID. Choose between 1 and ${count}`);
          setHistory([]);
          setLoading(false);
          return;
        }

        const rawUpdates: any[] = await contract.getHistory(produceId);

        if (!rawUpdates || rawUpdates.length === 0) {
          setError("⚠️ No history found for this Produce ID.");
          setHistory([]);
          setLoading(false);
          return;
        }

        const parsed: Update[] = rawUpdates.map((u: any) => ({
          status: Number(u.status ?? u[0]),
          action: u.action ?? u[1],
          location: u.location ?? u[2],
          actor: u.actor ?? u[3],
          timestamp: Number(u.timestamp ?? u[4]),
        }));

        setHistory(parsed);
        setError("");
      }
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError("⚠️ Could not fetch data. Check network or contract.");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produceId]);

  const parseLocation = (loc: string): [number, number] | null => {
    const parts = loc.split(",");
    return parts.length === 2 ? [parseFloat(parts[0]), parseFloat(parts[1])] : null;
  };

  const statusToText = (status: number) => {
    switch (status) {
      case 0:
        return "🌱 Farm";
      case 1:
        return "🚚 Distributor";
      case 2:
        return "🏪 Retailer";
      case 3:
        return "🛒 Consumer";
      default:
        return "❓ Unknown";
    }
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4 fw-bold">🌍 Produce Tracker</h1>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label className="fw-semibold">
                Enter Produce ID (1 - {total}):
              </Form.Label>
              <Row>
                <Col xs={8} sm={10}>
                  <Form.Control
                    type="number"
                    value={produceId}
                    onChange={(e) => setProduceId(Number(e.target.value))}
                    placeholder="Enter Produce ID"
                  />
                </Col>
                <Col xs={4} sm={2}>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={loadData}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Load"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {produceId > 0 && history.length > 0 && (
        <>
          <Row>
            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Header className="fw-bold">📜 Journey History</Card.Header>
                <Card.Body>
                  <Accordion alwaysOpen>
                    {history.map((u, idx) => (
                      <Accordion.Item eventKey={String(idx)} key={idx}>
                        <Accordion.Header>
                          {statusToText(u.status)} — {u.action}
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            <strong>📍 Location:</strong> {u.location}
                          </p>
                          <p>
                            <strong>👤 Actor:</strong> {u.actor}
                          </p>
                          <p>
                            <strong>🕒 Timestamp:</strong>{" "}
                            {new Date(u.timestamp * 1000).toLocaleString()}
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm mb-4 text-center">
                <Card.Header className="fw-bold">📱 QR Code</Card.Header>
                <Card.Body>
                  <QRCodeSVG
                    value={`produce:${String(produceId)}`}
                    size={180}
                  />
                  <p className="mt-3 text-muted">
                    Scan to verify this produce on blockchain
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="shadow-sm">
            <Card.Header className="fw-bold">🗺️ Journey Map</Card.Header>
            <Card.Body style={{ height: "450px" }}>
              <MapContainer
                center={[20, 78] as LatLngExpression}
                zoom={4}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {history.map((u, idx) => {
                  const coords = parseLocation(u.location);
                  if (!coords) return null;
                  return (
                    <Marker key={idx} position={coords as LatLngExpression}>
                      <Popup>
                        <strong>{u.action}</strong>
                        <br />
                        {u.location}
                      </Popup>
                    </Marker>
                  );
                })}

                <Polyline
                  positions={
                    history
                      .map((u) => parseLocation(u.location))
                      .filter(
                        (loc): loc is [number, number] => loc !== null
                      ) as LatLngExpression[]
                  }
                  pathOptions={{ color: "blue" }}
                />
              </MapContainer>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}

export default App;
