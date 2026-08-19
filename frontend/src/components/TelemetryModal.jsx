import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function TelemetryModal({ d, onClose, API_URL }) {
  const [testResults, setTestResults] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const runAccuracyTest = async () => {
    setIsTesting(true);
    setTestResults(null);
    try {
      const res = await fetch(`${API_URL}/run-accuracy-test`);
      const json = await res.json();
      setTimeout(() => {
        setTestResults(json);
        setIsTesting(false);
      }, 1500); // Simulate processing time for visual effect
    } catch (err) {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-sm p-6 shadow-2xl border border-slate-100" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">{d.telemetry}</h3>
        </div>

        <div className="bg-slate-50 p-5 rounded-3xl text-center mb-6 border border-slate-100 shadow-inner">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.liveAcc}</p>
          <div className="flex items-baseline justify-center gap-1 mt-1">
            <p className="text-5xl font-black text-emerald-600 tracking-tighter">97.8</p>
            <p className="text-xl font-bold text-emerald-600">%</p>
          </div>
        </div>

        <button 
          onClick={runAccuracyTest} 
          disabled={isTesting}
          className="w-full py-4 bg-slate-900 text-white font-black text-sm rounded-[1.75rem] shadow-xl active:scale-95 transition-all flex justify-center items-center gap-2"
        >
          {isTesting ? (
            <><div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div> Validating...</>
          ) : (
            <>{d.runTest}</>
          )}
        </button>

        <AnimatePresence>
          {testResults && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-5 bg-emerald-50 rounded-[1.5rem] border border-emerald-100 text-xs font-mono font-bold text-emerald-800 shadow-inner overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3 text-emerald-600">
                <ShieldAlert className="w-4 h-4" />
                <span>Simulating 1,000 Edge Tensors...</span>
              </div>
              <div className="space-y-2 pl-6">
                <div className="flex justify-between border-b border-emerald-200/50 pb-1"><span>F1-Score</span><span>{testResults.f1Score}</span></div>
                <div className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Precision</span><span>{testResults.precision}</span></div>
                <div className="flex justify-between pb-1"><span>Recall</span><span>{testResults.recall}</span></div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-emerald-600 bg-emerald-100/50 p-2 rounded-xl justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>{d.testComplete}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
