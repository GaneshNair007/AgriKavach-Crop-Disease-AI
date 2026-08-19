import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, WifiOff, Cpu, Globe2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DICT } from './TranslationDict';
import CameraScanner from './components/CameraScanner';
import DiagnosticDrawer from './components/DiagnosticDrawer';
import TelemetryModal from './components/TelemetryModal';

const API_URL = 'http://localhost:8000/api/v1/crop';

// Inject Google Fonts for the premium serif look
const loadFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const FloatingLeaf = ({ color, size, left, duration, delay }) => (
  <motion.svg 
    className="fixed pointer-events-none z-0 opacity-20"
    style={{ left: `${left}%`, top: '100vh', width: size }}
    viewBox="0 0 24 24"
    animate={{ 
      y: ['0vh', '-120vh'], 
      x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
      rotate: [0, 180, 360] 
    }}
    transition={{ 
      duration: duration, 
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <path d="M12 2C6 6 4 12 8 18c2 3 6 4 8 3-1-6-2-13-4-19Z" fill={color}/>
  </motion.svg>
);

const AnimatedLogo = () => (
  <svg viewBox="0 0 44 44" className="w-12 h-12 shrink-0 drop-shadow-sm">
    <path d="M22 4C10 10 6 22 14 36c4 6 12 8 16 6-2-14-4-28-8-38Z" fill="#DCEFE1" stroke="#3E9868" strokeWidth="2"/>
    <motion.path d="M22 8C18 18 18 30 20 40" fill="none" stroke="#153524" strokeWidth="1.5" strokeLinecap="round" 
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} />
    <motion.path d="M20 16C16 18 13 21 11 25" fill="none" stroke="#153524" strokeWidth="1.5" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }} />
    <motion.path d="M21 26C17 27 14 30 12 33" fill="none" stroke="#153524" strokeWidth="1.5" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6, ease: "easeOut" }} />
  </svg>
);

export default function App() {
  const [lang, setLang] = useState('en');
  const [crop, setCrop] = useState('TOMATO');
  const [isLoading, setIsLoading] = useState(false);
  const [diag, setDiag] = useState(null);
  const [toast, setToast] = useState(null);
  const [showTelemetry, setShowTelemetry] = useState(false);

  useEffect(() => { loadFonts(); }, []);

  const d = DICT[lang];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5000);
  };

  const handleCapture = async (file) => {
    setIsLoading(true);
    const fd = new FormData();
    fd.append('image_file', file);
    fd.append('crop_species', crop);
    fd.append('language_pref', lang);

    try {
      const res = await fetch(`${API_URL}/diagnose`, { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        showToast(json.detail?.recommendation || json.detail?.error || d.errNet);
      } else {
        setDiag(json.data);
      }
    } catch (err) {
      showToast(d.errNet);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-[#EEF4EC] shadow-2xl overflow-hidden font-sans">
      
      {/* Ambient Floating Leaves */}
      <FloatingLeaf color="#6FCB93" size="24px" left={10} duration={14} delay={0} />
      <FloatingLeaf color="#AE6A44" size="18px" left={85} duration={11} delay={3} />
      <FloatingLeaf color="#3E9868" size="20px" left={40} duration={17} delay={6} />
      <FloatingLeaf color="#E0AE3E" size="16px" left={65} duration={13} delay={9} />

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-50 bg-rose-600 text-white px-5 py-4 rounded-3xl shadow-xl shadow-rose-600/30 text-xs font-bold flex justify-between items-center backdrop-blur-md"
          >
            <span>{toast}</span>
            <button onClick={() => setToast(null)} className="ml-4 p-1 rounded-full bg-rose-700/50 hover:bg-rose-700 active:scale-90 transition-all duration-200">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Viewing Area */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-10 pb-6 shrink-0 bg-white/95 backdrop-blur-xl shadow-xl shadow-emerald-900/5 rounded-b-[2.5rem] relative z-10 border-b border-emerald-50"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 bg-[#DCEFE1] text-[#153524] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#6FCB93] rounded-full animate-pulse shadow-[0_0_8px_#6FCB93]"></div>
            {d.edgeActive}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowTelemetry(true)} className="p-2 bg-[#EEF4EC] hover:bg-[#DCEFE1] rounded-full shadow-sm border border-emerald-100 active:scale-90 transition-all duration-200">
              <Activity className="w-4 h-4 text-emerald-800" />
            </button>
            <div className="flex bg-[#EEF4EC] rounded-full p-1 shadow-inner border border-emerald-50">
              {['en', 'hi', 'mr'].map(l => (
                <button 
                  key={l} 
                  onClick={() => setLang(l)} 
                  className={`px-3 py-1 text-[10px] font-black rounded-full uppercase transition-all duration-200 ${
                    lang === l ? 'bg-[#153524] text-white shadow-md transform scale-105' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 mb-2 flex items-center gap-3">
          <AnimatedLogo />
          <div>
            <motion.h1 
              key={lang}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              className="text-[2.2rem] text-[#153524] tracking-tight leading-none drop-shadow-sm"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 800 }}
            >
              {d.appName}
            </motion.h1>
            <motion.p 
              key={lang + 'sub'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[#4B5D54] font-bold mt-1.5 tracking-wide"
            >
              {d.subTitle}
            </motion.p>
          </div>
        </div>
      </motion.header>

      {/* Bottom Interaction Area */}
      <div className="flex-1 flex flex-col pt-6 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 overflow-x-auto no-scrollbar px-6 py-2 shrink-0 scroll-smooth"
        >
          {Object.keys(d.crops).map(c => (
            <button 
              key={c} 
              onClick={() => setCrop(c)} 
              className={`px-5 py-3 rounded-[1.25rem] font-black text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                crop === c 
                  ? 'bg-[#153524] text-white shadow-lg shadow-[#153524]/30 scale-105 border-transparent' 
                  : 'bg-white/90 backdrop-blur-sm text-slate-500 border border-emerald-100 hover:bg-emerald-50 shadow-sm'
              }`}
            >
              {d.crops[c]}
            </button>
          ))}
        </motion.div>

        <CameraScanner d={d} onCapture={handleCapture} isLoading={isLoading} />

        {/* Trust Strip */}
        <div className="mt-2 mb-6 pt-4 border-t border-emerald-200/50 mx-6 flex justify-between gap-2">
          <div className="flex flex-col items-center text-center gap-1.5 flex-1">
            <WifiOff className="w-4 h-4 text-[#3E9868]" />
            <span className="text-[9px] text-[#4B5D54] font-black uppercase tracking-wider">Works Offline</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 flex-1">
            <Cpu className="w-4 h-4 text-[#3E9868]" />
            <span className="text-[9px] text-[#4B5D54] font-black uppercase tracking-wider">On-Device AI</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 flex-1">
            <Globe2 className="w-4 h-4 text-[#3E9868]" />
            <span className="text-[9px] text-[#4B5D54] font-black uppercase tracking-wider">3 Languages</span>
          </div>
        </div>
      </div>

      <DiagnosticDrawer diag={diag} d={d} lang={lang} onClose={() => setDiag(null)} />
      
      {showTelemetry && <TelemetryModal d={d} onClose={() => setShowTelemetry(false)} API_URL={API_URL} />}
    </div>
  );
}
