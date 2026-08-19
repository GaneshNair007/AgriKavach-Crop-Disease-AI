from typing import Dict, Any, Optional

DISEASE_REMEDY_MASTER: Dict[str, Dict[str, Any]] = {
    "TOMATO_EARLY_BLIGHT": {
        "diseaseCode": "TOMATO_EARLY_BLIGHT",
        "severityWarning": "MODERATE",
        "regionalNames": {
            "en": "Early Blight (Alternaria solani)",
            "hi": "अगेती झुलसा (Early Blight)",
            "mr": "लवकर येणारा करपा (Early Blight)"
        },
        "treatmentProtocol": {
            "en": {
                "organic": "Spray 5% Neem seed kernel extract (NSKE) or Copper Oxychloride 50% WP @ 2.5g/L water.",
                "chemical": "Apply Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L at 7-day intervals.",
                "prevention": "Prune infected bottom leaves immediately; avoid overhead sprinkler irrigation."
            },
            "hi": {
                "organic": "5% नीम के बीज का अर्क (NSKE) या कॉपर ऑक्सीक्लोराइड 50% WP @ 2.5 ग्राम/लीटर पानी में छिड़कें।",
                "chemical": "मैंकोजेब 75% WP @ 2 ग्राम/लीटर या एजोक्सीस्ट्रोबिन 23% SC @ 1 मिली/लीटर 7 दिनों के अंतराल पर डालें।",
                "prevention": "संक्रमित निचली पत्तियों को तुरंत छांटें; फव्वारा सिंचाई से बचें।"
            },
            "mr": {
                "organic": "५% कडुनिंब बियांचा अर्क (NSKE) किंवा कॉपर ऑक्सिक्लोराईड ५०% WP @ २.५ ग्रॅम/लिटर फवारा.",
                "chemical": "मॅन्कोझेब ७५% WP @ २ ग्रॅम/लिटर किंवा अझोक्सीस्ट्रोबिन २३% SC @ १ मिली/लिटर वापरा.",
                "prevention": "खालची रोगग्रस्त पाने त्वरित काढा; तुषार सिंचन टाळा."
            }
        }
    },
    "POTATO_LATE_BLIGHT": {
        "diseaseCode": "POTATO_LATE_BLIGHT",
        "severityWarning": "CRITICAL_QUARANTINE",
        "regionalNames": {
            "en": "Late Blight (Phytophthora infestans)",
            "hi": "पछेती झुलसा (Late Blight)",
            "mr": "उशिरा येणारा करपा (Late Blight)"
        },
        "treatmentProtocol": {
            "en": {
                "organic": "Spray Bordeaux mixture (1%) immediately upon initial symptom onset.",
                "chemical": "Apply Cymoxanil 8% + Mancozeb 64% WP @ 1.5g/L water.",
                "prevention": "Use certified disease-free seed tubers; destroy infected crop residue immediately."
            },
            "hi": {
                "organic": "शुरुआती लक्षण दिखते ही तुरंत बोर्डो मिश्रण (1%) का छिड़काव करें।",
                "chemical": "साइमोक्सानिल 8% + मैंकोजेब 64% WP @ 1.5 ग्राम/लीटर पानी का प्रयोग करें।",
                "prevention": "प्रमाणित रोग-मुक्त बीज कंदों का उपयोग करें; संक्रमित फसल अवशेषों को तुरंत नष्ट करें।"
            },
            "mr": {
                "organic": "लक्षणे दिसताच त्वरित १% बोर्डो मिश्रणाची फवारणी करा.",
                "chemical": "सिमोक्सॅनिल ८% + मॅन्कोझेब ६४% WP @ १.५ ग्रॅम/लिटर पाणी वापरा.",
                "prevention": "रोगमुक्त बियाणे वापरा; रोगग्रस्त पिकाचे अवशेष त्वरित नष्ट करा."
            }
        }
    },
    "CORN_COMMON_RUST": {
        "diseaseCode": "CORN_COMMON_RUST",
        "severityWarning": "LOW",
        "regionalNames": {
            "en": "Common Rust (Puccinia sorghi)",
            "hi": "मक्का का रतुआ रोग (Corn Rust)",
            "mr": "तांबेरा (Common Rust)"
        },
        "treatmentProtocol": {
            "en": {
                "organic": "Dust with wettable Sulfur 80% WP @ 3g/L or Neem oil (3000 ppm) @ 3ml/L.",
                "chemical": "Apply Propiconazole 25% EC @ 1ml/L or Mancozeb 75% WP @ 2g/L water.",
                "prevention": "Plant rust-resistant hybrid cultivars and maintain spacing to reduce humidity."
            },
            "hi": {
                "organic": "घुलनशील गंधक 80% WP @ 3 ग्राम/लीटर या नीम का तेल @ 3 मिली/लीटर छिड़कें।",
                "chemical": "प्रोपिकोनाज़ोल 25% EC @ 1 मिली/लीटर या मैंकोजेब 75% WP @ 2 ग्राम/लीटर डालें।",
                "prevention": "रोग-प्रतिरोधी संकर किस्मों को लगाएं और पौधों के बीच उचित दूरी रखें।"
            },
            "mr": {
                "organic": "पाण्यात मिसळणारे गंधक ८०% WP @ ३ ग्रॅम/लिटर किंवा निंबोळी तेल @ ३ मिली/लिटर फवारा.",
                "chemical": "प्रोपिकोनाझोल २५% EC @ १ मिली/लिटर किंवा मॅन्कोझेब ७५% WP @ २ ग्रॅम/लिटर वापरा.",
                "prevention": "रोगप्रतिकारक वाण लावा आणि आर्द्रता कमी करण्यासाठी योग्य अंतर ठेवा."
            }
        }
    },
    "WHEAT_YELLOW_RUST": {
        "diseaseCode": "WHEAT_YELLOW_RUST",
        "severityWarning": "CRITICAL_QUARANTINE",
        "regionalNames": {
            "en": "Yellow Rust (Puccinia striiformis)",
            "hi": "पीला रतुआ (Yellow Rust)",
            "mr": "पिवळा तांबेरा (Yellow Rust)"
        },
        "treatmentProtocol": {
            "en": {
                "organic": "Spray fermented buttermilk/curd extract (5%) as a bio-barrier.",
                "chemical": "Apply Tebuconazole 25.9% EC @ 1ml/L water immediately upon stripe detection.",
                "prevention": "Eradicate barberry bushes near field boundaries; follow sowing schedules."
            },
            "hi": {
                "organic": "जैविक अवरोध के रूप में खट्टी छाछ/दही का अर्क (5%) छिड़कें।",
                "chemical": "पीली धारियां दिखते ही तुरंत टेबुकोनाज़ोल 25.9% EC @ 1 मिली/लीटर का छिड़काव करें।",
                "prevention": "खेत की सीमाओं के पास की झाड़ियों को नष्ट करें; अनुशंसित बुवाई समय का पालन करें।"
            },
            "mr": {
                "organic": "आंबट ताक/दह्याचा अर्क (५%) जैविक अडथळा म्हणून फवारा.",
                "chemical": "पिवळे पट्टे दिसताच टेब्युकोनाझोल २५.९% EC @ १ मिली/लिटर फवारा.",
                "prevention": "शेताजवळील रानटी झाडे नष्ट करा; पेरणीच्या योग्य वेळेचे पालन करा."
            }
        }
    },
    "RICE_BACTERIAL_BLIGHT": {
        "diseaseCode": "RICE_BACTERIAL_BLIGHT",
        "severityWarning": "MODERATE",
        "regionalNames": {
            "en": "Bacterial Leaf Blight",
            "hi": "जीवाणु झुलसा (Bacterial Blight)",
            "mr": "जिवाणू करपा (Bacterial Blight)"
        },
        "treatmentProtocol": {
            "en": {
                "organic": "Spray fresh cow dung filtrate (20%) + Neem oil (3%) mixture.",
                "chemical": "Apply Streptocycline (90%) + Copper Oxychloride @ 25g per 10L water.",
                "prevention": "Drain stagnant water from fields; avoid clipping seedling tips."
            },
            "hi": {
                "organic": "ताजा गोबर का रस (20%) + नीम का तेल (3%) का घोल बनाकर छिड़कें।",
                "chemical": "स्ट्रेप्टोसाइक्लिन (90%) + कॉपर ऑक्सीक्लोराइड @ 25 ग्राम प्रति 10 लीटर छिड़कें।",
                "prevention": "खेतों से अतिरिक्त पानी निकालें; पौध के सिरों को न काटें।"
            },
            "mr": {
                "organic": "ताजे शेणखत अर्क (२०%) + निंबोळी तेल (३%) फवारा.",
                "chemical": "स्ट्रेप्टोसायक्लिन (९०%) + कॉपर ऑक्सिक्लोराईड @ २५ ग्रॅम/१० लिटर पाणी वापरा.",
                "prevention": "शेतातील साचलेले पाणी काढून टाका; रोपांची शेंडे कापू नका."
            }
        }
    },
    "HEALTHY_OR_UNKNOWN_PATHOGEN": {
        "diseaseCode": "HEALTHY_OR_UNKNOWN_PATHOGEN",
        "severityWarning": "LOW",
        "regionalNames": {
            "en": "Healthy Crop / Unknown",
            "hi": "स्वस्थ फसल / अज्ञात",
            "mr": "निरोगी पीक / अज्ञात"
        },
        "treatmentProtocol": {
            "en": {
                "organic": "No pathogen detected. Continue standard organic maintenance.",
                "chemical": "No chemical application required.",
                "prevention": "Maintain clean field sanitation and scheduled irrigation."
            },
            "hi": {
                "organic": "कोई रोग नहीं मिला। सामान्य जैविक देखभाल जारी रखें।",
                "chemical": "किसी रासायनिक दवा की आवश्यकता नहीं है।",
                "prevention": "खेत को साफ रखें और नियमित सिंचाई जारी रखें।"
            },
            "mr": {
                "organic": "कोणताही रोग आढळला नाही. नेहमीची सेंद्रिय काळजी घ्या.",
                "chemical": "कोणत्याही रासायनिक फवारणीची गरज नाही.",
                "prevention": "शेत स्वच्छ ठेवा आणि वेळेवर पाणी द्या."
            }
        }
    }
}

FEEDBACK_LOGS = []
