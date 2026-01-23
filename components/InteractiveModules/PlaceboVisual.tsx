
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart2 } from 'lucide-react';

const PlaceboVisual: React.FC = () => {
  // Generate a fake normal distribution for placebo effects
  const placeboEffects = Array.from({ length: 40 }, (_, i) => {
    const x = i - 20;
    // Gaussian function
    const y = Math.exp(-(x * x) / 50); 
    return { val: x, freq: y };
  });

  const realEffect = 18; // Far right outlier

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 flex flex-col relative overflow-hidden font-mono text-sm transition-colors duration-500">
      
      <div className="absolute bottom-0 left-0 p-32 bg-blue-500/5 dark:bg-blue-900/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="mb-6 z-10">
        <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-1">
            <ShieldCheck size={12} /> Robustness Validation
        </div>
        <h3 className="text-slate-900 dark:text-white font-bold">Empirical Null Distribution</h3>
        <p className="text-slate-500 dark:text-neutral-500 text-xs mt-1 max-w-sm">
            Distribution of effects from 500+ fake (placebo) interventions.
        </p>
      </div>

      {/* Visualization */}
      <div className="flex-1 flex items-end justify-between gap-1 relative z-10 pb-6 border-b border-slate-200 dark:border-neutral-800">
         {placeboEffects.map((bar, i) => (
             <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${bar.freq * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.01 }}
                className="w-full bg-slate-300 dark:bg-neutral-800 rounded-t-sm hover:bg-slate-400 dark:hover:bg-neutral-700 transition-colors relative group"
             >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 text-[8px] text-white bg-black px-1 rounded pointer-events-none">
                    {bar.val}
                </div>
             </motion.div>
         ))}
         
         {/* The Real Effect Bar - Outlier */}
         <div className="w-full h-full flex items-end relative">
             <motion.div 
                initial={{ height: 0 }}
                animate={{ height: '80%' }}
                transition={{ delay: 1, type: "spring" }}
                className="w-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-t-sm relative"
             >
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                    <span className="text-[9px] font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 border border-blue-200 dark:border-blue-500/30 rounded">
                        True Effect (+{realEffect})
                    </span>
                    <div className="w-[1px] h-2 bg-blue-600 dark:bg-blue-500 mx-auto"></div>
                </motion.div>
             </motion.div>
         </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 flex justify-between items-center">
         <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-slate-300 dark:bg-neutral-800 rounded-sm"></div>
                 <span className="text-[10px] text-slate-500 dark:text-neutral-500">Placebo Noise</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-sm"></div>
                 <span className="text-[10px] text-slate-800 dark:text-neutral-300">Causal Signal</span>
             </div>
         </div>
         <div className="text-right">
             <div className="text-[9px] text-slate-500 dark:text-neutral-500 uppercase">P-Value</div>
             <div className="text-slate-900 dark:text-white font-mono font-bold">{'<'} 0.001</div>
         </div>
      </div>

    </div>
  );
};

export default PlaceboVisual;
