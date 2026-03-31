from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import shutil

app = FastAPI()
model = YOLO("yolov8n.pt")  # lightweight model

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results = model(file_path)
    
    detections = []
    for r in results:
        for box in r.boxes:
            detections.append({
                "class": int(box.cls),
                "confidence": float(box.conf),
                "bbox": box.xyxy.tolist()
            })

    return {"detections": detections}