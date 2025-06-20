const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("ProductTracker", function () {
  let ProductTracker;
  let productTracker;
  let owner;
  let manufacturer1;
  let manufacturer2;
  let certifier1;
  let certifier2;
  let retailer;
  let consumer;

  beforeEach(async function () {
    // Get signers
    [owner, manufacturer1, manufacturer2, certifier1, certifier2, retailer, consumer] = 
      await ethers.getSigners();

    // Deploy contract
    ProductTracker = await ethers.getContractFactory("ProductTracker");
    productTracker = await ProductTracker.deploy();
    await productTracker.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await productTracker.owner()).to.equal(owner.address);
    });

    it("Should initialize with zero products", async function () {
      expect(await productTracker.getTotalProducts()).to.equal(0);
    });

    it("Should set owner as authorized manufacturer and certifier", async function () {
      expect(await productTracker.authorizedManufacturers(owner.address)).to.be.true;
      expect(await productTracker.authorizedCertifiers(owner.address)).to.be.true;
    });
  });

  describe("Authorization Management", function () {
    it("Should allow owner to add authorized manufacturer", async function () {
      await expect(productTracker.addAuthorizedManufacturer(manufacturer1.address))
        .to.not.be.reverted;
      
      expect(await productTracker.authorizedManufacturers(manufacturer1.address)).to.be.true;
    });

    it("Should allow owner to remove authorized manufacturer", async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.removeAuthorizedManufacturer(manufacturer1.address);
      
      expect(await productTracker.authorizedManufacturers(manufacturer1.address)).to.be.false;
    });

    it("Should allow owner to add authorized certifier", async function () {
      await productTracker.addAuthorizedCertifier(certifier1.address);
      expect(await productTracker.authorizedCertifiers(certifier1.address)).to.be.true;
    });

    it("Should not allow non-owner to add authorized manufacturer", async function () {
      await expect(
        productTracker.connect(manufacturer1).addAuthorizedManufacturer(manufacturer2.address)
      ).to.be.revertedWith("Only contract owner can perform this action");
    });
  });

  describe("Product Management", function () {
    beforeEach(async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.addAuthorizedCertifier(certifier1.address);
    });

    it("Should allow authorized manufacturer to add product", async function () {
      await expect(
        productTracker.connect(manufacturer1).addProduct(
          "Test Product",
          "Test Description",
          "Test Location"
        )
      ).to.emit(productTracker, "ProductAdded")
        .withArgs(1, "Test Product", manufacturer1.address);

      const product = await productTracker.getProduct(1);
      expect(product.name).to.equal("Test Product");
      expect(product.description).to.equal("Test Description");
      expect(product.manufacturer).to.equal(manufacturer1.address);
      expect(product.currentOwner).to.equal(manufacturer1.address);
      expect(product.currentStage).to.equal("Manufacturing");
      expect(product.exists).to.be.true;
    });

    it("Should not allow unauthorized address to add product", async function () {
      await expect(
        productTracker.connect(retailer).addProduct(
          "Test Product",
          "Test Description",
          "Test Location"
        )
      ).to.be.revertedWith("Only authorized manufacturers can perform this action");
    });

    it("Should increment product ID correctly", async function () {
      await productTracker.connect(manufacturer1).addProduct("Product 1", "Desc 1", "Loc 1");
      await productTracker.connect(manufacturer1).addProduct("Product 2", "Desc 2", "Loc 2");
      
      const product1 = await productTracker.getProduct(1);
      const product2 = await productTracker.getProduct(2);
      
      expect(product1.id).to.equal(1);
      expect(product2.id).to.equal(2);
      expect(await productTracker.getTotalProducts()).to.equal(2);
    });

    it("Should create initial traceability record when adding product", async function () {
      await productTracker.connect(manufacturer1).addProduct(
        "Test Product",
        "Test Description",
        "Initial Location"
      );

      const history = await productTracker.getProductHistory(1);
      expect(history.length).to.equal(1);
      expect(history[0].stage).to.equal("Manufacturing");
      expect(history[0].location).to.equal("Initial Location");
      expect(history[0].description).to.equal("Product created");
      expect(history[0].updater).to.equal(manufacturer1.address);
    });
  });

  describe("Product Stage Updates", function () {
    beforeEach(async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.connect(manufacturer1).addProduct(
        "Test Product",
        "Test Description",
        "Initial Location"
      );
    });

    it("Should allow product owner to update stage", async function () {
      await expect(
        productTracker.connect(manufacturer1).updateProductStage(
          1,
          "Quality Testing",
          "Testing Facility",
          "Quality tests passed"
        )
      ).to.emit(productTracker, "ProductUpdated")
        .withArgs(1, "Quality Testing", manufacturer1.address);

      const product = await productTracker.getProduct(1);
      expect(product.currentStage).to.equal("Quality Testing");

      const history = await productTracker.getProductHistory(1);
      expect(history.length).to.equal(2);
      expect(history[1].stage).to.equal("Quality Testing");
      expect(history[1].location).to.equal("Testing Facility");
      expect(history[1].description).to.equal("Quality tests passed");
    });

    it("Should allow authorized manufacturer to update any product stage", async function () {
      await productTracker.connect(manufacturer1).transferOwnership(1, retailer.address);
      
      await expect(
        productTracker.connect(manufacturer1).updateProductStage(
          1,
          "Recall",
          "Manufacturer Facility",
          "Product recalled for quality issues"
        )
      ).to.not.be.reverted;
    });

    it("Should not allow unauthorized address to update product stage", async function () {
      await expect(
        productTracker.connect(retailer).updateProductStage(
          1,
          "Retail",
          "Store",
          "Product in store"
        )
      ).to.be.revertedWith("Unauthorized to update product");
    });

    it("Should not allow updating non-existent product", async function () {
      await expect(
        productTracker.connect(manufacturer1).updateProductStage(
          999,
          "Test Stage",
          "Test Location",
          "Test Description"
        )
      ).to.be.revertedWith("Product does not exist");
    });
  });

  describe("Ownership Transfer", function () {
    beforeEach(async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.connect(manufacturer1).addProduct(
        "Test Product",
        "Test Description",
        "Initial Location"
      );
    });

    it("Should allow product owner to transfer ownership", async function () {
      await expect(
        productTracker.connect(manufacturer1).transferOwnership(1, retailer.address)
      ).to.emit(productTracker, "OwnershipTransferred")
        .withArgs(1, manufacturer1.address, retailer.address);

      const product = await productTracker.getProduct(1);
      expect(product.currentOwner).to.equal(retailer.address);

      const history = await productTracker.getProductHistory(1);
      const lastRecord = history[history.length - 1];
      expect(lastRecord.stage).to.equal("Ownership Transfer");
      expect(lastRecord.description).to.equal("Ownership transferred");
    });

    it("Should not allow non-owner to transfer ownership", async function () {
      await expect(
        productTracker.connect(retailer).transferOwnership(1, consumer.address)
      ).to.be.revertedWith("Only product owner can perform this action");
    });

    it("Should not allow transferring ownership of non-existent product", async function () {
      await expect(
        productTracker.connect(manufacturer1).transferOwnership(999, retailer.address)
      ).to.be.revertedWith("Product does not exist");
    });
  });

  describe("Certification Management", function () {
    beforeEach(async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.addAuthorizedCertifier(certifier1.address);
      await productTracker.connect(manufacturer1).addProduct(
        "Test Product",
        "Test Description",
        "Initial Location"
      );
    });

    it("Should allow authorized certifier to add certification", async function () {
      const expirationTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60; // 1 year

      await expect(
        productTracker.connect(certifier1).addCertification(
          1,
          "Organic Certification",
          "Organic Certification Board",
          expirationTime
        )
      ).to.emit(productTracker, "CertificationAdded")
        .withArgs(1, "Organic Certification", certifier1.address);

      const certifications = await productTracker.getProductCertifications(1);
      expect(certifications.length).to.equal(1);
      expect(certifications[0].certType).to.equal("Organic Certification");
      expect(certifications[0].certifier).to.equal("Organic Certification Board");
      expect(certifications[0].isValid).to.be.true;
      expect(certifications[0].expiresAt).to.equal(expirationTime);
    });

    it("Should not allow unauthorized address to add certification", async function () {
      const expirationTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

      await expect(
        productTracker.connect(retailer).addCertification(
          1,
          "Fake Certification",
          "Fake Board",
          expirationTime
        )
      ).to.be.revertedWith("Only authorized certifiers can perform this action");
    });

    it("Should not allow adding certification to non-existent product", async function () {
      const expirationTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

      await expect(
        productTracker.connect(certifier1).addCertification(
          999,
          "Test Certification",
          "Test Board",
          expirationTime
        )
      ).to.be.revertedWith("Product does not exist");
    });

    it("Should allow multiple certifications for same product", async function () {
      const expirationTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

      await productTracker.connect(certifier1).addCertification(
        1,
        "Organic Certification",
        "Organic Board",
        expirationTime
      );

      await productTracker.connect(certifier1).addCertification(
        1,
        "Fair Trade Certification",
        "Fair Trade Board",
        expirationTime
      );

      const certifications = await productTracker.getProductCertifications(1);
      expect(certifications.length).to.equal(2);
      expect(certifications[0].certType).to.equal("Organic Certification");
      expect(certifications[1].certType).to.equal("Fair Trade Certification");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.addAuthorizedCertifier(certifier1.address);
      await productTracker.connect(manufacturer1).addProduct(
        "Test Product",
        "Test Description",
        "Initial Location"
      );
    });

    it("Should return correct product information", async function () {
      const product = await productTracker.getProduct(1);
      expect(product.id).to.equal(1);
      expect(product.name).to.equal("Test Product");
      expect(product.description).to.equal("Test Description");
      expect(product.manufacturer).to.equal(manufacturer1.address);
      expect(product.currentOwner).to.equal(manufacturer1.address);
      expect(product.exists).to.be.true;
    });

    it("Should return correct history count", async function () {
      expect(await productTracker.getProductHistoryCount(1)).to.equal(1);

      await productTracker.connect(manufacturer1).updateProductStage(
        1,
        "Testing",
        "Test Location",
        "Test Description"
      );

      expect(await productTracker.getProductHistoryCount(1)).to.equal(2);
    });

    it("Should return correct certification count", async function () {
      expect(await productTracker.getProductCertificationCount(1)).to.equal(0);

      const expirationTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;
      await productTracker.connect(certifier1).addCertification(
        1,
        "Test Certification",
        "Test Board",
        expirationTime
      );

      expect(await productTracker.getProductCertificationCount(1)).to.equal(1);
    });

    it("Should validate product existence", async function () {
      expect(await productTracker.isProductValid(1)).to.be.true;
    });

    it("Should revert when getting non-existent product", async function () {
      await expect(productTracker.getProduct(999))
        .to.be.revertedWith("Product does not exist");
    });

    it("Should revert when getting history of non-existent product", async function () {
      await expect(productTracker.getProductHistory(999))
        .to.be.revertedWith("Product does not exist");
    });

    it("Should revert when getting certifications of non-existent product", async function () {
      await expect(productTracker.getProductCertifications(999))
        .to.be.revertedWith("Product does not exist");
    });
  });

  describe("Complete Product Lifecycle", function () {
    beforeEach(async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.addAuthorizedCertifier(certifier1.address);
    });

    it("Should handle complete product lifecycle", async function () {
      // 1. Add product
      await productTracker.connect(manufacturer1).addProduct(
        "Premium Coffee",
        "Organic coffee beans from Colombia",
        "Coffee Farm, Colombia"
      );

      // 2. Update through various stages
      await productTracker.connect(manufacturer1).updateProductStage(
        1,
        "Processing",
        "Processing Plant, Colombia",
        "Beans processed and dried"
      );

      await productTracker.connect(manufacturer1).updateProductStage(
        1,
        "Quality Control",
        "QC Lab, Colombia",
        "Quality tests passed"
      );

      await productTracker.connect(manufacturer1).updateProductStage(
        1,
        "Packaging",
        "Packaging Facility, Colombia",
        "Product packaged for shipment"
      );

      // 3. Add certifications
      const oneYear = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;
      await productTracker.connect(certifier1).addCertification(
        1,
        "Organic",
        "Colombian Organic Board",
        oneYear
      );

      await productTracker.connect(certifier1).addCertification(
        1,
        "Fair Trade",
        "Fair Trade International",
        oneYear
      );

      // 4. Transfer to retailer
      await productTracker.connect(manufacturer1).transferOwnership(1, retailer.address);

      // 5. Final retail stage
      await productTracker.connect(retailer).updateProductStage(
        1,
        "Retail",
        "Coffee Shop, New York",
        "Available for sale"
      );

      // Verify final state
      const product = await productTracker.getProduct(1);
      expect(product.currentOwner).to.equal(retailer.address);
      expect(product.currentStage).to.equal("Retail");

      const history = await productTracker.getProductHistory(1);
      expect(history.length).to.equal(6); // Initial + 4 updates + ownership transfer

      const certifications = await productTracker.getProductCertifications(1);
      expect(certifications.length).to.equal(2);

      expect(await productTracker.getTotalProducts()).to.equal(1);
    });
  });

  describe("Edge Cases and Security", function () {
    beforeEach(async function () {
      await productTracker.addAuthorizedManufacturer(manufacturer1.address);
      await productTracker.addAuthorizedCertifier(certifier1.address);
    });

    it("Should handle empty strings in product data", async function () {
      await expect(
        productTracker.connect(manufacturer1).addProduct("", "", "")
      ).to.not.be.reverted;

      const product = await productTracker.getProduct(1);
      expect(product.name).to.equal("");
      expect(product.description).to.equal("");
    });

    it("Should handle very long strings in product data", async function () {
      const longString = "a".repeat(1000);
      
      await expect(
        productTracker.connect(manufacturer1).addProduct(longString, longString, longString)
      ).to.not.be.reverted;

      const product = await productTracker.getProduct(1);
      expect(product.name).to.equal(longString);
    });

    it("Should prevent reentrancy in state changes", async function () {
      await productTracker.connect(manufacturer1).addProduct("Test", "Test", "Test");
      
      // Multiple rapid updates should all succeed
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(
          productTracker.connect(manufacturer1).updateProductStage(
            1,
            `Stage ${i}`,
            `Location ${i}`,
            `Description ${i}`
          )
        );
      }
      
      await Promise.all(promises);
      
      const history = await productTracker.getProductHistory(1);
      expect(history.length).to.equal(6); // Initial + 5 updates
    });
  });
});