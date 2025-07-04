import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Zap, 
  Shield, 
  Users, 
  Globe, 
  Heart,
  Star,
  Trophy
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Developer First",
    description: "Built with developers in mind. Clean APIs, comprehensive docs, and intuitive design patterns.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized for performance with sub-second response times and efficient resource usage.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and compliance with industry standards.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Collaboration",
    description: "Real-time collaboration tools that keep your team synchronized and productive.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Scale",
    description: "Distributed infrastructure across 50+ regions for low-latency access worldwide.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Customer Love",
    description: "Rated 4.9/5 by thousands of users who trust us with their most important projects.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Premium Quality",
    description: "Meticulously crafted with attention to detail and commitment to excellence.",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Industry Leading",
    description: "Recognized as the top solution by industry experts and technology publications.",
  }
];

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  end: number; 
  duration?: number; 
  suffix?: string;
  decimal?: boolean;
}> = ({ end, duration = 2000, suffix = "", decimal = false }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const formatNumber = (num: number) => {
    if (decimal) {
      return num.toFixed(1);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <span id={`counter-${end}`}>
      {formatNumber(count)}{suffix}
    </span>
  );
};

const FeatureSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            {/* TraceLogic Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="text-white">
                  {/* Interconnected nodes representing blockchain */}
                  <circle cx="6" cy="6" r="2" fill="currentColor" />
                  <circle cx="14" cy="6" r="2" fill="currentColor" />
                  <circle cx="6" cy="14" r="2" fill="currentColor" />
                  <circle cx="14" cy="14" r="2" fill="currentColor" />
                  <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                  {/* Connecting lines */}
                  <line x1="6" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="14" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="6" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="14" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                  <line x1="6" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-black">TraceLogic</div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make us the preferred choice for thousands of developers and teams worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 hover:-translate-y-1"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                <div className="w-full h-full bg-black transform rotate-45 rounded-lg"></div>
              </div>
              
              {/* Icon Container */}
              <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-black transition-colors duration-300 mb-4">
                <div className="text-black group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-black transition-colors duration-300 rounded-b-xl"></div>
            </div>
          ))}
        </div>

        {/* Stats Section with Animated Counters */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-black mb-2">
              <AnimatedCounter end={10000} suffix="+" />
            </div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-6 bg-black rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">
              <AnimatedCounter end={99.9} suffix="%" decimal={true} />
            </div>
            <div className="text-gray-300">Uptime</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-black mb-2">
              <AnimatedCounter end={50} suffix="+" />
            </div>
            <div className="text-gray-600">Countries</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Today
              <Zap className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-lg border-2 border-black hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Learn More
              <Globe className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;