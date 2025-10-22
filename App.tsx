
import React, { useState, useCallback } from 'react';
import { AudioUploader } from './components/AudioUploader';
import { TranscriptionResult } from './components/TranscriptionResult';
import { Loader } from './components/Loader';
import { transcribeAudio } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { usePdfDownloader } from './hooks/usePdfDownloader';

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPdf = usePdfDownloader();

  const handleFileSelect = useCallback((file: File | null) => {
    setAudioFile(file);
    setTranscribedText('');
    setError(null);
  }, []);

  const handleTranscribe = async () => {
    if (!audioFile) {
      setError('Please select an audio file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranscribedText('');

    try {
      const { base64, mimeType } = await fileToBase64(audioFile);
      const text = await transcribeAudio(base64, mimeType);
      setTranscribedText(text);
    } catch (err) {
      console.error(err);
      setError('Failed to transcribe audio. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (transcribedText && audioFile) {
      downloadPdf(transcribedText, audioFile.name.replace(/\.[^/.]+$/, "") + '_transcription.pdf');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-brand-dark text-white font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent mb-2">
            Audio Transcriber Pro
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Upload your audio file, and let Gemini's powerful AI convert it into accurate text.
          </p>
        </header>

        <div className="w-full max-w-4xl space-y-8">
          <AudioUploader
            onFileSelect={handleFileSelect}
            onTranscribe={handleTranscribe}
            isLoading={isLoading}
            selectedFile={audioFile}
          />

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && <Loader />}
          
          {transcribedText && !isLoading && (
            <TranscriptionResult
              text={transcribedText}
              onDownload={handleDownload}
            />
          )}
        </div>

        <footer className="text-center text-gray-500 mt-16">
          <p>Powered by Google Gemini</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
