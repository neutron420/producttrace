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

- **ProductTracker.sol**: Main contract handling all product operations
- **Authorization System**: Manages authorized manufacturers and certifiers
- **Product Management**: Handles product creation, updates, and lifecycle tracking
- **Certification System**: Manages product certifications and validations
- **Ownership Transfer**: Facilitates secure ownership transfers between parties

### Data Structures

- **Product**: Core product information including ID, name, description, manufacturer, and current status
- **TraceabilityRecord**: Individual records tracking product movement and updates
- **Certification**: Product certifications with validity periods and certifying authorities

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd producttrace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Compile contracts**
   ```bash
   npm run compile
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
```

### Network Configuration

The project supports multiple networks:
- **Hardhat Network**: Local development
- **Localhost**: Local Hardhat node
- **Sepolia**: Ethereum testnet
- **Mainnet**: Ethereum mainnet

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests with gas reporting
npm run gas-report

# Run tests with coverage
npm run coverage
```

### Test Coverage

The test suite covers:
- Contract deployment and initialization
- Authorization management
- Product creation and management
- Stage updates and lifecycle tracking
- Ownership transfers
- Certification management
- Edge cases and security scenarios

## 📦 Deployment

### Local Development

1. **Start Hardhat node**
   ```bash
   npm run node
   ```

2. **Deploy to local network**
   ```bash
   npm run deploy:local
   ```

### Testnet Deployment

1. **Deploy to Sepolia**
   ```bash
   npm run deploy:sepolia
   ```

2. **Verify contract on Etherscan**
   ```bash
   npm run verify:sepolia CONTRACT_ADDRESS
   ```

### Mainnet Deployment

```bash
npm run deploy:mainnet
```

## 🎯 Usage Examples

### Adding a Product

```javascript
const productTracker = await ethers.getContractAt("ProductTracker", contractAddress);

// Add authorized manufacturer
await productTracker.addAuthorizedManufacturer(manufacturerAddress);

// Add product
const tx = await productTracker.connect(manufacturer).addProduct(
  "Organic Coffee Beans",
  "Premium organic coffee from Colombia",
  "Coffee Farm, Colombia"
);
```

### Updating Product Stage

```javascript
await productTracker.connect(manufacturer).updateProductStage(
  productId,
  "Quality Testing",
  "Testing Facility, Colombia",
  "Product passed all quality tests"
);
```

### Adding Certification

```javascript
const expirationDate = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60); // 1 year
await productTracker.connect(certifier).addCertification(
  productId,
  "Organic Certification",
  "Colombian Organic Certification Board",
  expirationDate
);
```

### Transferring Ownership

```javascript
await productTracker.connect(currentOwner).transferOwnership(productId, newOwnerAddress);
```

### Querying Product Information

```javascript
// Get product details
const product = await productTracker.getProduct(productId);

// Get complete history
const history = await productTracker.getProductHistory(productId);

// Get certifications
const certifications = await productTracker.getProductCertifications(productId);
```

## 🔐 Security Features

- **Access Control**: Role-based permissions for different operations
- **Input Validation**: Comprehensive validation of all inputs
- **Event Logging**: Complete audit trail of all operations
- **Immutable Records**: Blockchain-based immutability ensures data integrity
- **Gas Optimization**: Efficient code to prevent DoS attacks

## 📊 Contract Functions

### Public Functions

- `addProduct()`: Add a new product to the system
- `updateProductStage()`: Update product stage and location
- `transferOwnership()`: Transfer product ownership
- `addCertification()`: Add product certification
- `getProduct()`: Retrieve product information
- `getProductHistory()`: Get complete product history
- `getProductCertifications()`: Get product certifications

### Admin Functions

- `addAuthorizedManufacturer()`: Authorize new manufacturer
- `removeAuthorizedManufacturer()`: Remove manufacturer authorization
- `addAuthorizedCertifier()`: Authorize new certifier
- `removeAuthorizedCertifier()`: Remove certifier authorization

## 🎨 Frontend Integration

The smart contract is designed to integrate with various frontend technologies:

### Web3 Integration

```javascript
// Connect to contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, abi, provider);

// Query product by scanning QR code
const productId = getProductIdFromQR(qrCode);
const product = await contract.getProduct(productId);
```

### QR Code Generation

Products can be assigned QR codes containing:
- Product ID
- Contract address
- Network information
- Direct link to product verification page

## 🔄 Continuous Integration

The project includes configurations for:
- Automated testing on push/PR
- Gas usage reporting
- Security scanning
- Code coverage reporting

## 📈 Gas Optimization

The contract is optimized for gas efficiency:
- Packed structs to minimize storage slots
- Efficient loops and operations
- Minimal external calls
- Optimized storage patterns

## 🛠️ Development Scripts

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy locally
npm run deploy:local

# Add sample product
npm run add-product

# Clean artifacts
npm run clean

# Start Hardhat console
npm run console
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the test files for usage examples

## 🔮 Future Enhancements

- Integration with IoT devices for automated updates
- Mobile app for QR code scanning
- Integration with existing ERP systems
- Multi-chain support
- Advanced analytics and reporting
- Decentralized storage integration (IPFS)

---

**Note**: This is a production-ready smart contract system. Always test thoroughly on testnets before mainnet deployment.