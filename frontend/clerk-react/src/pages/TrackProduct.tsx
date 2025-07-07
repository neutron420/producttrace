// src/components/TrackProduct.tsx
import { useState } from "react";
import {
  connectWallet,
  getProduct,
  isWalletConnected,
  checkNetwork
} from "../lib/contract";
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Package, MapPin, Clock, List, Home } from 'lucide-react'; // Import icons

const TrackProduct = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState<any>(null);
  const [message, setMessage] = useState(""); // Unified message for status/errors
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!productId.trim()) {
      setMessage("❌ Please enter a Product ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setProductData(null);

    try {
      setMessage("🔗 Checking wallet connection...");
      const connected = await isWalletConnected();
      if (!connected) {
        setMessage("🔗 Connecting to MetaMask...");
        await connectWallet();
      }

      setMessage("🌐 Checking network...");
      await checkNetwork();

      setMessage("⏳ Fetching product details...");
      const data = await getProduct(productId);

      // Assuming data structure from contract is [name, origin, status]
      // Adjust if your contract returns an object with named properties
      const parsedData = {
        name: data[0] || "N/A",
        origin: data[1] || "N/A",
        status: data[2] || "N/A",
      };

      setProductData(parsedData);
      setMessage("✅ Product details loaded successfully!");
    } catch (err: any) {
      console.error("Error tracking product:", err);

      if (err.message?.includes("User rejected")) {
        setMessage("❌ Connection rejected by user.");
      } else if (err.message?.includes("MetaMask")) {
        setMessage("❌ MetaMask error: " + err.message);
      } else if (err.message?.includes("Product not found") || err.message?.includes("revert")) {
        setMessage("❌ Product not found. Please check the Product ID and try again.");
      } else if (err.message?.includes("network") || err.message?.includes("chain")) {
        setMessage("❌ Network error: Please switch to Ethereum Mainnet.");
      } else if (err.message?.includes("insufficient funds")) {
        setMessage("❌ Insufficient ETH balance for gas fees.");
      } else {
        setMessage("❌ Error: " + (err.message || "Failed to fetch product details"));
      }
      setProductData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && productId.trim()) {
      handleTrack();
    }
  };

  // Function to get status color (reusing logic from MainPage/ProductPage)
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) { // Ensure case-insensitivity
      case 'manufactured': return 'bg-gray-100 text-black';
      case 'in transit': return 'bg-gray-300 text-black';
      case 'warehouse': return 'bg-gray-400 text-black';
      case 'delivered': return 'bg-gray-700 text-white';
      case 'quality check': return 'bg-gray-200 text-black';
      default: return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-4 pt-24 pb-12 md:pt-32">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl px-8 py-10 md:px-12 md:py-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black text-center mb-8 tracking-tight leading-tight">
          Track Product
        </h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="productId" className="block text-sm font-semibold text-black mb-1">Product ID</label>
            <input
              type="text"
              id="productId"
              placeholder="Enter Product ID to track"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition disabled:bg-gray-100"
              disabled={loading}
              maxLength={50}
              autoFocus
            />
          </div>

          <button
            onClick={handleTrack}
            disabled={loading || !productId.trim()}
            className="w-full py-3 rounded-lg bg-black text-white font-semibold shadow-sm hover:bg-gray-900 transition disabled:bg-gray-200 disabled:text-gray-500"
          >
            {loading ? "Tracking..." : "Track Product"}
          </button>
        </div>

        {message && (
          <div
            className={`mt-6 px-4 py-3 rounded-lg text-center text-sm font-medium border ${
              message.includes("✅")
                ? "border-green-400 text-green-700 bg-green-50"
                : message.includes("❌")
                ? "border-red-400 text-red-700 bg-red-50"
                : "border-gray-400 text-gray-700 bg-gray-50" // Neutral for loading/checking messages
            }`}
          >
            {message}
          </div>
        )}

        {productData && (
          <div className="mt-6 bg-gray-100 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-4 text-center">Product Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-800">
                <span className="font-medium flex items-center gap-2"><Package className="h-5 w-5 text-gray-600" /> Product Name:</span>
                <span className="text-gray-900">{productData.name}</span>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <span className="font-medium flex items-center gap-2"><MapPin className="h-5 w-5 text-gray-600" /> Origin:</span>
                <span className="text-gray-900">{productData.origin}</span>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <span className="font-medium flex items-center gap-2"><Clock className="h-5 w-5 text-gray-600" /> Current Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(productData.status)}`}>
                  {productData.status}
                </span>
              </div>
            </div>

            {/* Debug section - remove in production */}
            <details className="mt-6 p-3 bg-gray-200 rounded-lg border border-gray-300">
              <summary className="cursor-pointer text-sm text-gray-700 hover:text-gray-900 font-medium">
                Debug: Raw Contract Data (Click to toggle)
              </summary>
              <pre className="mt-2 text-xs bg-gray-300 p-2 rounded overflow-x-auto text-gray-800">
                {JSON.stringify(productData, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Link
            to="/products"
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            <List className="h-4 w-4 mr-2" />
            All Products
          </Link>
          <Link
            to="/Main"
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            <Home className="h-4 w-4 mr-2" />
            Main Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackProduct;