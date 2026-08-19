import React from 'react';
import { Activity, Globe, ShieldCheck } from 'lucide-react';

export default function TopHeader({ language, setLanguage, onOpenTelemetry }) {
  return (
    <header className="px-6 pt-8 pb-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Edge Engine Active</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTelemetry}
            className="p-2 bg-white rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 transition"
            title="Model Telemetry"
          >
            <Activity className="w-4 h-4 text-blue-600" />
          </button>

          <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-slate-100">
            <Globe className="w-3.5 h-3.5 ml-2 text-slate-400" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-full transition ${
                language === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-full transition ${
                language === 'hi' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">AgriKavach</h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">Field-Robust Crop Pathology AI</p>
      </div>
    </header>
  );
}
