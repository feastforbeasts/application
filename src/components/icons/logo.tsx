import type { SVGProps } from 'react';

export function FeastForBeastsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="150"
      height="37.5" // Adjusted to maintain aspect ratio with width 150
      aria-label="FeastForBeasts Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(120, 39%, 60%)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path 
        d="M10 25 Q15 10 25 25 T40 25 M15 20 Q25 5 35 20" 
        fill="none" 
        stroke="url(#logoGradient)" 
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="48"
        y="32"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        FeastForBeasts
      </text>
    </svg>
  );
}

export function IconFeast(props: SVGProps<SVGSVGElement>) {
  // A simpler icon version, perhaps a leaf or food item
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.03 0-5.61-1.94-6.56-4.65.18-.63.58-1.17 1.1-1.59.34-.28.74-.46 1.17-.54.46-.09.93-.09 1.39.01.16-1.3.78-2.47 1.74-3.36.95-.88 2.18-1.46 3.54-1.63.2-.02.4-.03.61-.03.23 0 .45.01.66.04.08 0 .17.01.25.01.5-.48 1.15-.8 1.89-.89.78-.09 1.57.04 2.27.39.06.03.12.06.18.09.46.25.83.61 1.07 1.04.27.47.37 1 .29 1.51-.04.28-.12.55-.23.81-.22.52-.58.96-1.03 1.27-.41.28-.88.44-1.37.46h-.12c-.09-.68-.33-1.32-.7-1.86-.37-.54-.86-1-1.44-1.3C13.3 10.2 12.6 10 12 10c-.94 0-1.79.41-2.38 1.08-.59.67-.9 1.55-.82 2.5l2.7-.29c.03 0 .05-.01.08-.01.35 0 .69.06 1.01.17.6.21 1.09.6 1.43 1.11.08.12.15.24.21.37.17.35.26.73.26 1.12 0 .9-.43 1.71-1.13 2.22C14.2 19.57 13.14 20 12 20z" />
      <path d="M12 12c0-1.48-.86-2.75-2.05-3.34-.12-.06-.25-.1-.38-.15" />
    </svg>
  );
}
