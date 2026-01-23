
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Zap, AlignLeft, MessageSquare } from 'lucide-react';

const Seq2SeqVisual: React.FC = () => {
  const [model, setModel] = useState<'T5' | 'BART'>('T5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  const contextText = "Context: The Amazon rainforest, covering much of northwestern Brazil and extending into Colombia, Peru and other South American countries, is the world’s largest tropical rainforest.";
  const questionText = "Question: Where does the Amazon rainforest extend?";
  
  const outputs = {
    T5: "Colombia, Peru and other South American countries",
    BART: "It extends into Colombia, Peru and other South American countries."
  };

  const [displayOutput, setDisplayOutput] = useState(outputs[model]);

  useEffect(() => {
    setIsGenerating(true);
    setDisplayOutput("");
    
    // Simulate generation delay
    const timer = setTimeout(() => {
        setIsGenerating(false);
        setDisplayOutput(outputs[model]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [model]);

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col font-mono text-sm relative overflow-hidden transition-colors duration-500">
        {/* Model Selector Header */}
        <div className="flex border-b border-slate-200 dark:border-neutral-800">
            <button 
                onClick={() => setModel('T5')}
                className={`flex-1 p-3 text-xs flex items-center justify-center gap-2 transition-colors ${model === 'T5' ? 'bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-neutral-500 hover:text-slate-800 dark:hover:text-neutral-300'}`}
            >
                <Zap size={14} className={model === 'T5' ? 'text-yellow-600 dark:text-yellow-500' : ''} />
                T5 (Span Extraction)
            </button>
            <div className="w-[1px] bg-slate-200 dark:bg-neutral-800"></div>
            <button 
                onClick={() => setModel('BART')}
                className={`flex-1 p-3 text-xs flex items-center justify-center gap-2 transition-colors ${model === 'BART' ? 'bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-neutral-500 hover:text-slate-800 dark:hover:text-neutral-300'}`}
            >
                <AlignLeft size={14} className={model === 'BART' ? 'text-blue-600 dark:text-blue-500' : ''} />
                BART (Generative)
            </button>
        </div>

        {/* Visualization Area */}
        <div className="flex-1 p-6 flex flex-col justify-between relative">
            
            {/* Input Layer */}
            <div className="space-y-4 relative z-10">
                <div>
                    <div className="text-[10px] uppercase text-slate-500 dark:text-neutral-500 tracking-widest mb-1">SQuAD Dataset Sample</div>
                    <div className="text-xs text-slate-600 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/50 p-2 rounded border border-slate-200 dark:border-neutral-800 leading-relaxed">
                        {contextText}
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <MessageSquare size={12} className="text-blue-600 dark:text-neural" />
                    <span className="text-slate-800 dark:text-white text-xs italic">{questionText}</span>
                </div>
            </div>

            {/* Attention Lines (SVG Overlay) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full">
                    {!isGenerating && displayOutput.split(" ").map((_, i) => (
                        <line 
                            key={i}
                            x1={`${10 + (i * 10)}%`} 
                            y1="45%" 
                            x2={`${15 + (i * 12)}%`} 
                            y2="75%" 
                            stroke={model === 'T5' ? (isDark ? '#eab308' : '#ca8a04') : (isDark ? '#3b82f6' : '#2563eb')} 
                            strokeWidth="1" 
                            strokeDasharray="4 4"
                        />
                    ))}
                </svg>
            </div>

            {/* Output Layer */}
            <div className="space-y-2 relative z-10 mt-8">
                 <div className="flex justify-between items-center">
                    <div className="text-[10px] uppercase text-slate-500 dark:text-neutral-500 tracking-widest">Model Answer</div>
                    {isGenerating && <RefreshCw size={12} className="animate-spin text-slate-400 dark:text-neutral-500" />}
                 </div>
                 
                 <div className={`p-4 min-h-[60px] rounded border ${model === 'T5' ? 'border-yellow-200 dark:border-yellow-900/30 bg-yellow-50 dark:bg-yellow-900/5' : 'border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/5'}`}>
                    <AnimatePresence mode="wait">
                        {isGenerating ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex gap-1"
                            >
                                <span className="w-2 h-4 bg-slate-400 dark:bg-neutral-700 animate-pulse block"></span>
                                <span className="w-2 h-4 bg-slate-400 dark:bg-neutral-700 animate-pulse delay-75 block"></span>
                                <span className="w-2 h-4 bg-slate-400 dark:bg-neutral-700 animate-pulse delay-150 block"></span>
                            </motion.div>
                        ) : (
                            <motion.p 
                                key={model}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-slate-900 dark:text-white leading-relaxed text-sm font-bold"
                            >
                                {displayOutput}
                            </motion.p>
                        )}
                    </AnimatePresence>
                 </div>
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-200 dark:border-neutral-800">
                <div>
                    <div className="text-[9px] uppercase text-slate-500 dark:text-neutral-500">Exact Match (EM)</div>
                    <div className="text-slate-900 dark:text-white font-bold">{model === 'T5' ? '82.8%' : '80.1%'}</div>
                </div>
                <div>
                    <div className="text-[9px] uppercase text-slate-500 dark:text-neutral-500">F1 Score</div>
                    <div className="text-slate-900 dark:text-white font-bold">{model === 'T5' ? '90.4' : '88.2'}</div>
                </div>
                <div>
                    <div className="text-[9px] uppercase text-slate-500 dark:text-neutral-500">Inference</div>
                    <div className="text-slate-900 dark:text-white font-bold">{model === 'T5' ? '120ms' : '145ms'}</div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Seq2SeqVisual;
