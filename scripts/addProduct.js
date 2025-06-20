const { ethers } = require("hardhat");

async function main() {
  console.log("Starting product addition example...");

  // Get signers
  const [owner, manufacturer, certifier, retailer] = await ethers.getSigners();
  
  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
  
  // Get contract instance
  const ProductTracker = await ethers.getContractFactory("ProductTracker");
  const productTracker = ProductTracker.attach(CONTRACT_ADDRESS);

  console.log("Connected to ProductTracker at:", CONTRACT_ADDRESS);
  console.log("Contract owner:", await productTracker.owner());

  try {
    // Add authorized manufacturer and certifier
    console.log("\n=== Setting up authorized users ===");
    await productTracker.connect(owner).addAuthorizedManufacturer(manufacturer.address);
    console.log("Added authorized manufacturer:", manufacturer.address);
    
    await productTracker.connect(owner).addAuthorizedCertifier(certifier.address);
    console.log("Added authorized certifier:", certifier.address);

    // Add a new product
    console.log("\n=== Adding new product ===");
    const tx1 = await productTracker.connect(manufacturer).addProduct(
      "Organic Coffee Beans",
      "Premium organic coffee beans from Colombia",
      "Colombia, South America"
    );
    const receipt1 = await tx1.wait();
    
    // Get product ID from event
    const productAddedEvent = receipt1.logs.find(log => {
      try {
        const parsedLog = productTracker.interface.parseLog(log);
        return parsedLog.name === "ProductAdded";
      } catch (error) {
        return false;
      }
    });
    
    const productId = productAddedEvent ? 
      productTracker.interface.parseLog(productAddedEvent).args.productId : 1n;
    
    console.log("Product added with ID:", productId.toString());

    // Update product stage
    console.log("\n=== Updating product stage ===");
    await productTracker.connect(manufacturer).updateProductStage(
      productId,
      "Quality Testing",
      "Testing Facility, Colombia",
      "Product passed quality control tests"
    );
    console.log("Updated product stage to: Quality Testing");

    await productTracker.connect(manufacturer).updateProductStage(
      productId,
      "Packaging",
      "Packaging Facility, Colombia",
      "Product packaged for shipment"
    );
    console.log("Updated product stage to: Packaging");

    await productTracker.connect(manufacturer).updateProductStage(
      productId,
      "Shipping",
      "Port of Cartagena, Colombia",
      "Product shipped to retailer"
    );
    console.log("Updated product stage to: Shipping");

    // Add certification
    console.log("\n=== Adding certification ===");
    const oneYearFromNow = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60);
    await productTracker.connect(certifier).addCertification(
      productId,
      "Organic Certification",
      "Colombian Organic Certification Board",
      oneYearFromNow
    );
    console.log("Added organic certification");

    // Transfer ownership
    console.log("\n=== Transferring ownership ===");
    await productTracker.connect(manufacturer).transferOwnership(productId, retailer.address);
    console.log("Transferred ownership to retailer:", retailer.address);

    // Final update by new owner
    await productTracker.connect(retailer).updateProductStage(
      productId,
      "Retail",
      "Coffee Shop, New York",
      "Product available for sale"
    );
    console.log("Updated product stage to: Retail");

    // Display product information
    console.log("\n=== Product Information ===");
    const product = await productTracker.getProduct(productId);
    console.log("Product ID:", product.id.toString());
    console.log("Name:", product.name);
    console.log("Description:", product.description);
    console.log("Manufacturer:", product.manufacturer);
    console.log("Current Owner:", product.currentOwner);
    console.log("Current Stage:", product.currentStage);
    console.log("Created At:", new Date(Number(product.createdAt) * 1000).toLocaleString());

    // Display product history
    console.log("\n=== Product History ===");
    const history = await productTracker.getProductHistory(productId);
    history.forEach((record, index) => {
      console.log(`\nRecord ${index + 1}:`);
      console.log("  Stage:", record.stage);
      console.log("  Location:", record.location);
      console.log("  Description:", record.description);
      console.log("  Timestamp:", new Date(Number(record.timestamp) * 1000).toLocaleString());
      console.log("  Updated by:", record.updater);
    });

    // Display certifications
    console.log("\n=== Product Certifications ===");
    const certifications = await productTracker.getProductCertifications(productId);
    certifications.forEach((cert, index) => {
      console.log(`\nCertification ${index + 1}:`);
      console.log("  Type:", cert.certType);
      console.log("  Certifier:", cert.certifier);
      console.log("  Issued At:", new Date(Number(cert.issuedAt) * 1000).toLocaleString());
      console.log("  Expires At:", new Date(Number(cert.expiresAt) * 1000).toLocaleString());
      console.log("  Valid:", cert.isValid);
    });

    console.log("\n=== Summary ===");
    console.log("Total products in system:", (await productTracker.getTotalProducts()).toString());
    console.log("Product traceability demo completed successfully!");

  } catch (error) {
    console.error("Error during product operations:", error);
    
    // Try to get more details about the error
    if (error.reason) {
      console.error("Error reason:", error.reason);
    }
    if (error.code) {
      console.error("Error code:", error.code);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });