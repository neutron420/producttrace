import { useState } from "react";
import {
  addProduct,
  connectWallet,
  isWalletConnected,
  checkNetwork
} from "../lib/contract";
import { Link } from 'react-router-dom'; // Import Link for navigation
import { List, Home } from 'lucide-react'; // Import icons for the new buttons

const AddProduct = () => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!productId.trim() || !name.trim() || !origin.trim() || !status.trim()) {
      setMessage("❌ Please fill in all fields");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      setMessage("🔗 Checking wallet connection...");
      const connected = await isWalletConnected();
      if (!connected) {
        setMessage("🔗 Connecting to MetaMask...");
        await connectWallet();
      }
      setMessage("🌐 Checking network...");
      await checkNetwork();
      setMessage("⏳ Adding product to blockchain...");
      
      // Fixed: Pass parameters in correct order matching contract function signature
      const result = await addProduct(productId, name, origin, status);
      
      setMessage("✅ Product added successfully! Transaction hash: " + result.transactionHash);
      setProductId("");
      setName("");
      setOrigin("");
      setStatus("");
    } catch (err: any) {
      if (err.message?.includes("User rejected")) {
        setMessage("❌ Transaction rejected by user.");
      } else if (err.message?.includes("insufficient funds")) {
        setMessage("❌ Insufficient ETH balance for gas fees.");
      } else if (err.message?.includes("network") || err.message?.includes("chain")) {
        setMessage("❌ Network error: Please switch to Ethereum Mainnet.");
      } else if (err.message?.includes("MetaMask")) {
        setMessage("❌ MetaMask error: " + err.message);
      } else if (err.message?.includes("gas")) {
        setMessage("❌ Gas estimation failed: " + err.message);
      } else if (err.message?.includes("revert")) {
        setMessage("❌ Transaction failed: " + err.message);
      } else if (err.message?.includes("All fields are required")) {
        setMessage("❌ All fields are required.");
      } else {
        setMessage("❌ Error: " + (err.message || "Unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = productId.trim() && name.trim() && origin.trim() && status.trim();

  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-4 pt-24 pb-12 md:pt-32">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl px-8 py-10 md:px-12 md:py-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black text-center mb-8 tracking-tight leading-tight">
          Add New Product
        </h1>
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleAdd(); }}>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Product ID <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g. PROD001"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition disabled:bg-gray-100"
              disabled={loading}
              maxLength={50}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Product Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition disabled:bg-gray-100"
              disabled={loading}
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Origin <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g. Factory A, China"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition disabled:bg-gray-100"
              disabled={loading}
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Status <span className="text-red-500">*</span></label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition disabled:bg-gray-100"
              disabled={loading}
            >
              <option value="">Select status</option>
              <option value="Manufactured">Manufactured</option>
              <option value="In Transit">In Transit</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Delivered">Delivered</option>
              <option value="Quality Check">Quality Check</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full py-3 rounded-lg bg-black text-white font-semibold shadow-sm hover:bg-gray-900 transition disabled:bg-gray-200 disabled:text-gray-500"
          >
            {loading ? "Processing..." : "Add Product to Blockchain"}
          </button>
        </form>
        {message && (
          <div
            className={`mt-6 px-4 py-3 rounded-lg text-center text-sm font-medium border ${
              message.includes("✅")
                ? "border-green-400 text-green-700 bg-green-50"
                : message.includes("❌")
                ? "border-red-400 text-red-700 bg-red-50"
                : "border-gray-400 text-gray-700 bg-gray-50"
            }`}
          >
            {message}
          </div>
        )}
        <div className="mt-7 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-sm text-black mb-2">ℹ️ Important Notes:</h3>
          <ul className="text-xs text-gray-600 space-y-1 list-disc pl-5">
            <li>Make sure you have ETH for gas fees</li>
            <li>Product ID must be unique</li>
            <li>Transaction will be recorded on Ethereum blockchain</li>
            <li>Keep your transaction hash for reference</li>
          </ul>
        </div>

        {/* New Buttons for Navigation */}
        <div className="mt-6 flex justify-end gap-3"> {/* Added flex container for buttons */}
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

export default AddProduct;