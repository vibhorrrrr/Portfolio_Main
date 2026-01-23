
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Scan, ShieldCheck, Bone } from 'lucide-react';

const MedicalVisual: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'InceptionV3' | 'ResNet50'>('ResNet50');
  const [isScanning, setIsScanning] = useState(true);

  // Restart scan animation when model changes
  useEffect(() => {
    setIsScanning(false);
    setTimeout(() => setIsScanning(true), 100);
  }, [activeModel]);

  return (
    <div className="w-full h-full bg-black flex flex-col md:flex-row font-mono text-sm border border-neutral-800">
      
      {/* Left: Scan Viewport - Keeping dark theme for the "X-Ray" effect regardless of app theme */}
      <div className="flex-1 relative overflow-hidden bg-neutral-900 group">
         {/* Simulated Medical Image (Noise + Gradients) */}
         <div className="absolute inset-0 opacity-40 mix-blend-screen">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-600 via-neutral-900 to-black"></div>
            {/* Simulated teeth/bone structure */}
            <div className="absolute top-1/2 left-1/4 w-8 h-32 bg-white/5 blur-sm rounded-lg rotate-12"></div>
            <div className="absolute top-1/2 left-1/2 w-8 h-32 bg-white/5 blur-sm rounded-lg"></div>
            <div className="absolute top-1/2 left-3/4 w-8 h-32 bg-white/5 blur-sm rounded-lg -rotate-12"></div>
         </div>

         {/* Scan Line */}
         {isScanning && (
             <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-neural shadow-[0_0_20px_rgba(0,240,255,0.5)] z-20"
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
         )}

         {/* Heatmap Overlay (CAM) - Alveolar Bone Loss Area */}
         <div className={`absolute inset-0 transition-opacity duration-1000 ${activeModel === 'InceptionV3' ? 'opacity-30' : 'opacity-70'}`}>
            <div className="absolute top-[60%] left-[45%] w-24 h-24 bg-red-500/30 blur-xl rounded-full mix-blend-overlay"></div>
         </div>

         {/* Grid Overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

         <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
            <Scan className="text-neural animate-pulse" size={16} />
            <span className="text-xs text-neural font-bold tracking-widest">ORTHO SCAN [Vibhor J.]</span>
         </div>
      </div>

      {/* Right: Diagnostics Panel - Adaptive Theme */}
      <div className="w-full md:w-64 bg-white dark:bg-neutral-950 border-l border-slate-200 dark:border-neutral-800 p-6 flex flex-col justify-between transition-colors duration-500">
          
          <div className="space-y-6">
            <div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase tracking-wider mb-2">Classifier Backbone</div>
                <div className="flex flex-col gap-2">
                    <button 
                        onClick={() => setActiveModel('InceptionV3')}
                        className={`text-xs p-2 border text-left transition-all ${activeModel === 'InceptionV3' ? 'border-blue-500 dark:border-neural text-blue-600 dark:text-neural bg-blue-50 dark:bg-neural/5' : 'border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-500 hover:border-slate-300 dark:hover:border-neutral-700'}`}
                    >
                        InceptionV3
                    </button>
                    <button 
                        onClick={() => setActiveModel('ResNet50')}
                        className={`text-xs p-2 border text-left transition-all ${activeModel === 'ResNet50' ? 'border-blue-500 dark:border-neural text-blue-600 dark:text-neural bg-blue-50 dark:bg-neural/5' : 'border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-500 hover:border-slate-300 dark:hover:border-neutral-700'}`}
                    >
                        ResNet50 (Fine-Tuned)
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-neutral-400">
                    <span>Bone Loss Prob.</span>
                    <span className="text-slate-900 dark:text-white font-bold">{activeModel === 'InceptionV3' ? '82.2%' : '94.8%'}</span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-neutral-800 overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-600 dark:bg-neural"
                        initial={{ width: 0 }}
                        animate={{ width: activeModel === 'InceptionV3' ? '82.2%' : '94.8%' }}
                        transition={{ duration: 1 }}
                    />
                </div>

                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-neutral-400">
                    <span>False Positive Rate</span>
                    <span className={activeModel === 'InceptionV3' ? 'text-amber-600 dark:text-amber-500' : 'text-green-600 dark:text-green-500'}>
                        {activeModel === 'InceptionV3' ? 'Moderate' : 'Low'}
                    </span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-neutral-800 overflow-hidden">
                    <motion.div 
                        className={`h-full ${activeModel === 'InceptionV3' ? 'bg-amber-500' : 'bg-green-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: activeModel === 'InceptionV3' ? '40%' : '12%' }}
                        transition={{ duration: 1 }}
                    />
                </div>
            </div>
          </div>

          <div className={`mt-6 p-3 border rounded ${activeModel === 'InceptionV3' ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10' : 'border-blue-200 dark:border-neural/30 bg-blue-50 dark:bg-neural/5'}`}>
               <div className="flex items-start gap-2">
                    {activeModel === 'InceptionV3' ? (
                        <AlertTriangle size={14} className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                        <Bone size={14} className="text-blue-600 dark:text-neural shrink-0 mt-0.5" />
                    )}
                    <div>
                        <div className={`text-[10px] font-bold uppercase mb-1 ${activeModel === 'InceptionV3' ? 'text-amber-600 dark:text-amber-500' : 'text-blue-600 dark:text-neural'}`}>
                            {activeModel === 'InceptionV3' ? 'Inconclusive' : 'Detected: Stage II'}
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-neutral-400 leading-tight">
                            {activeModel === 'InceptionV3' 
                                ? 'Boundary noise detected in mandibular region. Switching recommended.' 
                                : 'ResNet50 confirms alveolar crest height reduction > 2mm.'}
                        </p>
                    </div>
               </div>
          </div>

      </div>
    </div>
  );
};

export default MedicalVisual;
