const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const User = await ethers.getContractFactory("User");

  // Deploy the contract
  const user = await User.deploy();
  await user.waitForDeployment(); // Wait for the deployment to be mined

  // Use getAddress() to get the contract address in Ethers.js v6+
  const userAddress = await user.getAddress();
  
  console.log("User contract deployed to:", userAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
