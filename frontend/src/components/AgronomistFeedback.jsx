import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { submitFeedback } from '../services/api';

export default function AgronomistFeedback({ isOpen, onClose, diagnosisId }) {
  const [license, setLicense] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback({
      diagnosisId: diagnosisId || 'diag_manual',
      verifiedDiseaseCode: 'TOMATO_EARLY_BLIGHT',
      agronomistLicense: license || 'AGRI_EXP_001',
      fieldNotes: notes || 'Verified in field.',
      latitude: 18.5204,
      longitude: 73.8567,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-6">
      <motion.div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900 text-sm">Agronomist Verification</h3>
          <button onClick={onClose} className="p-1.5 rounded-full bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center text-emerald-600">
            <Check className="w-12 h-12 mx-auto mb-2" />
            <p className="font-bold text-sm">Feedback Recorded</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 font-semibold">License ID</label>
              <input
                type="text"
                required
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="e.g. AGRI_PUNE_402"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold">Field Symptoms Log</label>
              <textarea
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Concentric rings observed on bottom leaves..."
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs h-20"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow"
            >
              Submit Ground Truth
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
