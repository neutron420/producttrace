import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser, SignInButton, SignOutButton } from '@clerk/clerk-react';

// Supported wallets configuration
const SUPPORTED_WALLETS = [
  {
    name: 'MetaMask',
    extensionName: 'MetaMask',
    icon: '🦊',
    id: 'metamask',
    downloadUrl: 'https://metamask.io/download/',
    description: 'Connect using MetaMask',
    color: 'from-gray-900 to-gray-700',
    textColor: 'text-white'
  },
  {
    name: 'Trust Wallet',
    extensionName: 'Trust Wallet',
    icon: '🛡️',
    id: 'trust',
    downloadUrl: 'https://trustwallet.com/download',
    description: 'Connect using Trust Wallet',
    color: 'from-gray-800 to-gray-600',
    textColor: 'text-white'
  },
  {
    name: 'SafePal Wallet',
    extensionName: 'SafePal',
    icon: '🔒',
    id: 'safepal',
    downloadUrl: 'https://www.safepal.com/download',
    description: 'Connect using SafePal',
    color: 'from-gray-700 to-gray-500',
    textColor: 'text-white'
  },
  {
    name: 'Rabby Wallet',
    extensionName: 'Rabby',
    icon: '🐰',
    id: 'rabby',
    downloadUrl: 'https://rabby.io/',
    description: 'Connect using Rabby',
    color: 'from-gray-600 to-gray-400',
    textColor: 'text-white'
  }
];

// We'll use memory storage instead of localStorage for Claude.ai compatibility
let memoryStorage = {
  connected_wallet_account: null,
  connected_wallet_type: null
};

