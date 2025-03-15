import torch
from .external.mesonet_adapter import MesoNetAdapter
import logging
import tempfile
import os
class DeepFakeDetector:
    def __init__(self):
        self.audio_model = self.load_audio_model()
        self.image_model = MesoNetAdapter()

    def detect_audio_deepfake(self, audio_file: str):
        features = self.extract_audio_features(audio_file)
        
        predictions = self.audio_model(features)
        
        return {
            "is_deepfake": bool(predictions > 0.5),
            "confidence": float(predictions),
            "analysis_details": self._generate_audio_report(predictions, features)
        }
    async def detect_image_deepfake(self, image_file: str):
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file_path = temp_file.name
            # Read the file content
            content = await file.read()
            # Write to the temporary file
            temp_file.write(content)
        
        try:
            # Process with MesoNet
            result = self.image_detector.predict(temp_file_path)
            return result
        finally:
            # Clean up the temporary file
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)
        
        
        
    


    def load_audio_model(self):
        return torch.load("backend/app/models/audio_model.pth")

    def load_image_model(self):
        return torch.load("backend/app/models/image_model.pth")


