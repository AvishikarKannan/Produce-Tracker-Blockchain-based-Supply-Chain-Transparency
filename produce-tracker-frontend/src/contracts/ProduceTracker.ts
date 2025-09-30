import { ethers } from "ethers";

// Contract ABI
export const produceTrackerABI = [
  "function addProduce(string name, string origin, uint256 price, string location) external",
  "function addUpdate(uint256 id, uint8 status, string action, string location) external",
  "function getProduce(uint256 id) view returns (uint256, string, string, uint256, uint8)",
  "function getHistory(uint256 id) view returns (tuple(uint8 status, string action, string location, address actor, uint256 timestamp)[])",
  "function totalProduces() view returns (uint256)"
];

export async function getContract() {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS!;
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    throw new Error("MetaMask not installed");
  }

  // ✅ Wrap ethereum with BrowserProvider
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []); // Ask user to connect wallet
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, produceTrackerABI, signer);
}
