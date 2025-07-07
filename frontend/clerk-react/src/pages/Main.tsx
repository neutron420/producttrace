import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  TrendingUp,
  Users,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Shield,
  ArrowRight // Still useful for the button
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'shipped' | 'delivered';
  location: string;
  timestamp: string;
  price: number;
  quantity: number;
}

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalUsers: number;
  pendingAlerts: number;
}

const MainPage: React.FC = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalUsers: 0,
    pendingAlerts: 0
  });

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Organic Coffee Beans',
        category: 'Food & Beverage',
        status: 'active',
        location: 'Colombia',
        timestamp: '2024-01-15T10:30:00Z',
        price: 25.99,
        quantity: 100
      },
      {
        id: '2',
        name: 'Premium Headphones',
        category: 'Electronics',
        status: 'shipped',
        location: 'Germany',
        timestamp: '2024-01-14T14:20:00Z',
        price: 199.99,
        quantity: 50
      },
      {
        id: '3',
        name: 'Sustainable T-Shirt',
        category: 'Apparel',
        status: 'delivered',
        location: 'India',
        timestamp: '2024-01-13T09:15:00Z',
        price: 29.99,
        quantity: 200
      },
      {
        id: '4',
        name: 'Artisan Chocolate',
        category: 'Food & Beverage',
        status: 'pending',
        location: 'Switzerland',
        timestamp: '2024-01-12T16:45:00Z',
        price: 15.99,
        quantity: 75
      }
    ];

    setProducts(mockProducts);
    setStats({
      totalProducts: mockProducts.length,
      activeProducts: mockProducts.filter(p => p.status === 'active').length,
      totalUsers: 1250,
      pendingAlerts: 3
    });
  }, []);

  // Grayscale status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gray-100 text-black';
      case 'pending': return 'bg-gray-300 text-black';
      case 'shipped': return 'bg-gray-400 text-black';
      case 'delivered': return 'bg-gray-700 text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Grayscale card colors
  const statsCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-gray-900',
      change: '+12%'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      icon: TrendingUp,
      color: 'bg-gray-700',
      change: '+8%'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-gray-500',
      change: '+23%'
    },
    {
      title: 'Pending Alerts',
      value: stats.pendingAlerts,
      icon: AlertCircle,
      color: 'bg-gray-300',
      change: '-5%'
    }
  ];

  return (
    <div className="min-h-screen bg-white p-6"> {/* Removed relative as button is no longer fixed */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                Welcome back, {user?.firstName || 'User'}! 👋
              </h1>
              <p className="text-gray-700">
                Here's what's happening with your products today.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-black text-sm font-medium">
                  {card.change}
                </span>
              </div>
              <h3 className="text-gray-700 text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-black">
                {card.value.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">Products Overview</h2>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-black">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{product.category}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-gray-700">
                        <MapPin className="h-4 w-4" />
                        {product.location}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-black font-medium">${product.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4 text-gray-800" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700">No products found</p>
            </div>
          )}

          {/* New position for "View All Products" button */}
          {filteredProducts.length > 0 && (
            <div className="mt-6 flex justify-end"> {/* Use justify-end to align to the right */}
              <Link
                to="/products"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-colors"
              >
                View All Products
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-white border border-gray-200 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-black mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Product verified', product: 'Organic Coffee Beans', time: '2 hours ago', icon: Shield },
              { action: 'Location updated', product: 'Premium Headphones', time: '4 hours ago', icon: MapPin },
              { action: 'Status changed', product: 'Sustainable T-Shirt', time: '6 hours ago', icon: Clock },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 bg-gray-200 rounded-lg">
                  <activity.icon className="h-4 w-4 text-black" />
                </div>
                <div className="flex-1">
                  <p className="text-black text-sm">
                    <span className="font-medium">{activity.action}</span> for {activity.product}
                  </p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;