import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Grid,
  List,
  Plus,
  MapPin,
  Calendar,
  Package,
  Eye,
  Edit,
  Trash2,
  Star,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  status: 'active' | 'pending' | 'shipped' | 'delivered' | 'out-of-stock';
  location: string;
  manufacturer: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  verified: boolean;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - Reduced to 3 products
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans sourced from sustainable farms',
        category: 'Food & Beverage',
        price: 25.99,
        quantity: 150,
        status: 'active',
        location: 'Colombia',
        manufacturer: 'Green Valley Farms',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-20T14:20:00Z',
        rating: 4.8,
        reviews: 124,
        image: '/api/placeholder/300/200',
        tags: ['organic', 'fair-trade', 'premium'],
        verified: true
      },
      {
        id: '2',
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        price: 199.99,
        quantity: 75,
        status: 'shipped',
        location: 'Germany',
        manufacturer: 'AudioTech Solutions',
        createdAt: '2024-01-14T14:20:00Z',
        updatedAt: '2024-01-19T09:15:00Z',
        rating: 4.6,
        reviews: 89,
        image: '/api/placeholder/300/200',
        tags: ['wireless', 'premium', 'noise-cancelling'],
        verified: true
      },
      {
        id: '3',
        name: 'Sustainable T-Shirt',
        description: 'Eco-friendly cotton t-shirt made from recycled materials',
        category: 'Apparel',
        price: 29.99,
        quantity: 200,
        status: 'delivered',
        location: 'India',
        manufacturer: 'EcoWear Inc.',
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-18T16:45:00Z',
        rating: 4.3,
        reviews: 67,
        image: '/api/placeholder/300/200',
        tags: ['sustainable', 'cotton', 'eco-friendly'],
        verified: false
      }
    ];

    setProducts(mockProducts);
  }, []);

  const categories = ['all', 'Food & Beverage', 'Electronics', 'Apparel', 'Fashion'];
  const statuses = ['all', 'active', 'pending', 'shipped', 'delivered', 'out-of-stock'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      case 'out-of-stock': return AlertCircle;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gray-200 text-gray-800';
      case 'pending': return 'bg-gray-200 text-gray-800';
      case 'shipped': return 'bg-gray-200 text-gray-800';
      case 'delivered': return 'bg-gray-200 text-gray-800';
      case 'out-of-stock': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'date':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const ProductCard = ({ product }: { product: Product }) => {
    const StatusIcon = getStatusIcon(product.status);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-100 rounded-xl p-6 border border-gray-200 hover:bg-gray-200 transition-all duration-300"
      >
        <div className="relative mb-4">
          <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-600" />
          </div>
          {product.verified && (
            <div className="absolute top-3 right-3 bg-gray-700 rounded-full p-1">
              <Shield className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <div className="flex items-center gap-1 text-gray-700">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm text-gray-700">{product.rating}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
            {product.status}
          </span>
          <span className="text-gray-600 text-xs">{product.category}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-gray-700">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{product.location}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            <p className="text-sm text-gray-600">Stock: {product.quantity}</p>
          </div>
          <div className="flex items-center gap-1">
            <StatusIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{product.reviews} reviews</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Eye className="h-4 w-4" />
            View
          </Link>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Edit className="h-4 w-4" />
          </button>
          <button className="bg-red-200 hover:bg-red-300 text-red-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  const ProductListItem = ({ product }: { product: Product }) => {
    const StatusIcon = getStatusIcon(product.status);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-100 rounded-xl p-6 border border-gray-200 hover:bg-gray-200 transition-all duration-300"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="h-8 w-8 text-gray-600" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
              {product.verified && (
                <Shield className="h-4 w-4 text-gray-700 flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-700 text-sm mb-2 line-clamp-1">{product.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{product.manufacturer}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {product.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-lg font-semibold text-gray-900">${product.price}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Stock</p>
              <p className="text-lg font-semibold text-gray-900">{product.quantity}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Rating</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-gray-700 fill-current" />
                <span className="text-gray-900">{product.rating}</span>
              </div>
            </div>
            <div className="text-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/products/${product.id}`}
                className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Eye className="h-4 w-4" />
                View
              </Link>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-lg transition-colors">
                <Edit className="h-4 w-4" />
              </button>
              <button className="bg-red-200 hover:bg-red-300 text-red-800 py-2 px-3 rounded-lg transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-700">
              Manage and track all your products in one place
            </p>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-100 rounded-xl p-6 border border-gray-200 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
                <option value="date">Sort by Date</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-3 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {sortOrder === 'asc' ?
                  <SortAsc className="h-5 w-5 text-gray-800" /> :
                  <SortDesc className="h-5 w-5 text-gray-800" />
                }
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Export */}
            <button className="p-3 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="h-5 w-5 text-gray-800" />
            </button>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-700 mb-6">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Add your first product to get started'}
              </p>
              <Link
                to="/add-product"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Add Product
              </Link>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700">
                  Showing {filteredAndSortedProducts.length} of {products.length} products
                </p>
              </div>

              {/* Products Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Pagination and Add Product Button at Bottom */}
        {filteredAndSortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex justify-between items-center" // Use justify-between to push pagination and button to ends
          >
            {/* Wrapper for pagination buttons to keep them centered */}
            <div className="flex items-center gap-2 mx-auto"> {/* Added mx-auto for centering */}
              <button className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-300 transition-colors">
                Previous
              </button>
              <span className="px-4 py-2 bg-gray-800 text-white rounded-lg">1</span>
              <button className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-300 transition-colors">
                Next
              </button>
            </div>
            {/* Add Product Button - pushed to the right by justify-between on parent div */}
            <Link
              to="/add-product"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Product
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;