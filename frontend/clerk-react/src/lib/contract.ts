// src/lib/contract.ts
import Web3 from "web3";
import MyContractABI from "./abi/MyContractABI.json";
import { CONTRACT_ADDRESS } from "./constant";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Initialize Web3 instance
let web3: Web3 | null = null;

// Get Web3 instance with proper error handling
export const getWeb3Instance = async (): Promise<Web3> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed! Please install MetaMask to use this app.");
  }

  try {
    // Create new Web3 instance using MetaMask provider
    web3 = new Web3(window.ethereum);
    return web3;
  } catch (error) {
    console.error("Error creating Web3 instance:", error);
    throw new Error("Failed to initialize Web3. Please refresh and try again.");
  }
};

// Connect wallet function
export const connectWallet = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length === 0) {
      throw new Error("No accounts found. Please unlock MetaMask.");
    }

    console.log("Wallet connected:", accounts[0]);
    return accounts[0];
  } catch (error: any) {
    console.error("Error connecting wallet:", error);
    if (error.code === 4001) {
      throw new Error("User rejected the connection request.");
    }
    throw new Error("Failed to connect wallet: " + error.message);
  }
};

// Get current account
export const getCurrentAccount = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length === 0) {
      throw new Error("No accounts connected. Please connect your wallet first.");
    }

    return accounts[0];
  } catch (error) {
    console.error("Error getting current account:", error);
    throw new Error("Failed to get account. Please ensure MetaMask is connected.");
  }
};

// Check if wallet is connected
export const isWalletConnected = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    return accounts.length > 0;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return false;
  }
};

// Check network (Ethereum Mainnet)
export const checkNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    // Ethereum Mainnet chain ID
    const mainnetChainId = "0x1";

    if (chainId !== mainnetChainId) {
      // Try to switch to mainnet
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: mainnetChainId }],
        });
        return true;
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          throw new Error("Please manually switch to Ethereum Mainnet in MetaMask.");
        }
        throw new Error(`Failed to switch to Ethereum Mainnet. Current network: ${chainId}`);
      }
    }

    return true;
  } catch (error: any) {
    console.error("Error checking network:", error);
    throw error;
  }
};

// Get contract instance
export const getContract = async () => {
  try {
    const web3Instance = await getWeb3Instance();
    
    // Ensure we have a connected account
    const account = await getCurrentAccount();
    console.log("Using account:", account);

    // Create contract instance
    const contract = new web3Instance.eth.Contract(
      MyContractABI as any,
      CONTRACT_ADDRESS
    );

    return contract;
  } catch (error) {
    console.error("Error getting contract:", error);
    throw error;
  }
};

// Add product function
export const addProduct = async (
  productId: string,
  name: string,
  origin: string,
  status: string
) => {
  try {
    // Validate inputs
    if (!productId || !name || !origin || !status) {
      throw new Error("All fields are required");
    }

    // Get current account
    const account = await getCurrentAccount();
    console.log("Adding product with account:", account);

    // Get contract instance
    const contract = await getContract();

    // Estimate gas
    console.log("Estimating gas...");
    const gasEstimate = await contract.methods
      .addProduct(productId, name, origin, status)
      .estimateGas({ from: account });

    console.log("Gas estimate:", gasEstimate);

    // Send transaction
    console.log("Sending transaction...");
    const result = await contract.methods
      .addProduct(productId, name, origin, status)
      .send({
        from: account,
        gas: Math.floor(Number(gasEstimate) * 1.2), // Add 20% buffer
      });

    console.log("Transaction successful:", result);
    return result;
  } catch (error: any) {
    console.error("Error in addProduct:", error);
    
    // Enhanced error handling
    if (error.message?.includes("revert")) {
      throw new Error("Transaction failed: " + error.message);
    } else if (error.message?.includes("gas")) {
      throw new Error("Gas estimation failed: " + error.message);
    } else if (error.code === 4001) {
      throw new Error("User rejected the transaction");
    } else if (error.message?.includes("insufficient funds")) {
      throw new Error("Insufficient ETH balance for gas fees");
    }
    
    throw error;
  }
};

// Get product function
export const getProduct = async (productId: string) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    const contract = await getContract();
    console.log("Getting product details for:", productId);

    const result = await contract.methods
      .getProductDetails(productId)
      .call();

    console.log("Product data:", result);
    return result;
  } catch (error: any) {
    console.error("Error in getProduct:", error);
    
    if (error.message?.includes("revert")) {
      throw new Error("Product not found or invalid Product ID");
    }
    
    throw error;
  }
};

// Listen for account changes
if (typeof window !== "undefined" && window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    if (accounts.length === 0) {
      console.log("Wallet disconnected");
    } else {
      console.log("Account changed to:", accounts[0]);
    }
  });

  window.ethereum.on("chainChanged", (chainId: string) => {
    console.log("Network changed to:", chainId);
    // Reload the page to reset the Web3 instance
    window.location.reload();
  });
}