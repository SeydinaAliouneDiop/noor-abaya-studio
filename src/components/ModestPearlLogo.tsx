import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light' | 'gold';
  className?: string;
}

export default function ModestPearlLogo({ size = 'md', variant = 'dark', className = '' }: LogoProps) {
  const sizes = { sm: 36, md: 56, lg: 100 };
  const h = sizes[size];
  const w = h * 0.75;

  const mainColor = variant === 'light' ? '#F5F0E8' : variant === 'gold' ? '#C9A84C' : '#1A0A2A';
  const leafColor = variant === 'light' ? '#F5F0E8' : variant === 'gold' ? '#C9A84C' : '#1A0A2A';

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 75 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Modest Pearl Logo"
    >
      {/* M letter */}
      <rect x="4"  y="5"  width="7"  height="38" fill={mainColor}/>
      <rect x="64" y="5"  width="7"  height="38" fill={mainColor}/>
      <polygon points="4,5 11,5 37.5,28 30.5,28" fill={mainColor}/>
      <polygon points="71,5 64,5 37.5,28 44.5,28" fill={mainColor}/>

      {/* P letter - overlapping */}
      <rect x="34" y="18" width="7" height="38" fill={mainColor}/>
      <path
        d="M41 18 Q68 18 68 32 Q68 46 41 46 L41 39 Q60 39 60 32 Q60 25 41 25 Z"
        fill={mainColor}
      />

      {/* Botanical stem */}
      <line x1="47" y1="60" x2="47" y2="74" stroke={leafColor} strokeWidth="1.2" strokeLinecap="round"/>

      {/* Left branch + leaf */}
      <line x1="47" y1="67" x2="36" y2="61" stroke={leafColor} strokeWidth="0.9" strokeLinecap="round"/>
      <ellipse cx="32" cy="59" rx="6" ry="3" transform="rotate(-40 32 59)" fill="none" stroke={leafColor} strokeWidth="0.9"/>

      {/* Right branch + leaf */}
      <line x1="47" y1="63" x2="58" y2="57" stroke={leafColor} strokeWidth="0.9" strokeLinecap="round"/>
      <ellipse cx="62" cy="55" rx="6" ry="3" transform="rotate(40 62 55)" fill="none" stroke={leafColor} strokeWidth="0.9"/>

      {/* Upper left small */}
      <line x1="47" y1="61" x2="38" y2="55" stroke={leafColor} strokeWidth="0.7" strokeLinecap="round"/>
      <ellipse cx="34" cy="53" rx="4.5" ry="2" transform="rotate(-35 34 53)" fill="none" stroke={leafColor} strokeWidth="0.7"/>

      {/* Upper right small */}
      <line x1="47" y1="62" x2="56" y2="56" stroke={leafColor} strokeWidth="0.7" strokeLinecap="round"/>
      <ellipse cx="60" cy="54" rx="4.5" ry="2" transform="rotate(35 60 54)" fill="none" stroke={leafColor} strokeWidth="0.7"/>

      {/* Bottom sprigs */}
      <line x1="47" y1="71" x2="40" y2="75" stroke={leafColor} strokeWidth="0.6" strokeLinecap="round"/>
      <ellipse cx="37" cy="77" rx="4" ry="2" transform="rotate(-20 37 77)" fill="none" stroke={leafColor} strokeWidth="0.6"/>
      <line x1="47" y1="72" x2="54" y2="76" stroke={leafColor} strokeWidth="0.6" strokeLinecap="round"/>
      <ellipse cx="57" cy="78" rx="4" ry="2" transform="rotate(20 57 78)" fill="none" stroke={leafColor} strokeWidth="0.6"/>
    </svg>
  );
}
