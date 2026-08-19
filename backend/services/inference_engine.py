import time
import cv2
import numpy as np

class SmartHeuristicEngine:
    def __init__(self):
        pass

    def infer(self, image_bytes: bytes, crop: str, language_pref: str) -> dict:
        t0 = time.perf_counter()
        
        # Decode image
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # Color Masks
        # 1. Healthy Green
        lower_green = np.array([35, 40, 30])
        upper_green = np.array([85, 255, 255])
        mask_green = cv2.inRange(hsv, lower_green, upper_green)
        
        # 2. Yellow / Chlorosis (Rust)
        lower_yellow = np.array([15, 50, 50])
        upper_yellow = np.array([35, 255, 255])
        mask_yellow = cv2.inRange(hsv, lower_yellow, upper_yellow)
        
        # 3. Brown / Necrotic (Blight)
        lower_brown = np.array([0, 20, 20])
        upper_brown = np.array([20, 255, 200])
        mask_brown = cv2.inRange(hsv, lower_brown, upper_brown)
        
        # Count pixels
        green_px = cv2.countNonZero(mask_green)
        yellow_px = cv2.countNonZero(mask_yellow)
        brown_px = cv2.countNonZero(mask_brown)
        
        total_leaf_px = green_px + yellow_px + brown_px
        if total_leaf_px == 0:
            total_leaf_px = 1 # Avoid division by zero
            
        green_pct = (green_px / total_leaf_px) * 100
        yellow_pct = (yellow_px / total_leaf_px) * 100
        brown_pct = (brown_px / total_leaf_px) * 100
        
        # Heuristic Logic
        disease_code = "HEALTHY_OR_UNKNOWN_PATHOGEN"
        confidence = 0.95
        
        reasons = {
            "en": f"Healthy foliage detected ({green_pct:.1f}% green tissue).",
            "hi": f"स्वस्थ पत्तियां पाई गईं ({green_pct:.1f}% हरा ऊतक)।",
            "mr": f"निरोगी पाने आढळली ({green_pct:.1f}% हिरवी उती)."
        }
        
        crop_upper = crop.upper()
        
        if brown_pct > 8.0:
            confidence = min(0.60 + (brown_pct / 50.0), 0.98)
            reasons = {
                "en": f"Detected {brown_pct:.1f}% necrotic brown spotting indicating blight/fungal decay.",
                "hi": f"{brown_pct:.1f}% भूरे धब्बे पाए गए जो झुलसा या फंगल संक्रमण का संकेत हैं।",
                "mr": f"{brown_pct:.1f}% तपकिरी डाग आढळले जे करपा किंवा बुरशीजन्य संसर्गाचे लक्षण आहेत."
            }
            if crop_upper == "TOMATO":
                disease_code = "TOMATO_EARLY_BLIGHT"
            elif crop_upper == "POTATO":
                disease_code = "POTATO_LATE_BLIGHT"
            elif crop_upper == "RICE":
                disease_code = "RICE_BACTERIAL_BLIGHT"
            else:
                disease_code = "TOMATO_EARLY_BLIGHT" # Fallback blight
                
        elif yellow_pct > 12.0:
            confidence = min(0.65 + (yellow_pct / 60.0), 0.96)
            reasons = {
                "en": f"Detected {yellow_pct:.1f}% yellowing/chlorosis indicative of rust.",
                "hi": f"{yellow_pct:.1f}% पीलापन पाया गया जो रतुआ रोग का संकेत है।",
                "mr": f"{yellow_pct:.1f}% पिवळेपणा आढळला जे तांबेरा रोगाचे लक्षण आहे."
            }
            if crop_upper == "WHEAT":
                disease_code = "WHEAT_YELLOW_RUST"
            elif crop_upper == "CORN":
                disease_code = "CORN_COMMON_RUST"
            else:
                disease_code = "WHEAT_YELLOW_RUST" # Fallback rust

        latency_ms = round((time.perf_counter() - t0) * 1000, 2)
        lang = language_pref if language_pref in ["en", "hi", "mr"] else "en"
        
        return {
            "diseaseCode": disease_code,
            "confidenceScore": confidence,
            "latencyMs": latency_ms,
            "detectionReason": reasons[lang]
        }

inference_engine = SmartHeuristicEngine()
