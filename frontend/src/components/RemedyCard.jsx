import React, { useState } from 'react';
import { Sprout, FlaskConical, ShieldAlert } from 'lucide-react';

export default function RemedyCard({ remedy, language }) {
  const [activeTab, setActiveTab] = useState('organic');

  return (
    <div className="bg-slate-50 rounded-3xl p-4 mt-4 border border-slate-100">
      {/* Samsung One UI Pill Switcher */}
      <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('organic')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'organic' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Sprout className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'जैविक' : 'Organic'}</span>
        </button>
        <button
          onClick={() => setActiveTab('chemical')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'chemical' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'रासायनिक' : 'Chemical'}</span>
        </button>
        <button
          onClick={() => setActiveTab('cultural')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'cultural' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'रोकथाम' : 'Prevent'}</span>
        </button>
      </div>

      <div className="mt-4 px-2">
        {activeTab === 'organic' && (
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {remedy.immediateOrganicAction}
          </p>
        )}
        {activeTab === 'chemical' && (
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {remedy.chemicalTreatment}
          </p>
        )}
        {activeTab === 'cultural' && (
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {remedy.culturalPractices}
          </p>
        )}
      </div>
    </div>
  );
}
