
# Product Traceability Blockchain System

A comprehensive blockchain-based product traceability system built with Solidity and Hardhat. This system enables transparent tracking of products throughout their entire lifecycle, from manufacturing to retail, with immutable records stored on the Ethereum blockchain.

## 🌟 Features

- **Immutable Product Records**: All product information is stored permanently on the blockchain  
- **Complete Traceability**: Track products through every stage of their lifecycle  
- **Authorization System**: Role-based access control for manufacturers, certifiers, and other stakeholders  
- **Certification Management**: Add and manage product certifications with expiration dates  
- **Ownership Transfer**: Seamless transfer of product ownership between parties  
- **Event Logging**: Comprehensive event system for monitoring all contract interactions  
- **Gas Optimized**: Efficient smart contract design to minimize transaction costs  

## 🏗️ System Architecture

### Smart Contract Components

- `ProductTracker.sol`: Main contract handling all product operations  
- Authorization System: Manages authorized manufacturers and certifiers  
- Product Management: Handles product creation, updates, and lifecycle tracking  
- Certification System: Manages product certifications and validations  
- Ownership Transfer: Facilitates secure ownership transfers between parties  

### Data Structures

- **Product**: Core product information including ID, name, description, manufacturer, and current status  
- **TraceabilityRecord**: Individual records tracking product movement and updates  
- **Certification**: Product certifications with validity periods and certifying authorities  

## 📋 Prerequisites

- Node.js (v16 or higher)  
- npm or yarn  
- Git  

## 🚀 Installation

```bash
# Clone the repository
git clone <repository-url>
cd producttrace

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=https://sepolia.infura.io/v3/your_infura_project_id
MAINNET_URL=https://mainnet.infura.io/v3/your_infura_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key
REPORT_GAS=true

PRODUCT_TRACKER_ADDRESS_LOCALHOST=
PRODUCT_TRACKER_ADDRESS_SEPOLIA=0xcf24c7803eF5EEC1B224eDAAa840be3aaE5b1b69
```

### Network Configuration

The project supports multiple networks:
- **Hardhat Network**: Local development  
- **Localhost**: Local Hardhat node  
- **Sepolia**: Ethereum testnet  
- **Mainnet**: Ethereum mainnet

# Testnet Deployment Notes
Sepolia ETH used from Chainstack Faucet and ETH Drips 25

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with gas reporting
npm run gas-report

# Run tests with coverage
npm run coverage
```

### Test Coverage

Covers:
- Deployment & Initialization  
- Authorization  
- Product Lifecycle  
- Certification Handling  
- Ownership Transfer  
- Edge Cases & Failures  

## 📦 Deployment

### Local Development

```bash
# Start local Hardhat node
npm run node

# Deploy to local network
npm run deploy:local
```

### Sepolia Testnet Deployment

```bash
# Deploy to Sepolia
npm run deploy:sepolia

# Verify on Etherscan
npm run verify:sepolia 0xcf24c7803eF5EEC1B224eDAAa840be3aaE5b1b69
```

### Mainnet Deployment

```bash
npm run deploy:mainnet
```

---

## ✅ Verified Deployment

- **Network**: Ethereum Sepolia Testnet  
- **Contract Address**: [`0xcf24c7803eF5EEC1B224eDAAa840be3aaE5b1b69`](https://sepolia.etherscan.io/address/0xcf24c7803eF5EEC1B224eDAAa840be3aaE5b1b69#code)  
- **Status**: ✅ Verified on Etherscan

📸 **Deployment Screenshot**:  
> ![Deployment Confirmation](![Screenshot (70)](https://github.com/user-attachments/assets/4574e9c5-cfdc-47ba-b92e-57c4dfe7e479)
)
> (![Screenshot (71)](https://github.com/user-attachments/assets/3f547870-3c8c-457e-b370-fbd2e6c829d3)
)

---

## 🎯 Usage Examples

### Add a Product

```js
await productTracker.connect(manufacturer).addProduct(
  "Organic Coffee Beans",
  "Premium organic coffee from Colombia",
  "Coffee Farm, Colombia"
);
```

### Update Product Stage

```js
await productTracker.connect(manufacturer).updateProductStage(
  productId,
  "Quality Testing",
  "Testing Facility, Colombia",
  "Product passed all quality tests"
);
```

### Add Certification

```js
const expirationDate = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60);
await productTracker.connect(certifier).addCertification(
  productId,
  "Organic Certification",
  "Colombian Organic Certification Board",
  expirationDate
);
```

### Transfer Ownership

```js
await productTracker.connect(currentOwner).transferOwnership(productId, newOwnerAddress);
```

### Query Product Info

```js
const product = await productTracker.getProduct(productId);
const history = await productTracker.getProductHistory(productId);
const certifications = await productTracker.getProductCertifications(productId);
```

---

## 🔐 Security Features

- **Role-Based Access**  
- **Event Logging**  
- **Input Validation**  
- **Gas Efficiency**  

---

## 📈 Contract Functions

### Public Functions

- `addProduct()`  
- `updateProductStage()`  
- `transferOwnership()`  
- `addCertification()`  
- `getProduct()`  
- `getProductHistory()`  
- `getProductCertifications()`  

### Admin Functions

- `addAuthorizedManufacturer()` / `removeAuthorizedManufacturer()`  
- `addAuthorizedCertifier()` / `removeAuthorizedCertifier()`  

---

## 🌐 Frontend Integration

### Web3 Example

```js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, abi, provider);
const product = await contract.getProduct(productId);
```

### QR Code Use

QR code can contain:
- Product ID  
- Contract address  
- Network  
- Link to view product  

---

## 🛠️ Dev Scripts

```bash
npm run compile
npm run test
npm run deploy:local
npm run add-product
npm run clean
npm run console
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch  
3. Commit changes  
4. Add tests  
5. Submit a PR  

---

## 📄 License

MIT License - See `LICENSE` file.

---

##  Support

- Open an issue on GitHub  
- Refer to test examples  
- Use the Hardhat console  

---

##  Future Enhancements

- IoT integration  
- Mobile scanner app  
- ERP syncing  
- Multi-chain support  
- Analytics dashboards  
- IPFS storage  

---

**Note**: This is a production-ready system. Always test it on Testnet thoroughly before deploying to Ethereum Mainnet.
