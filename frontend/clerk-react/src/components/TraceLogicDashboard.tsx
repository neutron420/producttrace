import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Package, CheckCircle, Globe, Truck, MapPin, DollarSign, Shield, Eye, Zap } from 'lucide-react';

const TraceLogicDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const shipmentData = [
    { name: 'Jan', value: 45, completed: 42, delayed: 3 },
    { name: 'Feb', value: 52, completed: 48, delayed: 4 },
    { name: 'Mar', value: 61, completed: 58, delayed: 3 },
    { name: 'Apr', value: 58, completed: 52, delayed: 6 },
    { name: 'May', value: 67, completed: 64, delayed: 3 },
    { name: 'Jun', value: 74, completed: 71, delayed: 3 },
  ];

  const regionData = [
    { name: 'North America', value: 35, color: '#000000' },
    { name: 'Europe', value: 28, color: '#404040' },
    { name: 'Asia Pacific', value: 25, color: '#707070' },
    { name: 'Latin America', value: 12, color: '#A0A0A0' },
  ];

  const liveShipments = [
    { id: 'TL-2024-001', origin: 'Shanghai', destination: 'Los Angeles', status: 'In Transit', progress: 67, blockchain: 'Verified' },
    { id: 'TL-2024-002', origin: 'Hamburg', destination: 'New York', status: 'Customs', progress: 85, blockchain: 'Verified' },
    { id: 'TL-2024-003', origin: 'Rotterdam', destination: 'Dubai', status: 'Delivered', progress: 100, blockchain: 'Verified' },
    { id: 'TL-2024-004', origin: 'Singapore', destination: 'Vancouver', status: 'In Transit', progress: 43, blockchain: 'Verified' },
  ];

  const metrics = [
    { title: 'Active Shipments', value: '247', change: '+12%', icon: <Package className="w-6 h-6" />, color: 'text-black' },
    { title: 'On-Time Delivery', value: '96.8%', change: '+2.1%', icon: <CheckCircle className="w-6 h-6" />, color: 'text-black' },
    { title: 'Total Value', value: '$2.3M', change: '+18%', icon: <DollarSign className="w-6 h-6" />, color: 'text-black' },
    { title: 'Network Nodes', value: '156', change: '+8', icon: <Globe className="w-6 h-6" />, color: 'text-black' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': 
        return 'bg-black';
      case 'In Transit': 
        return 'bg-gray-600';
      case 'Customs': 
        return 'bg-gray-400';
      default: 
        return 'bg-gray-300';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'tracking':
        return renderTrackingTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return renderOverviewTab();
    }
  };

  const renderOverviewTab = () => (
    <>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Tracking */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black tracking-tight">Live Tracking</h2>
            <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
              <Eye className="w-4 h-4" />
              <span className="font-medium">247 Active Shipments</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {liveShipments.map((shipment) => (
              <div key={shipment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(shipment.status)} shadow-md`}></div>
                    <span className="font-medium text-black text-lg">{shipment.id}</span>
                    <span className="text-sm bg-black text-white px-3 py-1 rounded-full font-medium">
                      {shipment.blockchain}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 font-semibold bg-white px-3 py-1 rounded-full border">{shipment.status}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm text-gray-700 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{shipment.origin} → {shipment.destination}</span>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-3 items-center justify-between">
                    <div>
                      <span className="text-xs font-bold inline-block text-black uppercase tracking-wide">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold inline-block text-black">
                        {shipment.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
                    <div 
                      style={{ width: `${shipment.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-black to-gray-700 transition-all duration-500 rounded-full"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="space-y-6">
          {/* Regional Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-black mb-4 tracking-tight">Regional Distribution</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Share']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      color: 'black',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {regionData.map((region, index) => (
                <div key={index} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: region.color }}></div>
                    <span className="text-gray-700 font-medium">{region.name}</span>
                  </div>
                  <span className="text-black font-medium">{region.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Web3 Features */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-black mb-4 tracking-tight">Web3 Features</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                <Shield className="w-6 h-6 text-black" />
                <div>
                  <div className="text-sm font-medium text-black">Blockchain Security</div>
                  <div className="text-xs text-gray-600">256-bit encryption active</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                <Zap className="w-6 h-6 text-black" />
                <div>
                  <div className="text-sm font-medium text-black">Smart Contracts</div>
                  <div className="text-xs text-gray-600">12 contracts executed today</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                <Globe className="w-6 h-6 text-black" />
                <div>
                  <div className="text-sm font-medium text-black">Global Network</div>
                  <div className="text-xs text-gray-600">156 nodes worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Trends Chart */}
      <div className="mt-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl font-bold text-black mb-4 tracking-tight">Shipment Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} fontWeight="500" />
              <YAxis stroke="#6b7280" fontSize={12} fontWeight="500" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  color: 'black',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#000000" 
                strokeWidth={3}
                dot={{ fill: '#000000', strokeWidth: 2, r: 5 }}
                name="Completed"
              />
              <Line 
                type="monotone" 
                dataKey="delayed" 
                stroke="#6b7280" 
                strokeWidth={3}
                dot={{ fill: '#6b7280', strokeWidth: 2, r: 5 }}
                name="Delayed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );

  const renderTrackingTab = () => (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-xl font-bold text-black mb-6 tracking-tight">Advanced Tracking</h2>
      <div className="space-y-6">
        {liveShipments.map((shipment) => (
          <div key={shipment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-black text-lg">{shipment.id}</h3>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                shipment.status === 'Delivered' ? 'bg-black text-white' :
                shipment.status === 'In Transit' ? 'bg-gray-600 text-white' :
                'bg-gray-400 text-white'
              }`}>
                {shipment.status}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Truck className="w-5 h-5" />
              <span className="font-medium">{shipment.origin} → {shipment.destination}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <h2 className="text-xl font-bold text-black mb-6 tracking-tight">Performance Metrics</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} fontWeight="500" />
              <YAxis stroke="#6b7280" fontSize={12} fontWeight="500" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  color: 'black',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="completed" fill="#000000" name="Completed" radius={[2, 2, 0, 0]} />
              <Bar dataKey="delayed" fill="#6b7280" name="Delayed" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <h2 className="text-xl font-bold text-black mb-6 tracking-tight">Regional Analysis</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  color: 'black',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black text-black tracking-tight">TraceLogic Dashboard</h1>
              <p className="text-gray-600 text-base font-medium mt-1">Real-time supply chain visibility at your fingertips</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 bg-black text-white px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">Live Network</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
            {['overview', 'tracking', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-black text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} bg-gray-50 p-3 rounded-xl`}>{metric.icon}</div>
                <span className="text-sm text-black font-bold bg-gray-100 px-3 py-1 rounded-full">{metric.change}</span>
              </div>
              <div className="text-2xl font-semibold text-black mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600 font-medium">{metric.title}</div>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TraceLogicDashboard;