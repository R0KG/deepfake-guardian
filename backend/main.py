from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.models.DeepFakeDetector import DeepFakeDetector

app = FastAPI(
    title="Deepfake Guardian API",
    description="API for detecting deepfake audio and images",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Deepfake Guardian API"}

@app.post("/detect/audio")
async def detect_audio_deepfake(file: UploadFile = File(...)):
    detector = DeepFakeDetector()
    return  await detector.detect_audio_deepfake(file) 

@app.post("/detect/image")
async def detect_image_deepfake(file: UploadFile = File(...)):
    detector = DeepFakeDetector()
    return await detector.detect_image_deepfake(file)

# Import and include API routers here
# from app.api.routes import audio_router, image_router
# app.include_router(audio_router)
# app.include_router(image_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 