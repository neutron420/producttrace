import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  User,
  Shield,
  Edit,
  Share2,
  Download,
  Star,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Factory,
  Award,
  History,
  Users,
  QrCode,
  ExternalLink,
  Plus,
  Eye,
  FileText,
  Globe,
  Zap
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  currentOwner: string;
  currentStage: string;
  createdAt: string;
  exists: boolean;
  image: string;
  category: string;
  price: number;
  quantity: number;
  rating: number;
  reviews: number;
  tags: string[];
  verified: boolean;
}

interface TraceabilityRecord {
  productId: string;
  stage: string;
  location: string;
  description: string;
  timestamp: string;
  updater: string;
  updaterName?: string;
}

interface Certification {
  certType: string;
  certifier: string;
  issuedAt: string;
  expiresAt: string;
  isValid: boolean;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [traceabilityHistory, setTraceabilityHistory] = useState<TraceabilityRecord[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'certifications'>('overview');
  const [loading, setLoading] = useState(true);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newOwner, setNewOwner] = useState('');
  const [newStage, setNewStage] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  useEffect(() => {
    // Mock data - in real app, this would fetch from blockchain
    const fetchProductData = async () => {
      setLoading(true);
      
      // Mock product data
      const mockProduct: Product = {
        id: id || '1',
        name: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans sourced from sustainable farms in Colombia. These beans are carefully selected and roasted to perfection, ensuring the highest quality and flavor profile.',
        manufacturer: 'Green Valley Farms',
        currentOwner: 'Coffee Distribution Co.',
        currentStage: 'Retail',
        createdAt: '2024-01-15T10:30:00Z',
        exists: true,
        image: '/api/placeholder/600/400',
        category: 'Food & Beverage',
        price: 25.99,
        quantity: 150,
        rating: 4.8,
        reviews: 124,
        tags: ['organic', 'fair-trade', 'premium', 'sustainable'],
        verified: true
      };

      // Mock traceability history
      const mockHistory: TraceabilityRecord[] = [
        {
          productId: id || '1',
          stage: 'Manufacturing',
          location: 'Colombian Coffee Farm, Huila',
          description: 'Coffee beans harvested and processed at origin farm',
          timestamp: '2024-01-15T10:30:00Z',
          updater: '0x1234...5678',
          updaterName: 'Green Valley Farms'
        },
        {
          productId: id || '1',
          stage: 'Quality Control',
          location: 'Processing Facility, Bogotá',
          description: 'Quality inspection and grading completed',
          timestamp: '2024-01-16T14:20:00Z',
          updater: '0x2345...6789',
          updaterName: 'Colombian Coffee Board'
        },
        {
          productId: id || '1',
          stage: 'Packaging',
          location: 'Export Facility, Cartagena',
          description: 'Beans packaged and prepared for international shipping',
          timestamp: '2024-01-18T09:15:00Z',
          updater: '0x3456...7890',
          updaterName: 'Export Solutions Ltd'
        },
        {
          productId: id || '1',
          stage: 'Shipped',
          location: 'Port of Miami, USA',
          description: 'Goods received at destination port',
          timestamp: '2024-01-22T16:45:00Z',
          updater: '0x4567...8901',
          updaterName: 'Global Logistics Inc'
        },
        {
          productId: id || '1',
          stage: 'Retail',
          location: 'Distribution Center, Atlanta',
          description: 'Product distributed to retail partners',
          timestamp: '2024-01-25T11:30:00Z',
          updater: '0x5678...9012',
          updaterName: 'Coffee Distribution Co.'
        }
      ];

      // Mock certifications
      const mockCertifications: Certification[] = [
        {
          certType: 'Organic Certification',
          certifier: 'USDA Organic',
          issuedAt: '2024-01-10T00:00:00Z',
          expiresAt: '2025-01-10T00:00:00Z',
          isValid: true
        },
        {
          certType: 'Fair Trade Certified',
          certifier: 'Fair Trade USA',
          issuedAt: '2024-01-12T00:00:00Z',
          expiresAt: '2025-01-12T00:00:00Z',
          isValid: true
        },
        {
          certType: 'Rainforest Alliance',
          certifier: 'Rainforest Alliance',
          issuedAt: '2024-01-08T00:00:00Z',
          expiresAt: '2024-12-08T00:00:00Z',
          isValid: true
        }
      ];

      setProduct(mockProduct);
      setTraceabilityHistory(mockHistory);
      setCertifications(mockCertifications);
      setLoading(false);
    };

    fetchProductData();
  }, [id]);

