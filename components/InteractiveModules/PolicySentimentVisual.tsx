
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const PolicySentimentVisual: React.FC = () => {
  const [timeIndex, setTimeIndex] = useState(2);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const data = [
    { month: 'Q1', sentiment: 42, keywords: ['Drought', 'Fear', 'Loss'] },
    { month: 'Q2', sentiment: 55, keywords: ['Rain', 'Hope', 'Sowing'] },
    { month: 'Q3', sentiment: 35, keywords: ['MSP', 'Protest', 'Delay'] },
    { month: 'Q4', sentiment: 68, keywords: ['Subsidy', 'Yield', 'Profit'] },
    { month: 'Q5', sentiment: 75, keywords: ['Export', 'Growth', 'Policy'] },
    { month: 'Q6', sentiment: 62, keywords: ['Market', 'Stable', 'Fair'] },
  ];

  const currentData = data[timeIndex];

  return (
    <div className="w-full h-full bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 p-6 flex flex-col font-mono text-sm relative overflow-hidden transition-colors duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 z-10">
        <div className="text-xs text-slate-500 dark:text-neutral-500 uppercase tracking-widest">
            Policy Dynamics Simulator
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded border ${currentData.sentiment > 50 ? 'bg-blue-50 dark:bg-neural/10 text-blue-600 dark:text-neural border-blue-200 dark:border-neural/20' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20'}`}>
            Index: {currentData.sentiment}/100
        </div>
      </div>

      {/* Main Chart */}
      <div className="flex-1 w-full min-h-[150px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentData.sentiment > 50 ? (isDark ? "#00f0ff" : "#3b82f6") : "#ff2a2a"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={currentData.sentiment > 50 ? (isDark ? "#00f0ff" : "#3b82f6") : "#ff2a2a"} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{fill: isDark ? '#444' : '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: isDark ? '#000' : '#fff', 
                        border: isDark ? '1px solid #333' : '1px solid #e2e8f0', 
                        color: isDark ? '#fff' : '#0f172a'
                    }}
                    itemStyle={{color: currentData.sentiment > 50 ? (isDark ? "#00f0ff" : "#3b82f6") : "#ff2a2a"}}
                    labelStyle={{color: isDark ? '#666' : '#64748b'}}
                />
                <Area 
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke={currentData.sentiment > 50 ? (isDark ? "#00f0ff" : "#3b82f6") : "#ff2a2a"} 
                    fillOpacity={1} 
                    fill="url(#colorSent)" 
                    animationDuration={500}
                />
                <ReferenceLine x={currentData.month} stroke={isDark ? "#fff" : "#0f172a"} strokeDasharray="3 3" />
            </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Slider Control */}
      <div className="my-6 z-10">
        <input 
            type="range" 
            min="0" 
            max="5" 
            value={timeIndex} 
            onChange={(e) => setTimeIndex(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
        />
        <div className="flex justify-between text-[10px] text-slate-500 dark:text-neutral-600 mt-2 uppercase">
            <span>Simulation Timeframe</span>
            <span>Current State</span>
        </div>
      </div>

      {/* Attention Mechanism Visualization */}
      <div className="h-24 bg-slate-50 dark:bg-neutral-900/30 border-t border-slate-200 dark:border-neutral-800 p-4 relative z-10">
          <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase mb-2">Emergent Topics (RNN Attention)</div>
          <div className="flex gap-2">
            <AnimatePresence mode='wait'>
                {currentData.keywords.map((word, i) => (
                    <motion.div
                        key={`${timeIndex}-${word}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: i * 0.1 }}
                        className={`px-3 py-1 bg-white dark:bg-neutral-800 border text-xs font-medium rounded ${currentData.sentiment > 50 ? 'border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-200' : 'border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-300'}`}
                    >
                        {word}
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-32 bg-blue-500/5 dark:bg-neural/5 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
};

export default PolicySentimentVisual;