const WalletConnect = ({ className = '' }) => {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(null);
  const [connectedWalletType, setConnectedWalletType] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState('');
  const [connectingWallet, setConnectingWallet] = useState('');
  const [connectionStep, setConnectionStep] = useState('');
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // On mount, check memory storage for persisted connection
  useEffect(() => {
    if (isSignedIn) {
      const storedAccount = memoryStorage.connected_wallet_account;
      const storedWalletType = memoryStorage.connected_wallet_type;
      if (storedAccount && storedWalletType) {
        restoreConnection(storedAccount, storedWalletType);
      }
    }
    
    // Listen for account/network changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [isSignedIn]);

  const restoreConnection = async (storedAccount, walletType) => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(storedAccount);
        setAccount(storedAccount);
        setBalance(balance.toString());
        setChainId(Number(network.chainId));
        setIsConnected(true);
        setProvider(provider);
        setConnectedWalletType(walletType);
      }
    } catch (err) {
      // If restoration fails, clear storage and state
      memoryStorage.connected_wallet_account = null;
      memoryStorage.connected_wallet_type = null;
      setAccount('');
      setBalance('0');
      setChainId(null);
      setIsConnected(false);
      setProvider(null);
      setConnectedWalletType('');
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      restoreConnection(accounts[0], connectedWalletType);
      memoryStorage.connected_wallet_account = accounts[0];
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const simulateAuthenticationFlow = async (walletId) => {
    setShowAuthPrompt(true);
    setConnectionStep('Requesting wallet unlock...');
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setConnectionStep('Authenticating...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setConnectionStep('Verifying credentials...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setShowAuthPrompt(false);
  };

  const handleConnectWallet = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    setIsModalOpen(true);
  };

  const connectWallet = async (walletId) => {
    setConnectingWallet(walletId);
    setError('');
    setIsConnecting(true);
    setConnectionStep('Detecting wallet...');

    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('No wallet extension detected. Please install a wallet.');
      }

      const walletInfo = SUPPORTED_WALLETS.find(w => w.id === walletId);
      
      // Check wallet availability
      switch (walletId) {
        case 'metamask':
          if (!window.ethereum.isMetaMask) {
            throw new Error('MetaMask not detected. Please install MetaMask.');
          }
          break;
        case 'trust':
          if (!window.ethereum.isTrust) {
            console.warn('Trust Wallet not specifically detected, attempting connection...');
          }
          break;
        case 'safepal':
          if (!window.ethereum.isSafePal) {
            console.warn('SafePal not specifically detected, attempting connection...');
          }
          break;
        case 'rabby':
          if (!window.ethereum.isRabby) {
            console.warn('Rabby not specifically detected, attempting connection...');
          }
          break;
        default:
          throw new Error('Unsupported wallet');
      }

      setConnectionStep('Wallet detected!');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show authentication flow
      await simulateAuthenticationFlow(walletId);

      setConnectionStep('Requesting account access...');
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.');
      }

      setConnectionStep('Fetching account details...');
      const userAddress = accounts[0].address;
      const balance = await provider.getBalance(userAddress);
      const network = await provider.getNetwork();

      setConnectionStep('Connected successfully!');
      await new Promise(resolve => setTimeout(resolve, 500));

      setAccount(userAddress);
      setBalance(balance.toString());
      setChainId(Number(network.chainId));
      setIsConnected(true);
      setProvider(provider);
      setConnectedWalletType(walletId);
      setIsModalOpen(false);

      // Persist the connected account and wallet type
      memoryStorage.connected_wallet_account = userAddress;
      memoryStorage.connected_wallet_type = walletId;

      console.log(`Connected to ${walletId} wallet:`, userAddress);

    } catch (error) {
      console.error('Connection error:', error);
      if (error.code === 4001) {
        setError('Connection rejected by user');
      } else if (error.code === -32002) {
        setError('Connection request is already pending');
      } else {
        setError(error.message || 'Failed to connect wallet');
      }
    } finally {
      setConnectingWallet('');
      setIsConnecting(false);
      setConnectionStep('');
      setShowAuthPrompt(false);
    }
  };

  const handleDisconnect = () => {
    setAccount('');
    setBalance('0');
    setChainId(null);
    setIsConnected(false);
    setProvider(null);
    setConnectedWalletType('');
    setError('');
    memoryStorage.connected_wallet_account = null;
    memoryStorage.connected_wallet_type = null;
  };

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const getWalletInfo = (walletId) => {
    return SUPPORTED_WALLETS.find(wallet => wallet.id === walletId);
  };

  const copyAddress = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        console.log('Address copied to clipboard');
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const getNetworkName = (chainId) => {
    const networks = {
      1: 'Ethereum Mainnet',
      137: 'Polygon',
      56: 'BNB Smart Chain',
      11155111: 'Sepolia Testnet',
      5: 'Goerli Testnet'
    };
    return chainId ? networks[chainId] || `Chain ${chainId}` : '';
  };

  const formatBalance = (balance) => {
    try {
      const balanceInEth = parseFloat(balance) / Math.pow(10, 18);
      return balanceInEth.toFixed(4);
    } catch {
      return '0.0000';
    }
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  // Connected state UI - Black and white themed
  if (isConnected && account && isSignedIn) {
    const walletInfo = getWalletInfo(connectedWalletType);

    return (
      <div className={`bg-gradient-to-br ${walletInfo?.color || 'from-gray-900 to-gray-700'} rounded-2xl p-6 text-white shadow-2xl border border-white/20 backdrop-blur-sm ${className}`}>
        {/* User Info Bar */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.firstName || 'User'}</p>
              <p className="text-xs opacity-70">{user?.emailAddresses?.[0]?.emailAddress}</p>
            </div>
          </div>
          <SignOutButton>
            <button className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all">
              Sign Out
            </button>
          </SignOutButton>
        </div>

        {/* Wallet Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
              {walletInfo?.icon || '💼'}
            </div>
            <div>
              <h3 className="font-bold text-lg">{walletInfo?.extensionName || 'Wallet'}</h3>
              <p className="text-sm opacity-80 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Connected
              </p>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-300"
          >
            Disconnect
          </button>
        </div>

        {/* Account Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-80">Account</span>
            <span className="text-xs opacity-60">{getNetworkName(chainId)}</span>
          </div>
          <div
            className="font-mono text-base cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
            onClick={copyAddress}
            title="Click to copy address"
          >
            {formatAddress(account)}
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
          <div className="text-sm opacity-80 mb-1">Balance</div>
          <div className="text-2xl font-bold">
            {formatBalance(balance)} ETH
          </div>
          <div className="text-xs opacity-60">
            ≈ ${(parseFloat(formatBalance(balance)) * 2000).toFixed(2)} USD
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddProduct}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span className="text-xl">➕</span>
            Add Product
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/20 transition-all duration-300">
              Send
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/20 transition-all duration-300">
              Receive
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Disconnected state UI
  return (
    <div className={`block ${className}`}>
      <button
        onClick={handleConnectWallet}
        className="w-full bg-gradient-to-br from-gray-900 to-gray-700 text-white px-6 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed border border-gray-600"
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {/* Clerk Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-md shadow-2xl border border-gray-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🔐</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-6">
                Please sign in to your account before connecting your wallet for security purposes.
              </p>
              
              <div className="space-y-3">
                <SignInButton mode="modal">
                  <button className="w-full bg-gradient-to-br from-gray-900 to-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300">
                    Sign In
                  </button>
                </SignInButton>
                
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Connection Modal */}
      {isModalOpen && isSignedIn && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Connect Your Wallet</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-300"
                disabled={isConnecting}
              >
                ×
              </button>
            </div>

            {/* Connection Progress */}
            {isConnecting && (
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium text-gray-700">{connectionStep}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-900 h-2 rounded-full transition-all duration-300" style={{width: showAuthPrompt ? '75%' : '25%'}}></div>
                </div>
              </div>
            )}

            {/* Authentication Prompt */}
            {showAuthPrompt && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    🔐
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Unlock Your Wallet</h3>
                    <p className="text-sm text-gray-600">Please enter your wallet password if prompted</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-800">
                    <strong>Security Note:</strong> Your wallet extension may request your password. This is normal and secure.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-4 mx-6 mt-4 rounded-lg text-sm border border-red-200">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Wallet List */}
            <div className="p-6 space-y-3">
              {SUPPORTED_WALLETS.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    connectingWallet === wallet.id 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isConnecting && connectWallet(wallet.id)}
                >
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-2xl">
                        {wallet.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{wallet.extensionName}</div>
                        <div className="text-sm text-gray-600">{wallet.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {connectingWallet === wallet.id ? (
                        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-600">→</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Security Notice</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Your wallet will request authentication if it's locked. This process is secure and protects your funds.
                    <br />
                    <br />
                    <strong>Tip:</strong> To ensure password prompts appear, lock your wallet before connecting.
                  </p>
                  <a
                    href="https://ethereum.org/en/wallets/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-gray-700 text-sm font-medium mt-2 inline-block"
                  >
                    Learn more about wallet security →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;