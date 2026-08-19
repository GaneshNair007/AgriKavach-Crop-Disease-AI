# AgriKavach - Crop Disease AI

**SIH Problem Statement PS4 (Field-Robust Crop Disease Detection)**

AgriKavach is a standalone, two-file Edge AI crop diagnostics system. It features a high-performance Python FastAPI backend with an OpenCV quality gatekeeper, and an INT8-quantized MobileNetV3 inference engine. The frontend is a standalone React.js client built with Tailwind CSS, strictly adhering to the Samsung One UI design aesthetic (mobile-first, squircle continuous curvature, bottom-reachable controls).

## Architecture
- **backend.py**: Contains the FastAPI server, OpenCV pre-flight gatekeeper, PyTorch quantized model logic, and the embedded seed database for crop treatments.
- **frontend.html**: A complete, zero-build React application utilizing Babel and Tailwind CSS via CDN.

## Quick Start

1. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn pydantic python-multipart opencv-python-headless numpy torch torchvision pillow
   ```

2. Start the Edge AI backend:
   ```bash
   python backend.py
   ```

3. Launch the UI:
   Open `frontend.html` directly in any modern web browser.
