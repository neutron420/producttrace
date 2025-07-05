import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Zap, 
  Shield, 
  Users, 
  Globe, 
  Heart,
  Star,
  Trophy,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const features: Feature[] = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Developer First",
    description: "Built with developers in mind. Clean APIs, comprehensive documentation, and intuitive design patterns that accelerate development.",
    badge: "API Ready"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized for performance with sub-second response times and efficient resource usage across all operations.",
    badge: "< 100ms"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, SOC 2 compliance, and advanced threat protection.",
    badge: "SOC 2"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Collaboration",
    description: "Real-time collaboration tools with advanced permissions, audit trails, and seamless workflow integration.",
    badge: "Real-time"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Scale",
    description: "Distributed infrastructure across 50+ regions with 99.9% uptime guarantee and automatic failover.",
    badge: "99.9% SLA"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Customer Success",
    description: "Dedicated support team with 24/7 availability and average response time under 2 hours.",
    badge: "24/7 Support"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Premium Quality",
    description: "Meticulously crafted with attention to detail, rigorous testing, and commitment to excellence.",
    badge: "Premium"
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Industry Leading",
    description: "Recognized as the top solution by industry experts, featured in major publications and conferences.",
    badge: "Award Winner"
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
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            {/* TraceLogic Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 bg-black rounded-2xl flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-white transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
                <svg width="32" height="32" viewBox="0 0 20 20" fill="none" className="text-white group-hover:text-black transition-colors duration-300 relative z-10">
                  <circle cx="6" cy="6" r="2" fill="currentColor" />
                  <circle cx="14" cy="6" r="2" fill="currentColor" />
                  <circle cx="6" cy="14" r="2" fill="currentColor" />
                  <circle cx="14" cy="14" r="2" fill="currentColor" />
                  <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                  <line x1="6" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="14" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="6" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="14" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                  <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                  <line x1="6" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-black tracking-tight">TraceLogic</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
              Why Choose Our
              <br />
              <span className="relative inline-block">
                Platform
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-black"></div>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the features that make us the preferred choice for thousands of developers 
              and teams worldwide. Built for scale, designed for excellence.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-500 cursor-pointer ${
                hoveredFeature === index 
                  ? 'border-black shadow-2xl scale-105' 
                  : 'border-gray-100 hover:border-gray-300 hover:shadow-lg'
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Badge */}
              {feature.badge && (
                <div className="absolute -top-3 -right-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {feature.badge}
                </div>
              )}
              
              {/* Icon Container */}
              <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${
                hoveredFeature === index 
                  ? 'bg-black text-white' 
                  : 'bg-gray-50 text-black group-hover:bg-gray-100'
              }`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-black group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className={`absolute bottom-8 right-8 transform transition-all duration-300 ${
                hoveredFeature === index ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
              }`}>
                <ChevronRight className="w-5 h-5 text-black" />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-black rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white border-2 border-black rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-black mb-4">Trusted by Industry Leaders</h3>
              <p className="text-gray-600">Numbers that speak for themselves</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 group-hover:border-black transition-all duration-300">
                  <div className="text-4xl font-bold text-black mb-2">
                    <AnimatedCounter end={50000} suffix="+" />
                  </div>
                  <div className="text-gray-600 font-medium">Active Users</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-black rounded-2xl p-6 group-hover:bg-gray-800 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter end={99.9} suffix="%" decimal={true} />
                  </div>
                  <div className="text-gray-300 font-medium">Uptime SLA</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 group-hover:border-black transition-all duration-300">
                  <div className="text-4xl font-bold text-black mb-2">
                    <AnimatedCounter end={195} suffix="+" />
                  </div>
                  <div className="text-gray-600 font-medium">Countries</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 group-hover:border-black transition-all duration-300">
                  <div className="text-4xl font-bold text-black mb-2">
                    <AnimatedCounter end={2} suffix="hrs" />
                  </div>
                  <div className="text-gray-600 font-medium">Avg Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-black">Ready to Get Started?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of developers who trust TraceLogic for their most critical applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <button className="group relative inline-flex items-center px-10 py-4 bg-black text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <span className="relative z-10 flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              <button className="group inline-flex items-center px-10 py-4 bg-white text-black font-semibold rounded-2xl border-2 border-black hover:bg-black hover:text-white transition-all duration-300">
                <span className="flex items-center">
                  Schedule Demo
                  <Globe className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                </span>
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;