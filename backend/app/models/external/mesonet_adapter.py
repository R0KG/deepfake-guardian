# mesonet_adapter.py
import sys
import os
import numpy as np
from PIL import Image
import cv2


MESONET_PATH = os.path.join(os.path.dirname(__file__), 'external', 'MesoNet')
sys.path.append(MESONET_PATH)

from external.MesoNet.classifiers import *

class MesoNetAdapter:
    def __init__(self):
        self.model = Meso4()
   # Load pre-trained weights
        weights_path = os.path.join(MESONET_PATH, 'weights', 'Meso4_DF.h5')
        if os.path.exists(weights_path):
            self.model.load(weights_path)
            print("MesoNet model loaded successfully")
        else:
            print(f"Warning: MesoNet weights not found at {weights_path}")
    
    def preprocess_image(self, image_path):
        """
        Preprocess the image to be used by the model.
        """
        img = Image.open(image_path)
        img = img.resize((256, 256))
        img_array = np.array(img)
        img_array = img_array.astype('float32') / 255.0

        return img_array
    
    def predict(self, image_path):
        """
        Predict if the image is a deepfake.
        """
        img = self.preprocess_image(image_path)
        
        # Expand dimensions to create a batch
        img_batch = np.expand_dims(img, axis=0)
        
        # Get prediction
        prediction = self.model.predict(img_batch)[0][0]
        
        return {
            "is_deepfake": bool(prediction > 0.5),
            "confidence": float(prediction),
            "model": "MesoNet"
        }
    
