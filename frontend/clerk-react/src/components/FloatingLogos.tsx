import React from 'react';

interface FloatingLogosProps {
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const FloatingLogos: React.FC<FloatingLogosProps> = ({
  speed = 'normal',
  className = ''
}) => {
  const logos = [
    {
      name: 'Sepolia',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/eth.svg',
      fallback: 'SEP'
    },
    {
      name: 'Ethereum',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/eth.svg',
      fallback: 'ETH'
    },
    {
      name: 'Polygon',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/matic.svg',
      fallback: 'POL'
    },
    {
      name: 'Rust',
      icon: 'https://cdn.jsdelivr.net/npm/super-tiny-icons@0.4.0/images/svg/rust.svg',
      fallback: 'RST'
    },
    {
      name: 'Bitcoin',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/btc.svg',
      fallback: 'BTC'
    },
    {
      name: 'Stacks',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/stx.svg',
      fallback: 'STX'
    },
    {
      name: 'MetaMask',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
      fallback: 'MM'
    },
    {
      name: 'Rabbit Wallet',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/generic.svg',
      fallback: 'RW'
    },
    {
      name: 'Solana',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/sol.svg',
      fallback: 'SOL'
    },
    {
      name: 'Chainlink',
      icon: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/link.svg',
      fallback: 'LINK'
    },
    {
      name: 'Solidity',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/solidity.svg',
      fallback: 'SOL'
    }
  ];

  const getAnimationDuration = () => {
    switch(speed) {
      case 'slow': return 40;
      case 'normal': return 25;
      case 'fast': return 15;
      default: return 25;
    }
  };

  const duration = getAnimationDuration();

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-16 ${className}`}>
      
      <div className="relative">
        {/* CSS Animation styles */}
        <style>
          {`
            @keyframes infiniteScroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            
            .scroll-container {
              display: flex;
              align-items: center;
              animation: infiniteScroll ${duration}s linear infinite;
              width: fit-content;
            }
            
            .logo-item {
              width: 90px;
              height: 110px;
              margin: 0 20px;
              flex-shrink: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
              border-radius: 16px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05);
              padding: 16px;
              position: relative;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.8);
              backdrop-filter: blur(10px);
            }
            
            .logo-item:hover {
              transform: translateY(-8px) scale(1.05);
              box-shadow: 0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08);
              border-color: rgba(59, 130, 246, 0.2);
            }
            
            .logo-item::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
            }
            
            .logo-image {
              width: 52px;
              height: 52px;
              object-fit: contain;
              transition: all 0.3s ease;
              margin-bottom: 12px;
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }
            
            .logo-item:hover .logo-image {
              transform: scale(1.1);
              filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
            }
            
            .logo-name {
              font-size: 11px;
              font-weight: 600;
              color: #1e293b;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 100%;
              letter-spacing: 0.02em;
            }
            
            .logo-fallback {
              position: absolute;
              top: 35%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-weight: 700;
              font-size: 14px;
              color: #475569;
              opacity: 0;
              transition: opacity 0.3s ease;
              background: linear-gradient(135deg, #3b82f6, #1d4ed8);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .logo-item.show-fallback .logo-image {
              opacity: 0;
            }
            
            .logo-item.show-fallback .logo-fallback {
              opacity: 1;
            }
            
            /* Subtle shimmer effect */
            .logo-item::after {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
              transform: rotate(45deg);
              transition: transform 0.6s ease;
              opacity: 0;
            }
            
            .logo-item:hover::after {
              transform: rotate(45deg) translate(50%, 50%);
              opacity: 1;
            }
          `}
        </style>

        {/* Scrolling logos container */}
        <div className="flex">
          {/* First set of logos */}
          <div className="scroll-container">
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}-1`}
                className="logo-item"
                title={logo.name}
              >
                <img
                  src={logo.icon}
                  alt={logo.name}
                  className="logo-image"
                  onError={(e) => {
                    e.currentTarget.parentElement?.classList.add('show-fallback');
                  }}
                  onLoad={(e) => {
                    e.currentTarget.parentElement?.classList.remove('show-fallback');
                  }}
                />
                <div className="logo-name">{logo.name}</div>
                <div className="logo-fallback">
                  {logo.fallback}
                </div>
              </div>
            ))}
          </div>
          
          {/* Second set of logos for seamless loop */}
          <div className="scroll-container">
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}-2`}
                className="logo-item"
                title={logo.name}
              >
                <img
                  src={logo.icon}
                  alt={logo.name}
                  className="logo-image"
                  onError={(e) => {
                    e.currentTarget.parentElement?.classList.add('show-fallback');
                  }}
                  onLoad={(e) => {
                    e.currentTarget.parentElement?.classList.remove('show-fallback');
                  }}
                />
                <div className="logo-name">{logo.name}</div>
                <div className="logo-fallback">
                  {logo.fallback}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingLogos;