import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';

// Supported wallets configuration
const SUPPORTED_WALLETS = [
  {
    name: 'MetaMask',
    extensionName: 'MetaMask',
    icon: '🦊',
    id: 'metamask',
    downloadUrl: 'https://metamask.io/download/',
    description: 'Connect using MetaMask'
  },
  {
    name: 'Trust Wallet',
    extensionName: 'Trust Wallet: Crypto & Bitcoin Wallet',
    icon: '🛡️',
    id: 'trust',
    downloadUrl: 'https://trustwallet.com/download',
    description: 'Connect using Trust Wallet'
  },
  {
    name: 'SafePal Wallet',
    extensionName: 'SafePal Wallet',
    icon: '🔒',
    id: 'safepal',
    downloadUrl: 'https://www.safepal.com/download',
    description: 'Connect using SafePal'
  },
  {
    name: 'Rabby Wallet',
    extensionName: 'Rabby Wallet',
    icon: '🐰',
    id: 'rabby',
    downloadUrl: 'https://rabby.io/',
    description: 'Connect using Rabby'
  }
];

const LOCAL_STORAGE_KEY = 'connected_wallet_account';

const WalletConnect = ({ className = '' }) => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [connectingWallet, setConnectingWallet] = useState('');

  const navigate = useNavigate();

  // On mount, check localStorage for persisted connection
  useEffect(() => {
    const storedAccount = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAccount) {
      // Try to restore provider and account info
      restoreConnection(storedAccount);
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
    // eslint-disable-next-line
  }, []);

  const restoreConnection = async (storedAccount: string) => {
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
      }
    } catch (err) {
      // If restoration fails, clear storage and state
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setAccount('');
      setBalance('0');
      setChainId(null);
      setIsConnected(false);
      setProvider(null);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      // Update account and balance
      restoreConnection(accounts[0]);
      localStorage.setItem(LOCAL_STORAGE_KEY, accounts[0]);
    }
  };

  const handleChainChanged = () => {
    // Reload the page to update network info
    window.location.reload();
  };

  const getConnectedWalletType = () => {
    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.isTrust) return 'trust';
      if (window.ethereum.isSafePal) return 'safepal';
      if (window.ethereum.isRabby) return 'rabby';
      if (window.ethereum.isMetaMask) return 'metamask';
    }
    return 'unknown';
  };

  const connectWallet = async (walletId: string) => {
    setConnectingWallet(walletId);
    setError('');
    setIsConnecting(true);

    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('No wallet extension detected. Please install a wallet.');
      }

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

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.');
      }

      const userAddress = accounts[0].address;
      const balance = await provider.getBalance(userAddress);
      const network = await provider.getNetwork();

      setAccount(userAddress);
      setBalance(balance.toString());
      setChainId(Number(network.chainId));
      setIsConnected(true);
      setProvider(provider);
      setIsModalOpen(false);

      // Persist the connected account
      localStorage.setItem(LOCAL_STORAGE_KEY, userAddress);

      console.log(`Connected to ${walletId} wallet:`, userAddress);

    } catch (error: any) {
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
    }
  };

  const handleDisconnect = () => {
    setAccount('');
    setBalance('0');
    setChainId(null);
    setIsConnected(false);
    setProvider(null);
    setError('');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const getWalletInfo = (walletId: string) => {
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

  const getNetworkName = (chainId: number | null) => {
    const networks: { [key: number]: string } = {
      1: 'Ethereum',
      137: 'Polygon',
      56: 'BSC',
      11155111: 'Sepolia',
      5: 'Goerli'
    };
    return chainId ? networks[chainId] || `Chain ${chainId}` : '';
  };

  const formatBalance = (balance: string) => {
    try {
      const balanceInEth = parseFloat(balance) / Math.pow(10, 18);
      return balanceInEth.toFixed(4);
    } catch {
      return '0.0000';
    }
  };

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate('/add-product');
  };

  // Connected state UI
  if (isConnected && account) {
    const walletType = getConnectedWalletType();
    const walletInfo = getWalletInfo(walletType);

    return (
      <div className={`bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-6 text-white shadow-lg ${className}`}>
        <div className="flex justify-between items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{walletInfo?.icon || '💼'}</span>
              <div className="flex flex-col">
                <span className="font-semibold">{walletInfo?.extensionName || walletInfo?.name || 'Wallet'}</span>
                {chainId && (
                  <span className="text-xs opacity-80">{getNetworkName(chainId)}</span>
                )}
              </div>
            </div>
            <div
              className="font-mono text-sm cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
              onClick={copyAddress}
              title="Click to copy"
            >
              {formatAddress(account)}
            </div>
            <div className="text-xs opacity-80 mt-1">
              Balance: {formatBalance(balance)} ETH
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all"
          >
            Disconnect
          </button>
        </div>

        {/* Add Product Button */}
        <div className="border-t border-white/20 pt-4">
          <button
            onClick={handleAddProduct}
            className="w-full bg-white/20 border border-white/30 text-white px-4 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-lg">➕</span>
            Add Product
          </button>
        </div>
      </div>
    );
  }

  // Disconnected state UI
  return (
    <div className={`block ${className}`}>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-gradient-to-br from-gray-900 to-gray-700 text-white px-6 py-4 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Connect Wallet</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 mx-5 mt-4 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            {/* Wallet List */}
            <div className="p-5 space-y-2">
              {SUPPORTED_WALLETS.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`flex justify-between items-center p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all ${
                    connectingWallet === wallet.id || isConnecting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => !isConnecting && connectWallet(wallet.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{wallet.extensionName || wallet.name}</div>
                      <div className="text-sm text-gray-600">{wallet.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {connectingWallet === wallet.id ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                    ) : (
                      <span className="text-lg text-gray-500">→</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* --- SECURITY NOTICE --- */}
            <div className="p-5 border-t border-gray-200 text-center bg-yellow-50 rounded-b-2xl">
              <p className="text-sm text-gray-800">
                <strong>Wallet Security Notice:</strong><br />
                For your safety, your wallet extension will ask for your password <b>only if it is locked</b>.<br />
                If you do not see a password prompt, your wallet is already unlocked.<br />
                <span className="text-xs text-gray-600">
                  (To force a password prompt, <b>lock your wallet</b> from the extension before connecting.)
                </span>
                <br />
                <a
                  href="https://ethereum.org/en/wallets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Learn more about wallet security
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
