import pytest
import numpy as np
import cv2
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def create_synthetic_leaf(sharp: bool = True, green: bool = True) -> bytes:
    # Generate 300x300 canvas
    img = np.zeros((300, 300, 3), dtype=np.uint8)
    if green:
        # Green RGB (BGR in OpenCV: 30, 180, 50)
        img[:, :] = (30, 180, 50)
        # Add high-frequency textures if sharp
        if sharp:
            for i in range(10, 290, 15):
                cv2.line(img, (i, 0), (i, 300), (10, 100, 20), 2)
    else:
        # Non-green grey canvas
        img[:, :] = (128, 128, 128)

    if not sharp:
        img = cv2.GaussianBlur(img, (35, 35), 0)

    _, encoded = cv2.imencode(".jpg", img)
    return encoded.tobytes()

def test_quality_gate_rejects_non_leaf():
    non_leaf_bytes = create_synthetic_leaf(sharp=True, green=False)
    response = client.post(
        "/api/v1/crop/diagnose",
        files={"image_file": ("non_leaf.jpg", non_leaf_bytes, "image/jpeg")},
        data={"crop_species": "TOMATO", "language_pref": "en"}
    )
    assert response.status_code == 422
    assert response.json()["detail"]["error"] == "NO_LEAF_DETECTED"

def test_quality_gate_rejects_blurry_leaf():
    blurry_leaf_bytes = create_synthetic_leaf(sharp=False, green=True)
    response = client.post(
        "/api/v1/crop/diagnose",
        files={"image_file": ("blurry.jpg", blurry_leaf_bytes, "image/jpeg")},
        data={"crop_species": "TOMATO", "language_pref": "en"}
    )
    assert response.status_code == 422
    assert response.json()["detail"]["error"] == "IMAGE_BLUR_THRESHOLD_FAILED"

def test_successful_sharp_leaf_diagnosis():
    sharp_leaf_bytes = create_synthetic_leaf(sharp=True, green=True)
    response = client.post(
        "/api/v1/crop/diagnose",
        files={"image_file": ("sharp.jpg", sharp_leaf_bytes, "image/jpeg")},
        data={"crop_species": "TOMATO", "language_pref": "hi"}
    )
    assert response.status_code == 200
    res_data = response.json()["data"]
    assert res_data["primaryDiagnosis"]["diseaseCode"] == "TOMATO_EARLY_BLIGHT"
    assert "अगेती झुलसा" in res_data["primaryDiagnosis"]["regionalName"]
    assert res_data["telemetry"]["inferenceLatencyMs"] > 0
