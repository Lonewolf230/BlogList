import React from 'react';

function SvgLogo() {
  return (
    <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg" style={{marginBottom:"10px"}}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text x="50%" y="50%" fontFamily="'Brush Script MT', cursive" fontSize="70" fill="url(#grad1)" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" transform="translate(0, 10)">
        Blogger
      </text>
      <text x="50%" y="70%" fontFamily="'Brush Script MT', cursive" fontSize="30" fill="black" textAnchor="middle" alignmentBaseline="middle" transform="translate(0, 10)">
        Your Blogging Partner
      </text>
    </svg>
  );
}

export default SvgLogo;
