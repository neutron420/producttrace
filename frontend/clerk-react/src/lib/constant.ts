// src/lib/constant.ts

// 👇 Replace with your actual deployed contract address on Ethereum Mainnet
export const CONTRACT_ADDRESS = "0xcf24c7803eF5EEC1B224eDAAa840be3aaE5b1b69";

// Network configurations
export const NETWORK_CONFIG = {
  MAINNET: {
    chainId: "0x1",
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY", // Replace with your Infura key
    blockExplorer: "https://etherscan.io"
  },
  SEPOLIA: {
    chainId: "0xaa36a7",
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY", // Replace with your Infura key
    blockExplorer: "https://sepolia.etherscan.io"
  }
};

// Current network (change this to switch networks)
export const CURRENT_NETWORK = NETWORK_CONFIG.MAINNET;

// Contract ABI - Make sure this matches your deployed contract
export const CONTRACT_METHODS = {
  ADD_PRODUCT: "addProduct",
  GET_PRODUCT_DETAILS: "getProductDetails",
  UPDATE_PRODUCT_STATUS: "updateProductStatus"
};