import React, { useState } from 'react';
import './DetectionPage.css';

const AudioDetectionPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an audio file to analyze');
      return;
    }

    // File validation would go here
    
    setIsLoading(true);
    setError('');
    
    // In a real implementation, this would call the API
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      // Simulated response
      const mockResult = {
        filename: fileName,
        content_type: file.type,
        is_deepfake: Math.random() > 0.5, // Random result for demonstration
        confidence: Math.random().toFixed(2),
        processing_time_ms: Math.floor(Math.random() * 500) + 100
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="detection-page">
      <div className="container">
        <h1 className="page-title">Audio Deepfake Detection</h1>
        <p className="page-description">
          Upload an audio file to detect if it's a deepfake. We can identify AI-generated
          speech and voice cloning used in scam calls.
        </p>
        
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="audio-file" className="form-label">
                Select Audio File
              </label>
              <input
                type="file"
                id="audio-file"
                className="form-control"
                accept=".mp3,.wav,.ogg,.flac,.m4a"
                onChange={handleFileChange}
              />
              <small className="form-text">
                Supported formats: MP3, WAV, OGG, FLAC, M4A
              </small>
            </div>
            
            {fileName && (
              <div className="selected-file">
                Selected file: <strong>{fileName}</strong>
              </div>
            )}
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="btn btn-primary mt-3"
              disabled={isLoading || !file}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Audio'}
            </button>
          </form>
        </div>
        
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Analyzing audio for deepfake patterns...</p>
          </div>
        )}
        
        {result && (
          <div className="result-container">
            <h2 className="result-title">Analysis Results</h2>
            <div className={`result-badge ${result.is_deepfake ? 'result-fake' : 'result-real'}`}>
              {result.is_deepfake ? 'LIKELY FAKE' : 'LIKELY REAL'}
            </div>
            <div className="result-details">
              <div className="result-item">
                <span className="result-label">Confidence:</span>
                <span className="result-value">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Processing Time:</span>
                <span className="result-value">{result.processing_time_ms} ms</span>
              </div>
              <div className="result-item">
                <span className="result-label">File:</span>
                <span className="result-value">{result.filename}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioDetectionPage; 