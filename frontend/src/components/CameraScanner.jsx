import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, X, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CameraScanner({ d, onCapture, isLoading }) {
  const [isCamOpen, setIsCamOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    setIsCamOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setIsCamOpen(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCamOpen(false);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      stopCamera();
      onCapture(file);
    }, 'image/jpeg');
  };

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      onCapture(e.target.files[0]);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex-1 flex flex-col justify-center mt-4 px-6 relative"
    >
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-emerald-50/50 to-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col items-center justify-center p-2 border border-white">
        
        {/* Dashed inner border for empty state */}
        {!isCamOpen && <div className="absolute inset-2 border-2 border-dashed border-emerald-200/70 rounded-[2.25rem] pointer-events-none"></div>}

        <AnimatePresence>
          {isCamOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-black"
            >
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted autoPlay></video>
              
              {/* Leaf Silhouette Guidance Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <svg width="200" height="280" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" strokeDasharray="4 4" className="drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                   <path d="M12 2C7 2 2 7 2 12c0 5 10 10 10 10s10-5 10-10c0-5-5-10-10-10z" />
                   <path d="M12 2v20" />
                </svg>
                <div className="absolute top-8 bg-black/50 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20">
                  Align Leaf Here
                </div>
              </div>

              {/* Scanning Laser Overlay */}
              <div className="absolute inset-6 border-2 border-dashed border-white/40 rounded-3xl pointer-events-none shadow-inner z-10"></div>
              <motion.div 
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-8 right-8 h-[2px] bg-emerald-400 shadow-[0_0_25px_#34d399] pointer-events-none rounded-full z-20"
              />
              
              <button onClick={stopCamera} className="absolute top-6 right-6 p-3 bg-black/40 text-white rounded-full backdrop-blur-md active:scale-90 transition-transform hover:bg-black/60 z-30 border border-white/20">
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isCamOpen && (
          <div className="text-center p-6 flex flex-col items-center z-0">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse border border-emerald-50">
              <Camera className="w-10 h-10" />
            </div>
            <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed font-bold">{d.camInstructions}</p>
          </div>
        )}

        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white z-40"
            >
              <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_30px_#10B981]"></div>
              <p className="text-xs font-black tracking-widest uppercase animate-pulse">{d.evaluating}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 shrink-0 mb-6 relative z-10">
        {isCamOpen ? (
          <button 
            onClick={handleCapture} 
            disabled={isLoading} 
            className="col-span-2 flex justify-center items-center gap-3 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-[15px] rounded-[1.75rem] shadow-lg shadow-emerald-500/30 active:scale-95 transition-all duration-200 border border-emerald-400/50"
          >
            <ScanLine className="w-5 h-5" /> {d.capture}
          </button>
        ) : (
          <>
            <button 
              onClick={startCamera} 
              disabled={isLoading} 
              className="flex justify-center items-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm rounded-[1.75rem] shadow-lg shadow-emerald-500/30 active:scale-95 transition-all duration-200 border border-emerald-400/50"
            >
              <Camera className="w-5 h-5" /> {d.startCam}
            </button>
            <button 
              onClick={() => fileRef.current?.click()} 
              disabled={isLoading} 
              className="flex justify-center items-center gap-2 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 font-bold text-sm rounded-[1.75rem] shadow-sm hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-200"
            >
              <Upload className="w-5 h-5 text-slate-400" /> {d.upload}
            </button>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      </div>
    </motion.div>
  );
}
