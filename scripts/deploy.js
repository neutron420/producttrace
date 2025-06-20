const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");


  console.log("Deploying ProductTracker contract...");
  const ProductTracker = await ethers.getContractFactory("ProductTracker");
  const productTracker = await ProductTracker.deploy();

  await productTracker.waitForDeployment();
  const contractAddress = await productTracker.getAddress();

  console.log("ProductTracker deployed to:", contractAddress);
  console.log("Contract owner:", await productTracker.owner());

  // Verify deployment
  console.log("Verifying deployment...");
  const totalProducts = await productTracker.getTotalProducts();
  console.log("Total products in system:", totalProducts.toString());

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  console.log("\n=== Deployment Summary ===");
  console.log("Network:", deploymentInfo.network);
  console.log("Contract Address:", deploymentInfo.contractAddress);
  console.log("Deployer:", deploymentInfo.deployer);
  console.log("Deployment Time:", deploymentInfo.deploymentTime);
  console.log("Block Number:", deploymentInfo.blockNumber);
  console.log("========================\n");

  // Optional: Add some example authorized addresses (uncomment if needed)
  /*
  console.log("Adding example authorized manufacturers and certifiers...");
  
  // Example addresses - replace with actual addresses
  const exampleManufacturer = "0x1234567890123456789012345678901234567890";
  const exampleCertifier = "0x0987654321098765432109876543210987654321";
  
  try {
    await productTracker.addAuthorizedManufacturer(exampleManufacturer);
    console.log("Added authorized manufacturer:", exampleManufacturer);
    
    await productTracker.addAuthorizedCertifier(exampleCertifier);
    console.log("Added authorized certifier:", exampleCertifier);
  } catch (error) {
    console.log("Note: Could not add example addresses (they may be invalid)");
  }
  */

  console.log("Deployment completed successfully!");
  
  return {
    productTracker,
    contractAddress,
    deploymentInfo
  };
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });