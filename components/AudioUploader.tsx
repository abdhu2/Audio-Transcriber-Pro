
import React, { useRef, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface AudioUploaderProps {
  onFileSelect: (file: File | null) => void;
  onTranscribe: () => void;
  isLoading: boolean;
  selectedFile: File | null;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileSelect, onTranscribe, isLoading, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      onFileSelect(file);
    }
  };

  const handleLabelClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl">
      <label
        htmlFor="audio-upload"
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
                    ${isDragging ? 'border-brand-primary bg-brand-dark/30' : 'border-gray-600 hover:border-brand-light hover:bg-gray-800'}`}
        onClick={handleLabelClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold text-brand-light">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">Any audio format (MP3, WAV, M4A, etc.)</p>
        </div>
        <input id="audio-upload" ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
      </label>
      
      {selectedFile && (
        <div className="mt-4 text-center text-gray-300">
          Selected file: <span className="font-medium text-brand-light">{selectedFile.name}</span>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={onTranscribe}
          disabled={!selectedFile || isLoading}
          className="px-8 py-3 text-lg font-semibold text-white bg-brand-primary rounded-lg shadow-lg
                     hover:bg-brand-secondary focus:outline-none focus:ring-4 focus:ring-brand-primary/50
                     transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed
                     disabled:opacity-50 transform hover:scale-105"
        >
          {isLoading ? 'Transcribing...' : 'Transcribe Audio'}
        </button>
      </div>
    </div>
  );
};
