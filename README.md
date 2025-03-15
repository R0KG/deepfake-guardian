# Deepfake Guardian

An AI-powered fraud detection tool that can detect deepfake audio and images.

## Project Overview

Deepfake Guardian is a minimal but functional AI-powered fraud detection tool that can:
- Detect deepfake audio (fake CEO calls, AI-generated speech)
- Detect deepfake images (doctored invoices, fake face swaps)
- Provide a simple UI for testing file uploads and getting results
- Run without user authentication or data storage (stateless prototype)

## Tech Stack

- **Backend**: FastAPI + Python
- **ML Models**: PyTorch / TensorFlow
- **Audio Processing**: Librosa + Wav2Vec2
- **Image Processing**: OpenCV + PIL + TorchVision
- **Frontend**: React
- **Deployment**: Docker + AWS Lambda / EC2

## Project Structure

```
deepfake-guardian/
├── backend/                  # FastAPI server
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   ├── core/             # Core application code
│   │   ├── models/           # ML model definitions
│   │   └── utils/            # Utility functions
│   ├── tests/                # Backend tests
│   ├── main.py               # FastAPI application entry point
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile            # Docker configuration for backend
├── frontend/                 # React frontend
│   ├── public/               # Static files
│   ├── src/                  # React source code
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service calls
│   │   └── utils/            # Utility functions
│   ├── package.json          # Node.js dependencies
│   └── Dockerfile            # Docker configuration for frontend
├── models/                   # Pre-trained ML models
│   ├── audio/                # Audio deepfake detection models
│   └── image/                # Image deepfake detection models
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # Project documentation
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 14+
- Docker (optional, for containerized deployment)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Docker Deployment

To run the entire application using Docker:

```
docker-compose up -d
```

## Development Milestones

- **Week 1-2**: Setup & Backend Development
- **Week 3**: Frontend & UI Integration
- **Week 4**: Testing & Deployment

## Next Steps After MVP

- Add authentication & logging
- Support real-time audio analysis
- Train on custom fraud datasets
- Implement subscription model 


## Plan 
<think>The user is asking for advice on the best approach for their deepfake detection project, specifically about models and how the system should work. Based on the context of our conversation so far, I understand this is related to the Deepfake Guardian project that detects deepfake audio and images.

Let me organize my thoughts on how to recommend a comprehensive approach:

1. Model architecture and selection
2. Implementation strategy
3. Integration with the existing FastAPI backend and React frontend
4. Processing pipeline
5. Performance considerations</think># Deepfake Guardian Project: Modeling and Architecture Recommendations

For your Deepfake Guardian project, here's a comprehensive approach for implementing the models and system architecture:

## 1. Model Selection

### Audio Deepfake Detection
- **Pre-trained models**: Consider using [RawNet2](https://github.com/asvspoof-challenge/2021) or [WaveFake](https://github.com/RUB-SysSec/WaveFake) which are specialized for audio spoofing detection
- **Features to extract**: Mel-frequency cepstral coefficients (MFCCs), spectrograms, or raw waveform analysis
- **Lightweight alternative**: For faster inference, XGBoost or LightGBM trained on audio features

### Image Deepfake Detection
- **CNN-based models**: EfficientNet or MesoNet which are optimized for facial manipulation detection
- **Transformer-based**: Consider [CLIP](https://github.com/openai/CLIP) fine-tuned for deepfake detection
- **Feature extraction**: Focus on facial inconsistencies, unnatural lighting, blending artifacts

## 2. Implementation Strategy

### Two-Tier Approach
1. **Fast screening tier**: Lightweight models for quick initial assessment
2. **Deep analysis tier**: More complex models for detailed analysis on suspicious content

### Processing Pipeline
```
Input → Preprocessing → Feature Extraction → Model Inference → Confidence Score → Results
```

## 3. System Architecture

### Backend (FastAPI)
```
POST /api/detect/audio
POST /api/detect/image
GET /api/results/{id}
```

- **Async processing**: Use background tasks for long-running model inference
- **Result caching**: Store analysis results in MongoDB for future reference
- **Model serving**: Load models at startup or on-demand with intelligent caching

### Frontend (React)
- Upload interface with drag-and-drop
- Progress indicators during processing
- Detailed results visualization
- Historical analysis view

## 4. Model Management

### Container-Based Deployment
- Package models in separate containers for scalability
- Use volume mounting for model weights as you've already set up
- Consider using ONNX format for cross-platform compatibility

### Model Versioning
- Implement versioning for models to track performance changes
- Store metadata about model versions in MongoDB

## 5. Technical Implementation

```python
# Example core detection service
class DeepfakeDetector:
    def __init__(self):
        self.audio_model = self._load_audio_model()
        self.image_model = self._load_image_model()
    
    def _load_audio_model(self):
        # Load from PyTorch, TensorFlow, or ONNX
        return torch.load("/app/models/audio/model.pt")
    
    def _load_image_model(self):
        return torch.load("/app/models/image/model.pt")
    
    async def detect_audio(self, file_path):
        # Preprocess audio
        features = self._extract_audio_features(file_path)
        # Run inference
        prediction = self.audio_model(features)
        return {
            "is_deepfake": bool(prediction > 0.5),
            "confidence": float(prediction),
            "analysis_details": self._generate_audio_report(prediction, features)
        }
    
    async def detect_image(self, file_path):
        # Similar implementation for images
        pass
```

## 6. Pretrained Models vs Custom Training

- **Pretrained route**: Use [DeepFake Detection Challenge](https://ai.facebook.com/datasets/dfdc/) models or Kaggle competition winners
- **Custom training**: Start with public datasets like FaceForensics++, ASVspoof for audio

## 7. Scaling Considerations

- Implement queue system (like Redis) for handling multiple requests
- Consider GPU acceleration for inference
- Implement rate limiting and user authentication

## Next Steps

1. Research and select specific models for audio and image detection
2. Implement a simple prototype with one model for each type
3. Test with known deepfake examples
4. Iterate and improve based on performance

Would you like me to elaborate on any specific part of this approach, or would you prefer a more detailed implementation for either the audio or image detection components?
