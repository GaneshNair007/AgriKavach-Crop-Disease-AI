from models.database import DISEASE_REMEDY_MASTER

class RemedyService:
    @staticmethod
    def get_remedy(disease_code: str, language_pref: str = "en") -> dict:
        lang = language_pref if language_pref in ["en", "hi", "mr"] else "en"
        data = DISEASE_REMEDY_MASTER.get(disease_code, DISEASE_REMEDY_MASTER["HEALTHY_OR_UNKNOWN_PATHOGEN"])
        
        return {
            "diseaseName": data["regionalNames"].get(lang, data["regionalNames"]["en"]),
            "severity": data.get("severityWarning", "LOW"),
            "treatment": data["treatmentProtocol"].get(lang, data["treatmentProtocol"]["en"])
        }
