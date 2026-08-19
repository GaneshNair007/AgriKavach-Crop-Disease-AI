import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, FlaskConical, ShieldAlert, Microscope, Volume2, VolumeX, CheckCircle } from 'lucide-react';

export default function DiagnosticDrawer({ diag, d, lang, onClose }) {
  const [activeTab, setActiveTab] = useState('organic');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tasksDone, setTasksDone] = useState({});

  useEffect(() => {
    if (diag) {
      setActiveTab('organic');
      setTasksDone({});
    }
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [diag]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = `${diag.diseaseName}. ${diag.detectionReason}. ${d.tabs[activeTab]}: ${diag.treatment[activeTab]}`;
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-US';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const toggleTask = (tab) => {
    setTasksDone(prev => ({ ...prev, [tab]: !prev[tab] }));
  };

  return (
    <AnimatePresence>
      {diag && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 max-w-md mx-auto bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-50 flex flex-col max-h-[90vh]"
          >
            <div className="p-6 overflow-y-auto no-scrollbar pb-8">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 shrink-0"></div>
              
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm ${diag.severity.includes('CRITICAL') ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                    {diag.severity} {d.priority}
                  </span>
                  <h2 className="text-[2rem] font-black text-slate-900 mt-4 leading-tight tracking-tight drop-shadow-sm">
                    {diag.diseaseName}
                  </h2>
                </div>
                <button 
                  onClick={toggleSpeech}
                  className={`p-3 rounded-full transition-all duration-200 shadow-sm border ${isSpeaking ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/40 animate-pulse' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                >
                  {isSpeaking ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </button>
              </div>

              <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-100/60 flex items-start gap-3 shadow-inner">
                <Microscope className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-sm font-bold text-emerald-800 leading-relaxed">
                  {diag.detectionReason}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
                  <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{d.confidence}</p>
                  <p className="text-3xl font-black text-slate-800 mt-1">{diag.confidence}%</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
                  <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{d.sharpness}</p>
                  <p className="text-3xl font-black text-emerald-600 mt-1">{diag.sharpness}</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex bg-slate-100/80 p-1.5 rounded-[1.25rem] shadow-inner border border-slate-200/50">
                  {['organic', 'chemical', 'prevention'].map(t => {
                    const icons = {
                      organic: <Sprout className="w-4 h-4" />,
                      chemical: <FlaskConical className="w-4 h-4" />,
                      prevention: <ShieldAlert className="w-4 h-4" />
                    };
                    return (
                      <button 
                        key={t} 
                        onClick={() => { setActiveTab(t); if(isSpeaking) window.speechSynthesis.cancel(); setIsSpeaking(false); }} 
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl transition-all duration-200 ${
                          activeTab === t ? 'bg-white text-slate-900 shadow-md transform scale-[1.02]' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {icons[t]} <span className="hidden sm:inline">{d.tabs[t]}</span>
                      </button>
                    );
                  })}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 min-h-[130px] flex flex-col justify-between shadow-sm"
                  >
                    <p className="text-[15px] text-slate-700 font-bold leading-relaxed">
                      {diag.treatment[activeTab]}
                    </p>
                    <button 
                      onClick={() => toggleTask(activeTab)}
                      className={`mt-4 self-start flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all ${tasksDone[activeTab] ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                    >
                      <CheckCircle className={`w-4 h-4 ${tasksDone[activeTab] ? 'text-emerald-600' : 'text-slate-400'}`} />
                      {tasksDone[activeTab] ? 'Task Completed' : 'Mark as Done'}
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button 
                onClick={onClose} 
                className="w-full mt-8 py-4 bg-slate-900 text-white rounded-[1.75rem] font-black text-sm shadow-xl shadow-slate-900/20 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
              >
                {d.close}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
