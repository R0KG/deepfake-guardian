import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// API service functions
const apiService = {
  /**
   * Detect if an audio file is a deepfake
   * 
   * @param {File} file - The audio file to analyze
   * @returns {Promise} - Promise with the detection result
   */
  detectAudioDeepfake: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await apiClient.post('/detect/audio', formData);
      return response.data;
    } catch (error) {
      console.error('Error detecting audio deepfake:', error);
      throw error;
    }
  },
  
  /**
   * Detect if an image is a deepfake
   * 
   * @param {File} file - The image file to analyze
   * @returns {Promise} - Promise with the detection result
   */
  detectImageDeepfake: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await apiClient.post('/detect/image', formData);
      return response.data;
    } catch (error) {
      console.error('Error detecting image deepfake:', error);
      throw error;
    }
  },
};

export default apiService; 