import os
import shutil
from fastapi import UploadFile, HTTPException
from typing import List, Optional

ALLOWED_AUDIO_EXTENSIONS = {".mp3", ".wav", ".ogg", ".flac", ".m4a"}
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}

def validate_file_extension(file: UploadFile, allowed_extensions: List[str]) -> bool:
    """
    Validate that the file has an allowed extension.
    
    Args:
        file (UploadFile): The uploaded file.
        allowed_extensions (List[str]): List of allowed file extensions.
        
    Returns:
        bool: True if the file extension is allowed, False otherwise.
    """
    ext = os.path.splitext(file.filename)[1].lower()
    return ext in allowed_extensions

def validate_audio_file(file: UploadFile) -> bool:
    """
    Validate that the file is an allowed audio file.
    
    Args:
        file (UploadFile): The uploaded file.
        
    Returns:
        bool: True if the file is valid, False otherwise.
    """
    return validate_file_extension(file, ALLOWED_AUDIO_EXTENSIONS)

def validate_image_file(file: UploadFile) -> bool:
    """
    Validate that the file is an allowed image file.
    
    Args:
        file (UploadFile): The uploaded file.
        
    Returns:
        bool: True if the file is valid, False otherwise.
    """
    return validate_file_extension(file, ALLOWED_IMAGE_EXTENSIONS)

async def save_upload_file(upload_file: UploadFile, destination: str) -> str:
    """
    Save an uploaded file to the specified destination.
    
    Args:
        upload_file (UploadFile): The uploaded file.
        destination (str): The destination path.
        
    Returns:
        str: The path to the saved file.
    """
    try:
        os.makedirs(os.path.dirname(destination), exist_ok=True)
        with open(destination, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
    finally:
        upload_file.file.close()
    
    return destination 