  const getStatusIcon = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'manufacturing': return Factory;
      case 'quality control': return CheckCircle;
      case 'packaging': return Package;
      case 'shipped': return Truck;
      case 'retail': return Globe;
      default: return Package;
    }
  };

  const getStatusColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'manufacturing': return 'bg-blue-100 text-blue-800';
      case 'quality control': return 'bg-green-100 text-green-800';
      case 'packaging': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'retail': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTransferOwnership = () => {
    // In real app, this would call the smart contract
    console.log('Transferring ownership to:', newOwner);
    setShowTransferModal(false);
    setNewOwner('');
  };

  const handleUpdateStage = () => {
    // In real app, this would call the smart contract
    console.log('Updating stage:', { newStage, newLocation, updateDescription });
    setShowUpdateModal(false);
    setNewStage('');
    setNewLocation('');
    setUpdateDescription('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mt-1">Product ID: {product.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <QrCode className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* Product Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Product Image */}
          <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <Package className="h-24 w-24 text-gray-600" />
            </div>
            <div className="flex gap-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.currentStage)}`}>
                  {product.currentStage}
                </span>
                {product.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Verified</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{product.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="text-lg font-semibold text-gray-900">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Ownership & Control */}
            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ownership & Control</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Manufacturer</span>
                  <span className="font-medium text-gray-900">{product.manufacturer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Owner</span>
                  <span className="font-medium text-gray-900">{product.currentOwner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-900">{formatDate(product.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowTransferModal(true)}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  Transfer Ownership
                </button>
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Update Stage
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-100 rounded-xl p-2 border border-gray-200 mb-8"
        >
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'history', label: 'Traceability History', icon: History },
              { id: 'certifications', label: 'Certifications', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {activeTab === 'overview' && (
            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Product Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {product.name}</p>
                    <p><span className="font-medium">Category:</span> {product.category}</p>
                    <p><span className="font-medium">Manufacturer:</span> {product.manufacturer}</p>
                    <p><span className="font-medium">Current Stage:</span> {product.currentStage}</p>
                    <p><span className="font-medium">Status:</span> {product.exists ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Blockchain Info</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Product ID:</span> {product.id}</p>
                    <p><span className="font-medium">Created:</span> {formatDate(product.createdAt)}</p>
                    <p><span className="font-medium">Verified:</span> {product.verified ? 'Yes' : 'No'}</p>
                    <p><span className="font-medium">Total Records:</span> {traceabilityHistory.length}</p>
                    <p><span className="font-medium">Certifications:</span> {certifications.length}</p>
                  </div>
                </div>
              </div>
              {/* Add Product button moved here for Product Overview */}
              <div className="flex justify-end mt-6">
                <Link
                  to="/add-product"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors text-sm"
                >
                  <Plus size={18} />
                  Add Product
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Traceability History</h2>
                <span className="text-sm text-gray-600">{traceabilityHistory.length} records</span>
              </div>
              
              <div className="space-y-4">
                {traceabilityHistory.map((record, index) => {
                  const StageIcon = getStatusIcon(record.stage);
                  return (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getStatusColor(record.stage)}`}>
                          <StageIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{record.stage}</h3>
                            <span className="text-sm text-gray-600">{formatDate(record.timestamp)}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{record.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {record.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {record.updaterName || formatAddress(record.updater)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
                <span className="text-sm text-gray-600">{certifications.length} certifications</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{cert.certType}</h3>
                        <p className="text-sm text-gray-600">{cert.certifier}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cert.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {cert.isValid ? 'Valid' : 'Expired'}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Issued:</span> {formatDate(cert.issuedAt)}</p>
                      <p><span className="font-medium">Expires:</span> {formatDate(cert.expiresAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Transfer Ownership Modal */}
        {showTransferModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Ownership</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Owner Address
                  </label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="0x..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleTransferOwnership}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Transfer
                  </button>
                  <button
                    onClick={() => setShowTransferModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Update Stage Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Product Stage</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Stage
                  </label>
                  <input
                    type="text"
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="e.g., Shipped, Delivered"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="Current location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="Update description"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateStage}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;