import React, { useState } from 'react';
import './DetectionPage.css';

const ImageDetectionPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState('');
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
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image to analyze');
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
        <h1 className="page-title">Image Deepfake Detection</h1>
        <p className="page-description">
          Upload an image to detect if it's a deepfake. We can identify manipulated photos,
          doctored invoices, or fake identities.
        </p>
        
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="image-file" className="form-label">
                Select Image
              </label>
              <input
                type="file"
                id="image-file"
                className="form-control"
                accept=".jpg,.jpeg,.png,.bmp,.tiff"
                onChange={handleFileChange}
              />
              <small className="form-text">
                Supported formats: JPG, JPEG, PNG, BMP, TIFF
              </small>
            </div>
            
            {preview && (
              <div className="image-preview-container">
                <h3 className="preview-title">Image Preview</h3>
                <img src={preview} alt="Preview" className="image-preview" />
              </div>
            )}
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="btn btn-primary mt-3"
              disabled={isLoading || !file}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </form>
        </div>
        
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Analyzing image for deepfake patterns...</p>
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

export default ImageDetectionPage; 