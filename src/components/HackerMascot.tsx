import React from 'react';

interface HackerMascotProps {
  className?: string;
  eyesOpen?: boolean;
}

const TERMINAL_LINES = [
  { text: '> scanning_perimeter...', delay: '0s' },
  { text: '> bypassing_firewall [OK]', delay: '1.8s' },
  { text: '> access_granted_', delay: '3.6s' },
];

export const HackerMascot: React.FC<HackerMascotProps> = ({ className = '', eyesOpen = true }) => {
  return (
    <div className={`select-none ${className}`} aria-hidden="true">
      <div className="mascot-float relative w-[220px]">
        <svg viewBox="0 0 220 260" className="w-full h-auto overflow-visible">
          <ellipse cx="110" cy="248" rx="70" ry="10" fill="#000000" opacity="0.35" />

          <path
            d="M110 40 C60 40 35 85 35 135 L35 215 C35 228 48 236 62 232 L80 226
               C96 232 124 232 140 226 L158 232 C172 236 185 228 185 215
               L185 135 C185 85 160 40 110 40 Z"
            fill="#14151f"
            stroke="#33344a"
            strokeWidth="2"
          />

          <path
            d="M110 36 C70 36 48 70 45 110 C70 96 150 96 175 110 C172 70 150 36 110 36 Z"
            fill="#1a1b28"
            stroke="#33344a"
            strokeWidth="2"
          />

          <ellipse cx="110" cy="128" rx="46" ry="42" fill="#05060a" />

          <g style={{ opacity: eyesOpen ? 1 : 0, transition: 'opacity 0.25s ease' }}>
            <circle cx="92" cy="126" r="6" fill="#4fd1ae" />
            <circle cx="128" cy="126" r="6" fill="#4fd1ae" />
            <circle cx="92" cy="126" r="10" fill="#4fd1ae" opacity="0.25" className="mascot-eye-glow" />
            <circle cx="128" cy="126" r="10" fill="#4fd1ae" opacity="0.25" className="mascot-eye-glow" />
          </g>
          <g style={{ opacity: eyesOpen ? 0 : 1, transition: 'opacity 0.25s ease' }}>
            <ellipse cx="70" cy="132" rx="9" ry="8" fill="#2a2b3a" stroke="#454669" strokeWidth="1.5" />
            <rect x="76" y="118" width="68" height="28" rx="14" fill="#2a2b3a" stroke="#454669" strokeWidth="1.5" />
            <path
              d="M80 120 C80 106 86 100 90 108 C92 100 100 96 104 104 C106 96 114 96 116 104
                 C120 96 128 100 130 108 C134 100 140 106 140 120 Z"
              fill="#2a2b3a"
              stroke="#454669"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M94 106 L94 118" stroke="#1a1b28" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M110 102 L110 118" stroke="#1a1b28" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M126 106 L126 118" stroke="#1a1b28" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          <rect x="55" y="205" width="110" height="68" rx="8" fill="#0a0b12" stroke="#ffa94d" strokeWidth="2" />
          <rect x="63" y="213" width="94" height="52" rx="4" fill="#05060a" />

          {TERMINAL_LINES.map((line, i) => (
            <text
              key={i}
              x="68"
              y={228 + i * 13}
              fontSize="8"
              fontFamily="monospace"
              fill={i === TERMINAL_LINES.length - 1 ? '#ffa94d' : '#4fd1ae'}
              className="mascot-type"
              style={{ animationDelay: line.delay }}
            >
              {line.text}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};
