import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import TraceLogicHomepage from './pages/HomePage';
import CareerPage from './pages/Career'; // Renamed from Career to CareerPage
import TeamPage from './pages/Team';
import Footer from './components/ui/Footer';
import AboutPage from './pages/AboutPage';
import AddProduct from './pages/AddProduct';
import TrackProduct from './pages/TrackProduct';
import MainPage from './pages/Main';
import ProductsPage from './pages/ProductPage';
import WalletConnect from './pages/WalletConnect'; // Import the WalletConnect component

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<TraceLogicHomepage />} />
            <Route path="/connect-wallet" element={<WalletConnectPage />} /> {/* Added WalletConnect route */}
            <Route path="/career" element={<CareerPage />} /> {/* Updated to CareerPage */}
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/track-product" element={<TrackProduct />} />
            <Route path="/Main" element={<MainPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/reports" element={<div>Reports Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            <Route path="/integrations" element={<div>Integrations Page</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Create a page component for the WalletConnect
function WalletConnectPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your Web3 wallet to start using TraceLogic's blockchain-powered 
            product tracking and verification system.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-16">
          <WalletConnect className="w-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure</h3>
            <p className="text-gray-600">Your wallet connection is secure and encrypted with industry-standard protocols</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast</h3>
            <p className="text-gray-600">Quick and seamless wallet integration with instant transaction confirmations</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌐</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Chain</h3>
            <p className="text-gray-600">Support for multiple blockchain networks including Ethereum, Polygon, and BSC</p>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Connect Your Wallet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Authentication</h3>
                <p className="text-gray-600">Verify the authenticity of products using blockchain-based certificates</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Supply Chain Tracking</h3>
                <p className="text-gray-600">Track your products throughout the entire supply chain journey</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Decentralized Records</h3>
                <p className="text-gray-600">Maintain immutable records of all product transactions and movements</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Contracts</h3>
                <p className="text-gray-600">Automated verification and validation through smart contract technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}