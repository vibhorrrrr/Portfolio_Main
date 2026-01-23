
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Zap, Server, MessageSquare } from 'lucide-react';

const ARCVisual: React.FC = () => {
  const [model, setModel] = useState<'MISTRAL' | 'SCOUT'>('MISTRAL');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  const contextText = "Context: The routing layer intercepts the user query. If the perplexity score of the draft response is below threshold theta (0.4), it delegates to the edge node. Otherwise, it forwards to the foundation model.";
  const queryText = "Query: Summarize the routing logic.";
  
  const outputs = {
    MISTRAL: "If perplexity < 0.4, use edge node. Else, use foundation model.",
    SCOUT: "The system employs a threshold-based routing mechanism where queries are processed by the edge node if the draft response perplexity is below 0.4, ensuring efficiency for simple tasks while reserving the foundation model for complex reasoning."
  };

  const [displayOutput, setDisplayOutput] = useState(outputs[model]);

  useEffect(() => {
    setIsGenerating(true);
    setDisplayOutput("");
    
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
                onClick={() => setModel('MISTRAL')}
                className={`flex-1 p-3 text-xs flex items-center justify-center gap-2 transition-colors ${model === 'MISTRAL' ? 'bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-neutral-500 hover:text-slate-800 dark:hover:text-neutral-300'}`}
            >
                <Zap size={14} className={model === 'MISTRAL' ? 'text-blue-600 dark:text-neural' : ''} />
                Mistral 7B (Edge)
            </button>
            <div className="w-[1px] bg-slate-200 dark:bg-neutral-800"></div>
            <button 
                onClick={() => setModel('SCOUT')}
                className={`flex-1 p-3 text-xs flex items-center justify-center gap-2 transition-colors ${model === 'SCOUT' ? 'bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-neutral-500 hover:text-slate-800 dark:hover:text-neutral-300'}`}
            >
                <Server size={14} className={model === 'SCOUT' ? 'text-purple-600 dark:text-purple-500' : ''} />
                Scout 17B (Cloud)
            </button>
        </div>

        {/* Visualization Area */}
        <div className="flex-1 p-6 flex flex-col justify-between relative">
            
            {/* Input Layer */}
            <div className="space-y-4 relative z-10">
                <div>
                    <div className="text-[10px] uppercase text-slate-500 dark:text-neutral-500 tracking-widest mb-1">System Context</div>
                    <div className="text-xs text-slate-600 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/50 p-2 rounded border border-slate-200 dark:border-neutral-800 leading-relaxed">
                        {contextText}
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <MessageSquare size={12} className="text-blue-600 dark:text-neural" />
                    <span className="text-slate-800 dark:text-white text-xs italic">{queryText}</span>
                </div>
            </div>

            {/* Attention Lines (SVG Overlay) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full">
                    {!isGenerating && displayOutput.split(" ").map((_, i) => (
                        <line 
                            key={i}
                            x1={`${10 + (i * 5)}%`} 
                            y1="45%" 
                            x2={`${15 + (i * 8)}%`} 
                            y2="75%" 
                            stroke={model === 'MISTRAL' ? (isDark ? '#00f0ff' : '#2563eb') : (isDark ? '#a855f7' : '#9333ea')} 
                            strokeWidth="1" 
                            strokeDasharray="4 4"
                        />
                    ))}
                </svg>
            </div>

            {/* Output Layer */}
            <div className="space-y-2 relative z-10 mt-8">
                 <div className="flex justify-between items-center">
                    <div className="text-[10px] uppercase text-slate-500 dark:text-neutral-500 tracking-widest">Generated Response</div>
                    {isGenerating && <RefreshCw size={12} className="animate-spin text-slate-400 dark:text-neutral-500" />}
                 </div>
                 
                 <div className={`p-4 min-h-[60px] rounded border ${model === 'MISTRAL' ? 'border-cyan-200 dark:border-cyan-900/30 bg-cyan-50 dark:bg-cyan-900/5' : 'border-purple-200 dark:border-purple-900/30 bg-purple-50 dark:bg-purple-900/5'}`}>
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
                    <div className="text-[9px] uppercase text-slate-500 dark:text-neutral-500">Latency</div>
                    <div className="text-slate-900 dark:text-white font-bold">{model === 'MISTRAL' ? '12ms' : '450ms'}</div>
                </div>
                <div>
                    <div className="text-[9px] uppercase text-slate-500 dark:text-neutral-500">Cost</div>
                    <div className="text-slate-900 dark:text-white font-bold">{model === 'MISTRAL' ? '$0.00' : '$0.03'}</div>
                </div>
                <div>
                    <div className="text-[9px] uppercase text-slate-500 dark:text-neutral-500">Reasoning</div>
                    <div className="text-slate-900 dark:text-white font-bold">{model === 'MISTRAL' ? 'Shallow' : 'Deep'}</div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default ARCVisual;
