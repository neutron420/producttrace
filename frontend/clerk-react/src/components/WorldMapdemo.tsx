import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  isDark?: boolean;
}

const WorldMap: React.FC<MapProps> = ({ 
  dots = [], 
  lineColor = "#0ea5e9",
  isDark = false 
}) => {
  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const worldMapSvg = `
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <!-- Better contrast dotted pattern -->
      <defs>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="0.8" fill="${isDark ? '#ffffff' : '#333333'}" opacity="${isDark ? '0.9' : '0.8'}" />
        </pattern>
      </defs>
      
      <!-- Continents as simplified shapes filled with dots -->
      <!-- North America -->
      <path d="M 120 80 L 200 60 L 280 80 L 300 120 L 280 160 L 200 180 L 120 160 Z" fill="url(#dots)" />
      
      <!-- South America -->
      <path d="M 200 200 L 240 190 L 260 220 L 280 280 L 260 340 L 220 360 L 200 340 L 180 280 Z" fill="url(#dots)" />
      
      <!-- Europe -->
      <path d="M 360 80 L 420 70 L 450 90 L 440 120 L 400 140 L 360 130 Z" fill="url(#dots)" />
      
      <!-- Africa -->
      <path d="M 380 150 L 420 140 L 460 160 L 480 200 L 470 280 L 450 320 L 420 340 L 390 320 L 370 280 L 360 200 Z" fill="url(#dots)" />
      
      <!-- Asia -->
      <path d="M 460 60 L 600 50 L 700 70 L 720 100 L 700 140 L 650 160 L 580 180 L 520 170 L 460 140 Z" fill="url(#dots)" />
      
      <!-- Australia -->
      <path d="M 600 280 L 680 270 L 720 290 L 710 320 L 680 330 L 620 325 L 590 310 Z" fill="url(#dots)" />
      
      <!-- Additional landmasses -->
      <circle cx="100" cy="60" r="12" fill="url(#dots)" />
      <circle cx="680" cy="120" r="8" fill="url(#dots)" />
      <circle cx="750" cy="200" r="6" fill="url(#dots)" />
    </svg>
  `;

  return (
    <div className={`w-full aspect-[2/1] ${isDark ? 'bg-black' : 'bg-white'} rounded-lg relative font-sans overflow-hidden`}>
      <div 
        className="h-full w-full absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(worldMapSvg)}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)'
        }}
      />
      
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: 1000,
                  animation: `drawPath 2s ease-out ${i * 0.5}s forwards`
                } as React.CSSProperties}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite'
                } as React.CSSProperties}
              />
            </g>
            <g>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite'
                } as React.CSSProperties}
              />
            </g>
          </g>
        ))}
      </svg>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes drawPath {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes pulse {
            0% {
              r: 3px;
              opacity: 0.5;
            }
            50% {
              r: 8px;
              opacity: 0.2;
            }
            100% {
              r: 3px;
              opacity: 0.5;
            }
          }
        `
      }} />
    </div>
  );
};

const WorldMapDemo: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const targetText = 'Connectivity';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setAnimatedText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`py-20 ${isDark ? 'bg-black' : 'bg-white'} w-full min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Improved Toggle Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`group relative inline-flex items-center justify-center p-1 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25'
            } hover:scale-105 active:scale-95`}
          >
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-800'
            }`}>
              <div className="relative">
                {isDark ? (
                  <Moon className="w-5 h-5 text-blue-400 transition-all duration-300" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500 transition-all duration-300 animate-pulse" />
                )}
              </div>
              <span className="font-medium text-sm">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 blur-md' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 blur-md'
            }`} style={{ zIndex: -1 }} />
          </button>
        </div>
        
        <div className="text-center mb-12">
          <h1 className={`font-bold text-4xl md:text-6xl mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Remote{' '}
            <span className="text-neutral-400">
              {animatedText}
            </span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Break free from traditional boundaries. Work from anywhere, at the
            comfort of your own studio apartment. Perfect for Nomads and
            Travellers.
          </p>
        </div>
        
        <WorldMap
          isDark={isDark}
          lineColor="#0ea5e9"
          dots={[
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>
    </div>
  );
};

export default WorldMapDemo;