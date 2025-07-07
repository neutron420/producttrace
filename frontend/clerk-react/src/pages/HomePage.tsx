import React, { useState, useEffect } from "react";
import { ArrowRight, Play, CheckCircle, Globe, Users, Zap, Shield, X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import WorldMapDemo from "../components/WorldMapdemo"; // Add this import
import FeatureSection from "../components/FeatureSection"; // Add this import
import FloatingLogos from "../components/FloatingLogos"; // Add this import
import { ContainerScroll } from "../components/Scroll"; // Add this import
import TraceLogicDashboard from "../components/TraceLogicDashboard"; // Add this import

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  end: number; 
  duration?: number; 
  suffix?: string;
  prefix?: string;
}> = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};

// Black & White Globe Animation
const BlackWhiteGlobe: React.FC = () => {
  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Globe container */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-2xl border border-gray-600">
        {/* Globe grid lines */}
        <div className="absolute inset-4 rounded-full border border-gray-400/30"></div>
        <div className="absolute inset-8 rounded-full border border-gray-400/20"></div>
        <div className="absolute inset-12 rounded-full border border-gray-400/10"></div>
        
        {/* Vertical lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gray-400/20 transform -translate-x-1/2"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gray-400/20 transform -translate-x-1/2"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gray-400/20 transform translate-x-1/2"></div>
        
        {/* Horizontal lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-400/20 transform -translate-y-1/2"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gray-400/20 transform -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gray-400/20 transform translate-y-1/2"></div>
        
        {/* Animated dots */}
        <div className="absolute top-16 left-20 w-3 h-3 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-32 right-16 w-2 h-2 bg-gray-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-32 w-2 h-2 bg-gray-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-gray-200 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Floating status indicators */}
      <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-2 text-xs font-semibold text-gray-800 border border-gray-200">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-800 rounded-full mr-2 animate-pulse"></div>
          <AnimatedCounter end={247} /> Active
        </div>
      </div>
      
      <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 text-xs font-semibold text-gray-800 border border-gray-200">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-600 rounded-full mr-2 animate-pulse"></div>
          <AnimatedCounter end={99} suffix="%" /> Uptime
        </div>
      </div>
      
      <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-2 text-xs font-semibold text-gray-800 border border-gray-200">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-700 rounded-full mr-2 animate-pulse"></div>
          <AnimatedCounter end={1200} suffix="+" /> Suppliers
        </div>
      </div>
      
      <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-2 text-xs font-semibold text-gray-800 border border-gray-200">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 animate-pulse"></div>
          Real-time
        </div>
      </div>
    </div>
  );
};

const TraceLogicHomepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Global Supply Chain
                <span className="block text-gray-300">Intelligence</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                TraceLogic provides real-time visibility and advanced analytics for your entire supply chain network. Monitor, analyze, and optimize your operations globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center shadow-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center justify-center">
                    Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </SignedIn>
              </div>
            </div>

            {/* Right Column - Black & White Globe */}
            <div className="flex justify-center">
              <BlackWhiteGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Status Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-800 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Global Locations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={247} />
                  </p>
                  <p className="text-xs text-gray-500">+12% this month</p>
                </div>
                <div className="text-3xl text-gray-800">
                  <Globe />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={1384} />
                  </p>
                  <p className="text-xs text-gray-500">+8% this month</p>
                </div>
                <div className="text-3xl text-gray-700">
                  <Users />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-600 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processing Speed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={99} suffix="%" />
                  </p>
                  <p className="text-xs text-gray-500">Real-time updates</p>
                </div>
                <div className="text-3xl text-gray-600">
                  <Zap />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-500 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Level</p>
                  <p className="text-2xl font-bold text-gray-900">A+</p>
                  <p className="text-xs text-gray-500">ISO 27001 Certified</p>
                </div>
                <div className="text-3xl text-gray-500">
                  <Shield />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Supply Chains
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need to manage, monitor, and optimize your global supply chain operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:bg-gray-100 border border-gray-200">
              <div className="text-4xl text-gray-800 mb-4 flex justify-center">
                <Globe />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor your shipments and inventory across all locations in real-time with our advanced tracking system.</p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:bg-gray-100 border border-gray-200">
              <div className="text-4xl text-gray-800 mb-4 flex justify-center">
                <Users />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Supplier Management</h3>
              <p className="text-gray-600">Streamline supplier relationships with automated communications and performance analytics.</p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:bg-gray-100 border border-gray-200">
              <div className="text-4xl text-gray-800 mb-4 flex justify-center">
                <Zap />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Predictive Analytics</h3>
              <p className="text-gray-600">Leverage AI-powered insights to predict demand, optimize inventory, and prevent disruptions.</p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:bg-gray-100 border border-gray-200">
              <div className="text-4xl text-gray-800 mb-4 flex justify-center">
                <Shield />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Management</h3>
              <p className="text-gray-600">Identify and mitigate supply chain risks before they impact your operations.</p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:bg-gray-100 border border-gray-200">
              <div className="text-4xl text-gray-800 mb-4 flex justify-center">
                <CheckCircle />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compliance Tracking</h3>
              <p className="text-gray-600">Ensure regulatory compliance across all markets with automated monitoring and reporting.</p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:bg-gray-100 border border-gray-200">
              <div className="text-4xl text-gray-800 mb-4 flex justify-center">
                <ArrowRight />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integration Ready</h3>
              <p className="text-gray-600">Seamlessly integrate with your existing ERP, WMS, and other business systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust TraceLogic to optimize their global operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Start Free Trial
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* World Map Demo Section */}
      <section className="bg-white">
        <WorldMapDemo />
      </section>

      {/* Feature Section - Added below WorldMapDemo */}
      <FeatureSection />

      {/* Floating Logos Section - Modified to reduce bottom padding */}
      <section className="pt-16 pb-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Technologies
            </h2>
            <p className="text-xl text-gray-600">
              Built on industry-leading blockchain and web3 infrastructure
            </p>
          </div>
          <div className="relative overflow-hidden">
            <FloatingLogos speed="normal" />
          </div>
        </div>
      </section>

      {/* Scroll Animation Section with TraceLogic Dashboard */}
      <div className="mt-0">
        <ContainerScroll
          titleComponent={
            <h2 className="text-4xl font-bold text-white mb-8">
              Experience Our Platform in Action
            </h2>
          }
        >
          <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <TraceLogicDashboard />
          </div>
        </ContainerScroll>
      </div>

      {/* Sign-in Modal */}
      {/* <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} /> */}
    </div>
  );
};

export default TraceLogicHomepage;