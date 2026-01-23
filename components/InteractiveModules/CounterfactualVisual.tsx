
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, Area } from 'recharts';
import { motion } from 'framer-motion';
import { GitBranch, Eye, EyeOff, ArrowUpFromLine } from 'lucide-react';
import TermTooltip from '../TermTooltip';

const CounterfactualVisual: React.FC = () => {
  const [showCounterfactual, setShowCounterfactual] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  const rawData = [
    { time: 0, observed: 10, counterfactual: 10 },
    { time: 1, observed: 12, counterfactual: 12 },
    { time: 2, observed: 15, counterfactual: 14 },
    { time: 3, observed: 18, counterfactual: 17 },
    { time: 4, observed: 25, counterfactual: 19 }, // Intervention
    { time: 5, observed: 35, counterfactual: 21 },
    { time: 6, observed: 48, counterfactual: 24 },
    { time: 7, observed: 55, counterfactual: 26 },
    { time: 8, observed: 62, counterfactual: 28 },
    { time: 9, observed: 65, counterfactual: 30 },
  ];

  // Process data to allow area filling between lines (the gap)
  const data = rawData.map(d => ({
    ...d,
    // Define the range for the gap area only after intervention
    gap: d.time >= 4 ? [d.counterfactual, d.observed] : null
  }));

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 flex flex-col relative overflow-hidden font-mono text-sm transition-colors duration-500">
      <div className="absolute top-0 right-0 p-32 bg-purple-500/10 dark:bg-purple-900/10 blur-[80px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4 z-10">
        <div>
           <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <GitBranch size={12} /> Causal Inference Engine
           </div>
           <h3 className="text-slate-900 dark:text-white font-bold mt-1">Intervention Impact Analysis</h3>
        </div>
        <button 
           onClick={() => setShowCounterfactual(!showCounterfactual)}
           className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded text-xs text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-neutral-600 transition-colors"
        >
            {showCounterfactual ? <Eye size={12} /> : <EyeOff size={12} />}
            {showCounterfactual ? 'Hide Counterfactual' : 'Show Counterfactual'}
        </button>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} stopOpacity={0.05}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{fill: isDark ? '#555' : '#94a3b8', fontSize: 10}} axisLine={{stroke: isDark ? '#333' : '#e2e8f0'}} tickLine={false} />
                <YAxis tick={{fill: isDark ? '#555' : '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
                        border: isDark ? '1px solid #333' : '1px solid #e2e8f0', 
                        color: isDark ? '#fff' : '#0f172a'
                    }}
                    itemStyle={{fontSize: 12}}
                />
                
                {/* Intervention Line */}
                <ReferenceLine x={4} stroke={isDark ? "#666" : "#94a3b8"} strokeDasharray="3 3" label={{ value: 'Intervention', position: 'insideTopLeft', fill: isDark ? '#666' : '#94a3b8', fontSize: 10 }} />

                {/* The Gap Area */}
                {showCounterfactual && (
                    <Area 
                        type="monotone"
                        dataKey="gap"
                        stroke="none"
                        fill="url(#gapGradient)"
                        animationDuration={1500}
                    />
                )}

                {/* Vertical Distance Lines for Causal Impact */}
                {showCounterfactual && data.filter(d => d.time > 4).map((d, i) => (
                    <ReferenceLine 
                        key={`gap-line-${d.time}`}
                        segment={[{ x: d.time, y: d.counterfactual }, { x: d.time, y: d.observed }]}
                        stroke={isDark ? "#a855f7" : "#7c3aed"}
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        opacity={0.4}
                    />
                ))}

                {/* Explicit Distance Marker (Gap Line) */}
                {showCounterfactual && (
                    <ReferenceLine 
                        segment={[{ x: 9, y: 30 }, { x: 9, y: 65 }]} 
                        stroke={isDark ? "#a855f7" : "#7c3aed"} 
                        strokeWidth={2}
                        label={{ 
                            value: "+35.0 Impact", 
                            position: 'right', 
                            fill: isDark ? "#a855f7" : "#7c3aed", 
                            fontSize: 11, 
                            fontWeight: "bold",
                        }}
                    />
                )}

                {/* Counterfactual (The "Unseen") */}
                {showCounterfactual && (
                    <Line 
                        type="monotone" 
                        dataKey="counterfactual" 
                        stroke={isDark ? "#555" : "#94a3b8"} 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        dot={false}
                        animationDuration={1500}
                        name="Counterfactual (No Action)"
                    />
                )}

                {/* Observed Reality */}
                <Line 
                    type="monotone" 
                    dataKey="observed" 
                    stroke={isDark ? "#8b5cf6" : "#7c3aed"} 
                    strokeWidth={3} 
                    dot={{fill: isDark ? '#8b5cf6' : '#7c3aed', r: 3}}
                    activeDot={{r: 6}}
                    animationDuration={1500}
                    name="Observed Outcome"
                />
            </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-neutral-800 flex justify-between items-center text-xs">
         <div className="flex flex-col">
            <span className="text-slate-500 dark:text-neutral-500 uppercase text-[9px]">Methodology</span>
            <span className="text-slate-900 dark:text-white">
                <TermTooltip term="Difference-in-Differences" definition="Estimates causal effect by comparing pre/post intervention changes between treatment and control groups." className="border-slate-300 dark:border-neutral-700">
                    Difference-in-Differences
                </TermTooltip>
            </span>
         </div>
         <div className="flex flex-col text-right">
            <span className="text-slate-500 dark:text-neutral-500 uppercase text-[9px]">Estimated Causal Impact</span>
            <motion.div 
                key={showCounterfactual ? 'show' : 'hide'}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-end gap-2 text-purple-600 dark:text-purple-400 font-bold font-mono text-lg"
            >
                {showCounterfactual && <ArrowUpFromLine size={16} />}
                <span>+35.0 Units</span>
            </motion.div>
         </div>
      </div>
    </div>
  );
};

export default CounterfactualVisual;
