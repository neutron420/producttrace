import React, { useEffect } from 'react';
import { Shield, Target, Eye, CheckCircle, Award, Globe, Zap, Lock, Users, TrendingUp, Database, Network, Layers, Code, Activity, FileCheck, Clock, ArrowRight, Star, Cpu, GitBranch, Search } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: "100%", label: "Immutable Records", icon: <Shield className="w-6 h-6" /> },
    { number: "24/7", label: "Blockchain Availability", icon: <Clock className="w-6 h-6" /> },
    { number: "99.9%", label: "System Uptime", icon: <Activity className="w-6 h-6" /> },
    { number: "0", label: "Data Tampering", icon: <Lock className="w-6 h-6" /> }
  ];

  const features = [
    { name: "Immutable Product Records", icon: <Database className="w-5 h-5" /> },
    { name: "Complete Traceability", icon: <Search className="w-5 h-5" /> },
    { name: "Authorization System", icon: <Users className="w-5 h-5" /> },
    { name: "Certification Management", icon: <FileCheck className="w-5 h-5" /> },
    { name: "Ownership Transfer", icon: <ArrowRight className="w-5 h-5" /> },
    { name: "Event Logging", icon: <Activity className="w-5 h-5" /> },
    { name: "Gas Optimized", icon: <Zap className="w-5 h-5" /> },
    { name: "Role-Based Access", icon: <Lock className="w-5 h-5" /> },
    { name: "Smart Contract Security", icon: <Shield className="w-5 h-5" /> },
    { name: "Ethereum Integration", icon: <Network className="w-5 h-5" /> },
    { name: "Production Ready", icon: <CheckCircle className="w-5 h-5" /> },
    { name: "Testnet Verified", icon: <Award className="w-5 h-5" /> }
  ];

  const systemComponents = [
    {
      icon: <Code className="w-10 h-10" />,
      title: "Smart Contract Core",
      description: "ProductTracker.sol handles all product operations with gas-optimized design and comprehensive event logging system.",
      highlight: "Solidity & Hardhat"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Authorization System",
      description: "Role-based access control managing authorized manufacturers, certifiers, and stakeholders with secure validation.",
      highlight: "Multi-Role Security"
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: "Certification Management",
      description: "Advanced certification system with validity periods, expiration tracking, and certifying authority management.",
      highlight: "Automated Validation"
    }
  ];

  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Role-Based Access",
      description: "Granular permissions for manufacturers, certifiers, and administrators"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Event Logging",
      description: "Complete audit trail of all system interactions and changes"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Input Validation",
      description: "Comprehensive validation prevents malicious contract interactions"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Gas Efficiency",
      description: "Optimized smart contract design minimizes transaction costs"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Product Traceability
            <span className="text-black block">
              Blockchain System
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            A comprehensive blockchain-based product traceability system enabling transparent tracking 
            of products throughout their entire lifecycle with immutable records on Ethereum blockchain
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border">
              <CheckCircle className="w-5 h-5 text-black" />
              <span className="font-medium text-gray-700">Production Ready</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border">
              <Award className="w-5 h-5 text-black" />
              <span className="font-medium text-gray-700">Verified on Etherscan</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border">
              <Globe className="w-5 h-5 text-black" />
              <span className="font-medium text-gray-700">Ethereum Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To revolutionize product traceability through blockchain technology, ensuring complete 
                  transparency and immutability in supply chain management. We empower businesses with 
                  trustworthy, verifiable product histories from manufacturing to retail.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To create a future where every product has a complete, immutable digital identity 
                  on the blockchain, enabling unprecedented transparency, consumer trust, and supply 
                  chain accountability across all industries worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">System Performance Metrics</h2>
            <p className="text-gray-600 text-lg">Real-time insights into our blockchain system's performance</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How The System Works</h2>
            <p className="text-gray-600 text-lg">Three simple steps to complete product traceability</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Database className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-gray-700">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Registration</h3>
              <p className="text-gray-600 leading-relaxed">
                Manufacturers register products on the blockchain with immutable records including 
                origin, specifications, and initial certifications.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <GitBranch className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-gray-700">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifecycle Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track products through every stage with traceability records, ownership transfers, 
                and certification updates stored permanently on-chain.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-gray-700">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verification & Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Consumers and businesses can verify product authenticity and history through 
                transparent blockchain records with cryptographic proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">System Architecture</h2>
            <p className="text-gray-600 text-lg">Built on robust blockchain infrastructure</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {systemComponents.map((component, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-white">{component.icon}</div>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{component.title}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                    <Star className="w-4 h-4 text-black" />
                    <span className="text-sm font-medium text-gray-700">{component.highlight}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-gray-600 text-lg">Comprehensive blockchain capabilities for complete traceability</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="text-white">{feature.icon}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight">
                  {feature.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Security Features</h2>
            <p className="text-gray-600 text-lg">Enterprise-grade security built into every component</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Status */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Verified Deployment</h2>
              <p className="text-gray-600">Live on Ethereum Sepolia Testnet</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Network className="w-6 h-6 text-black" />
                  <h3 className="font-bold text-gray-900">Network</h3>
                </div>
                <p className="text-gray-700">Ethereum Sepolia Testnet</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="w-6 h-6 text-black" />
                  <h3 className="font-bold text-gray-900">Contract Address</h3>
                </div>
                <p className="text-gray-700 font-mono text-sm break-all">0xcf24c7803eF5EEC1B224eDAAa840be3aaE5b1b69</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-black" />
                  <h3 className="font-bold text-gray-900">Status</h3>
                </div>
                <p className="text-gray-700">✅ Verified on Etherscan</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-6 h-6 text-black" />
                  <h3 className="font-bold text-gray-900">Readiness</h3>
                </div>
                <p className="text-gray-700">Production Ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <Globe className="w-12 h-12 mx-auto mb-6 text-black" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready for Enterprise Deployment</h3>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              This production-ready blockchain system is designed for enterprise use across any industry 
              requiring transparent supply chain verification. Built with security, scalability, and 
              efficiency at its core.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium">
              <Shield className="w-5 h-5" />
              <span>Enterprise Grade Security</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;