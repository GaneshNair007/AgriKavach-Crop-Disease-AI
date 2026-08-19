from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class QualityGateResult(BaseModel):
    sharpnessScore: float
    isPassed: bool
    hasFoliageMask: bool
    lightingCondition: str = "NATURAL_SUNLIGHT"
    warningCode: Optional[str] = None
    recommendation: Optional[str] = None

class DiagnosticResponseData(BaseModel):
    diseaseName: str
    confidence: float
    sharpness: float
    severity: str
    detectionReason: str
    treatment: Dict[str, str]

class DiagnosticResponse(BaseModel):
    status: str = "success"
    data: DiagnosticResponseData

class AgronomistFeedbackRequest(BaseModel):
    diagnosisId: str
    verifiedDiseaseCode: str
    agronomistLicense: str
    fieldNotes: str
    latitude: float
    longitude: float

class ModelInfoData(BaseModel):
    activeModelVersion: str
    quantization: str
    checkpointSizeBytes: int
    benchmarkAccuracyClean: float
    benchmarkAccuracyFieldAugmented: float
    averageCpuLatencyMs: float
    supportedCrops: List[str]

class ModelInfoResponse(BaseModel):
    status: str = "success"
    data: ModelInfoData
