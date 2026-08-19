import React, { useRef, useState } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CameraViewfinder({ onCapture, isLoading }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onCapture(file);
    }
  };

  return (
    <div className="px-6 py-4 flex-1 flex flex-col justify-center">
      <div className="relative w-full aspect-[4/5] bg-white rounded-4xl border border-slate-100 shadow-xl overflow-hidden flex flex-col items-center justify-center p-4">
        {preview ? (
          <img src={preview} alt="Leaf Preview" className="w-full h-full object-cover rounded-3xl" />
        ) : (
          <div className="text-center p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
              <Camera className="w-10 h-10" />
            </div>
            <p className="text-base font-bold text-slate-800">Scan Leaf Specimen</p>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              Position leaf within natural lighting. Avoid heavy camera shake.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
            <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="font-semibold text-sm">Evaluating Quality & Neural Inference...</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Floating Action Controls */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-3xl shadow-lg shadow-emerald-200 transition"
        >
          <Camera className="w-5 h-5" />
          <span>Capture</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-4 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-bold rounded-3xl shadow-sm border border-slate-100 transition"
        >
          <Upload className="w-5 h-5 text-slate-500" />
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
}
