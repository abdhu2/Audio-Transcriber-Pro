
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-light"></div>
      <p className="text-lg text-gray-300">Processing audio, please wait...</p>
    </div>
  );
};
