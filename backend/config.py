import os
import torch
import numpy as np
import random

class Settings:
    PROJECT_NAME: str = "AgriKavach"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1/crop"
    
    # Preprocessing Gatekeeper Thresholds
    MIN_FOLIAGE_COVERAGE_PCT: float = 10.0
    BLUR_THRESHOLD_MIN: float = 50.0
    BLUR_THRESHOLD_OPTIMAL: float = 100.0
    
    # ML Calibration & Inference
    TEMPERATURE: float = 1.4
    OOD_CONFIDENCE_FLOOR: float = 0.45
    AMBIGUITY_THRESHOLD: float = 0.85
    MODEL_VERSION: str = "mobilenetv3-large-crop-v1.2-int8"
    
    # Security & Seeds
    RNG_SEED: int = 42

settings = Settings()

def set_deterministic_seeds():
    random.seed(settings.RNG_SEED)
    np.random.seed(settings.RNG_SEED)
    torch.manual_seed(settings.RNG_SEED)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(settings.RNG_SEED)

set_deterministic_seeds()
