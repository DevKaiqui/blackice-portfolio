import React from 'react';

interface SecurityShieldProps {
  className?: string;
}

const FLOATING_BITS = [
  { char: '1', x: 40, y: 60, delay: '0s', duration: '6s' },
  { char: '0', x: 360, y: 90, delay: '1.2s', duration: '7s' },
  { char: '0', x: 30, y: 220, delay: '2.4s', duration: '5.5s' },
  { char: '1', x: 370, y: 260, delay: '0.6s', duration: '6.5s' },
  { char: '1', x: 55, y: 380, delay: '3s', duration: '7.5s' },
  { char: '0', x: 345, y: 400, delay: '1.8s', duration: '6s' },
  { char: '0', x: 20, y: 140, delay: '4s', duration: '8s' },
  { char: '1', x: 380, y: 170, delay: '2.6s', duration: '6.8s' },
];

export const SecurityShield: React.FC<SecurityShieldProps> = ({ className = '' }) => {
  return (
    <div className={`select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 480" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="shield-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffa94d" />
            <stop offset="100%" stopColor="#4fd1ae" />
          </linearGradient>
          <radialGradient id="shield-core-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#4fd1ae" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4fd1ae" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric scan rings */}
        <circle cx="200" cy="220" r="120" fill="none" stroke="#ffa94d" strokeWidth="1" opacity="0.15" className="shield-ring" />
        <circle cx="200" cy="220" r="120" fill="none" stroke="#4fd1ae" strokeWidth="1" opacity="0.12" className="shield-ring" style={{ animationDelay: '1.3s' }} />
        <circle cx="200" cy="220" r="120" fill="none" stroke="#ffa94d" strokeWidth="1" opacity="0.1" className="shield-ring" style={{ animationDelay: '2.6s' }} />

        {/* Ambient core glow */}
        <circle cx="200" cy="220" r="160" fill="url(#shield-core-glow)" />

        {/* Circuit traces */}
        <g stroke="#33344a" strokeWidth="1.5" fill="none" opacity="0.8">
          <path d="M60 80 L60 40 L110 40" />
          <path d="M340 90 L340 50 L290 50" />
          <path d="M50 400 L50 440 L100 440" />
          <path d="M350 410 L350 440 L305 440" />
          <circle cx="110" cy="40" r="3" fill="#ffa94d" />
          <circle cx="290" cy="50" r="3" fill="#4fd1ae" />
          <circle cx="100" cy="440" r="3" fill="#4fd1ae" />
          <circle cx="305" cy="440" r="3" fill="#ffa94d" />
        </g>

        {/* Floating binary digits */}
        {FLOATING_BITS.map((bit, i) => (
          <text
            key={i}
            x={bit.x}
            y={bit.y}
            fontSize="14"
            fontFamily="'JetBrains Mono', monospace"
            fill={i % 2 === 0 ? '#ffa94d' : '#4fd1ae'}
            className="shield-bit"
            style={{ animationDelay: bit.delay, animationDuration: bit.duration }}
          >
            {bit.char}
          </text>
        ))}

        {/* Shield outline */}
        <g className="shield-pulse">
          <path
            d="M200 70 L300 105 C300 220 270 320 200 370 C130 320 100 220 100 105 Z"
            fill="#0d0e18"
            stroke="url(#shield-stroke)"
            strokeWidth="3"
          />
          <path
            d="M200 92 L282 121 C282 218 256 302 200 345 C144 302 118 218 118 121 Z"
            fill="none"
            stroke="#33344a"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Padlock */}
          <rect x="170" y="195" width="60" height="48" rx="6" fill="#14151f" stroke="#4fd1ae" strokeWidth="2" />
          <path
            d="M182 195 L182 175 C182 160 218 160 218 175 L218 195"
            fill="none"
            stroke="#4fd1ae"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="200" cy="214" r="6" fill="#ffa94d" className="shield-eye-glow" />
          <rect x="197" y="218" width="6" height="14" rx="2" fill="#ffa94d" />
        </g>

        {/* Vertical scan sweep */}
        <rect x="100" y="70" width="200" height="300" fill="url(#shield-core-glow)" opacity="0.5" className="shield-scan" clipPath="url(#shield-clip)" />
        <clipPath id="shield-clip">
          <path d="M200 70 L300 105 C300 220 270 320 200 370 C130 320 100 220 100 105 Z" />
        </clipPath>
      </svg>
    </div>
  );
};
