import cv2
import numpy as np
from config import settings

class QualityGateService:
    @staticmethod
    def evaluate_image(image_bytes: bytes, crop_species: str = "") -> dict:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return {"isPassed": False, "hasFoliageMask": False, "sharpnessScore": 0.0, "warningCode": "INVALID_IMAGE_FORMAT"}

        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # 1. CROSS-VALIDATION GUARD (Potato vs Tomato)
        if crop_species.upper() == "TOMATO":
            # Check for heavy beige/tan tuber colors
            lower_beige = np.array([10, 20, 50])
            upper_beige = np.array([30, 150, 220])
            mask_beige = cv2.inRange(hsv, lower_beige, upper_beige)
            beige_pct = (cv2.countNonZero(mask_beige) / (img.shape[0] * img.shape[1])) * 100.0
            
            if beige_pct > 25.0:
                return {
                    "isPassed": False, 
                    "hasFoliageMask": True, 
                    "sharpnessScore": 100.0, 
                    "warningCode": "CROP_MISMATCH_DETECTED"
                }
        
        # 2. GREEN FOLIAGE MASK
        lower_green = np.array([25, 40, 30])
        upper_green = np.array([85, 255, 255])
        mask = cv2.inRange(hsv, lower_green, upper_green)
        
        foliage_pct = (cv2.countNonZero(mask) / (img.shape[0] * img.shape[1])) * 100.0
        
        if foliage_pct < settings.MIN_FOLIAGE_COVERAGE_PCT and crop_species.upper() != "POTATO":
            return {"isPassed": False, "hasFoliageMask": False, "sharpnessScore": 0.0, "warningCode": "NO_LEAF_DETECTED"}

        # 3. LAPLACIAN VARIANCE (Blur Detection)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        masked_gray = cv2.bitwise_and(gray, gray, mask=mask)
        variance = float(cv2.Laplacian(masked_gray, cv2.CV_64F)[mask > 0].var()) if np.any(mask > 0) else float(cv2.Laplacian(gray, cv2.CV_64F).var())
        
        if variance < settings.BLUR_THRESHOLD_MIN:
            return {"isPassed": False, "hasFoliageMask": True, "sharpnessScore": round(variance, 2), "warningCode": "IMAGE_BLUR_THRESHOLD_FAILED"}
            
        return {"isPassed": True, "hasFoliageMask": True, "sharpnessScore": round(variance, 2), "warningCode": None}
