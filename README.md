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
