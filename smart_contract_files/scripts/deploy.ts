import { ethers } from "hardhat";

async function main() {
  // Get the contract factory
  const ProduceTracker = await ethers.getContractFactory("ProduceTracker");

  // Deploy the contract
  const produceTracker = await ProduceTracker.deploy();

  // Wait until deployment is confirmed
  await produceTracker.waitForDeployment();

  console.log("ProduceTracker deployed to:", await produceTracker.getAddress());
}

// Run the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
