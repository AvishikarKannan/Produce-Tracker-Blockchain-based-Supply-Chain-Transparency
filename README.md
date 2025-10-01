# Produce Tracker – Blockchain-based Supply Chain Transparency

Produce Tracker is a blockchain-powered agriculture supply chain tracking system.  
It ensures transparency and traceability of farm produce from farmers to consumers using smart contracts and a user-friendly web interface.

---

## Smart Contract

- **Contract Name:** ProduceTracker  
- **Network:** Polygon Amoy Testnet  
- **Deployed Address:** `0x574Bf70bd29eD62D26F37B0c5E13746938341982`  
- **Verified Source Code:** [View on PolygonScan](https://amoy.polygonscan.com/address/0x574Bf70bd29eD62D26F37B0c5E13746938341982#code)

### Features
- Farmers can register new produce batches with product details and origin.  
- Distributors and retailers can add transport and location updates.  
- All updates are stored immutably on the blockchain.  
- Consumers can scan a QR code to verify produce history.  

---

## Technology Stack

- **Smart Contracts:** Solidity, Hardhat, OpenZeppelin  
- **Frontend:** React, Bootstrap, Leaflet (maps), qrcode.react  
- **Blockchain Library:** Ethers.js (v6)  
- **Network:** Polygon Amoy Testnet  
- **Storage:** IPFS/Pinata (for metadata, optional)

---

## Repository Structure

```plaintext
.
├── contracts/        # Hardhat project with Solidity smart contracts
├── frontend/         # React web app for interacting with the smart contract
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (>= 18)  
- MetaMask or WalletConnect  
- Polygon Amoy Testnet configured with test MATIC  

### Running the Smart Contract
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts --network polygonAmoy
```

### Running the Frontend 
```
cd frontend
npm install
npm start
```
Once started, the app will be available at [http://localhost:3000](http://localhost:3000).

---

## Workflow

- Farmer registers produce → stored on-chain.  
- Distributor/Retailer adds updates → location + status updated immutably.  
- QR code is generated → consumer scans to verify history.  
- Consumers view journey map and timestamps in the React app.  

---

## Business Model

- **Subscription Fees:** Farmers, distributors, and retailers pay a nominal fee for using the system.  
- **Transaction-based Charges:** Each blockchain update has a minimal transaction cost (gas).  
- **Data Insights & Reporting Services:** Aggregated data can be offered to policymakers, cooperatives, and exporters.  
- **Licensing:** Technology can be licensed to large supply chains.  
- **White-label Partnerships:** Exporters and retailers can use customized versions for their operations.  

---

## Cost Structure (Estimates)

### Smart Contract & Blockchain Costs
- Deployment (Polygon Amoy → Polygon Mainnet): **₹4,000 – ₹8,000** per contract  
- Gas Fees (Polygon): **₹0.15 – ₹0.80** per transaction  

### Infrastructure & Hosting
- React Frontend Hosting (Vercel/Netlify): **₹1,600 – ₹8,000/month**  
- IPFS/Pinata for Metadata: **₹2,000 – ₹4,000/month**  
- Map APIs / Indexing (The Graph, Infura, Alchemy): **₹8,000 – ₹24,000/month**  

### Security & Maintenance
- Regular monitoring & updates: **₹40,000 – ₹80,000/month**  

---

## Future Enhancements

- NFT-based produce identity for digital certificates of origin.  
- IPFS integration for QR code and metadata storage.  
- Integration with The Graph for faster indexing and queries.  
- Deployment on Polygon Mainnet for production use.

  ## Contributors ✨

Thanks goes to these wonderful people:

<a href="https://github.com/sejal-sai">
  <img src="https://avatars.githubusercontent.com/sejal-sai" width="50px;" alt="Teammate 1"/>
</a>

<a href="https://github.com/sejal2525">
  <img src="https://avatars.githubusercontent.com/sejal2525" width="50px;" alt="Teammate 1"/>
</a>
