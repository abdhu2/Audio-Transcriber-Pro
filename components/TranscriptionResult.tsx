
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface TranscriptionResultProps {
  text: string;
  onDownload: () => void;
}

export const TranscriptionResult: React.FC<TranscriptionResultProps> = ({ text, onDownload }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-200">Transcription Result</h2>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg
                     hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-light/50
                     transition-colors duration-200"
        >
          <DownloadIcon className="w-5 h-5" />
          Download PDF
        </button>
      </div>
      <div className="bg-gray-900/70 p-4 rounded-lg max-h-96 overflow-y-auto border border-gray-700">
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{text}</p>
      </div>
    </div>
  );
};
