
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const DatingVisual: React.FC = () => {
  const [mode, setMode] = useState<'LOVE' | 'RETENTION'>('LOVE');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Simulated Data
  const data = Array.from({ length: 12 }, (_, i) => {
    const week = i + 1;
    if (mode === 'LOVE') {
        return { 
            week: `W${week}`, 
            activeUsers: Math.floor(1000 * Math.exp(-0.2 * i)), // Fast decay due to success
            matches: Math.floor(40 * Math.exp(-0.05 * i) + (Math.random() * 5)) // High matches
        };
    } else {
        return { 
            week: `W${week}`, 
            activeUsers: Math.floor(1000 * Math.exp(-0.02 * i)), // Very slow decay (retention)
            matches: Math.floor(5 + Math.random() * 3) // Low constant matches (keep searching)
        };
    }
  });

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 flex flex-col relative overflow-hidden font-mono text-sm transition-colors duration-500">
      
      {/* Background */}
      <div className={`absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none transition-colors duration-500 ${mode === 'LOVE' ? 'bg-red-500' : 'bg-blue-500'}`} />

      {/* Header & Controls */}
      <div className="flex justify-between items-start mb-6 z-10">
        <div>
           <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase tracking-widest mb-2">Algorithm Objective</div>
           <div className="flex bg-slate-100 dark:bg-neutral-900 p-1 rounded border border-slate-200 dark:border-neutral-800">
               <button 
                  onClick={() => setMode('LOVE')}
                  className={`px-3 py-1.5 rounded text-xs flex items-center gap-2 transition-all ${mode === 'LOVE' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-500 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white'}`}
               >
                  <Heart size={12} fill={mode === 'LOVE' ? "currentColor" : "none"} /> Love
               </button>
               <button 
                  onClick={() => setMode('RETENTION')}
                  className={`px-3 py-1.5 rounded text-xs flex items-center gap-2 transition-all ${mode === 'RETENTION' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white'}`}
               >
                  <RefreshCw size={12} /> Retention
               </button>
           </div>
        </div>
        
        <div className="text-right">
            <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase">Platform LTV</div>
            <motion.div 
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xl font-bold ${mode === 'RETENTION' ? 'text-green-600 dark:text-green-500' : 'text-slate-400 dark:text-neutral-400'}`}
            >
                {mode === 'RETENTION' ? '$48,200' : '$12,500'}
            </motion.div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex-1 grid grid-cols-2 gap-4 z-10 min-h-0">
         
         {/* Metric 1: Active Users */}
         <div className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-neutral-800 rounded p-4 flex flex-col">
            <div className="text-[10px] text-slate-400 dark:text-neutral-400 uppercase mb-2 flex items-center gap-2">
                <Users size={12} /> User Retention
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={mode === 'RETENTION' ? "#3b82f6" : "#ef4444"} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={mode === 'RETENTION' ? "#3b82f6" : "#ef4444"} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="week" tick={{fontSize: 10, fill: isDark ? '#555' : '#94a3b8'}} axisLine={false} tickLine={false} interval={2} />
                        <YAxis hide domain={[0, 1000]} />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: isDark ? '#0a0a0a' : '#fff', 
                                border: isDark ? '1px solid #333' : '1px solid #e2e8f0', 
                                color: isDark ? '#fff' : '#0f172a'
                            }}
                            itemStyle={{fontSize: 12, color: mode === 'RETENTION' ? "#3b82f6" : "#ef4444"}}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="activeUsers" 
                            stroke={mode === 'RETENTION' ? "#3b82f6" : "#ef4444"} 
                            fill="url(#colorUsers)" 
                            animationDuration={1000}
                            name="Active Users"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-center text-slate-500 dark:text-neutral-500">
                {mode === 'RETENTION' ? 'High sustained traffic' : 'High churn post-match'}
            </div>
         </div>

         {/* Metric 2: Matches/Relationships */}
         <div className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-neutral-800 rounded p-4 flex flex-col">
            <div className="text-[10px] text-slate-400 dark:text-neutral-400 uppercase mb-2 flex items-center gap-2">
                <Heart size={12} /> Relationship Formation
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="week" tick={{fontSize: 10, fill: isDark ? '#555' : '#94a3b8'}} axisLine={false} tickLine={false} interval={2} />
                        <Tooltip 
                            cursor={{fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}}
                            contentStyle={{
                                backgroundColor: isDark ? '#0a0a0a' : '#fff', 
                                border: isDark ? '1px solid #333' : '1px solid #e2e8f0', 
                                color: isDark ? '#fff' : '#0f172a'
                            }}
                            itemStyle={{fontSize: 12}}
                        />
                        <Bar dataKey="matches" radius={[2, 2, 0, 0]} animationDuration={1000} name="Successful Matches">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={mode === 'LOVE' ? '#ef4444' : (isDark ? '#333' : '#cbd5e1')} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-center text-slate-500 dark:text-neutral-500">
                {mode === 'LOVE' ? 'Matches maximized' : 'Matches suppressed'}
            </div>
         </div>

      </div>

      <div className="mt-4 text-[10px] text-slate-500 dark:text-neutral-500 italic text-center">
          "Algorithmic incentives determine whether users find love or stay scrolling."
      </div>

    </div>
  );
};

export default DatingVisual;
