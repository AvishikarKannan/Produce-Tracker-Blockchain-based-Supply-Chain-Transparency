import abiJson from "./abi/ProduceTracker.json";
import { ethers } from "ethers";

export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string;
export const CONTRACT_ABI = abiJson.abi;

// Use RPC provider for read-only calls
const rpcUrl = process.env.REACT_APP_NETWORK_RPC as string;
const rpcProvider = new ethers.JsonRpcProvider(rpcUrl);

export async function getContract() {
  try {
    // If MetaMask exists, connect signer for write
    if ((window as any).ethereum) {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }

    // Otherwise, use RPC provider (read-only)
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, rpcProvider);
  } catch (err) {
    console.error("Error creating contract:", err);
    throw err;
  }
}
