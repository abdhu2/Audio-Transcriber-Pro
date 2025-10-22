
import React from 'react';

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 15v-8m0 8-2.5-2.5M12 15l2.5-2.5M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    />
  </svg>
);
