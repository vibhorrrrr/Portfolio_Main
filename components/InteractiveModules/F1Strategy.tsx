
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Wind, Trophy, Milestone } from 'lucide-react';
import TermTooltip from '../TermTooltip';

const F1Strategy: React.FC = () => {
  const [tyreDeg, setTyreDeg] = useState(40);
  const [hoveredStrategy, setHoveredStrategy] = useState<{compound: string; lap: number; prob: number} | null>(null);

  const compounds = ['SOFT', 'MEDIUM', 'HARD'];
  const pitLaps = [28, 29, 30, 31, 32];

  const matrix = useMemo(() => {
    return compounds.map(compound => {
      return pitLaps.map(lap => {
        let score = 50;
        const normalizedDeg = tyreDeg / 100; 
        const idealLapIndex = 4 - Math.floor(normalizedDeg * 4); 
        const currentLapIndex = pitLaps.indexOf(lap);
        const distance = Math.abs(idealLapIndex - currentLapIndex);
        score += (2 - distance) * 15; 
        if (compound === 'SOFT') { score += 10; if (lap > 30) score -= 20; }
        else if (compound === 'HARD') { score -= 5; if (tyreDeg > 80) score += 15; }
        return Math.min(99, Math.max(1, score));
      });
    });
  }, [tyreDeg]);

  const maxProb = Math.max(...matrix.flat());

  return (
    <div className="w-full h-full bg-neutral-950 dark:bg-neutral-950 bg-white border border-slate-200 dark:border-neutral-800 flex flex-col font-mono text-sm relative overflow-hidden p-6 transition-colors duration-500">
       
       {/* Background Decor */}
       <div className="absolute top-0 right-0 p-24 bg-blue-900/10 dark:bg-blue-900/10 blur-[80px] rounded-full pointer-events-none" />

       {/* Header */}
       <div className="flex justify-between items-start mb-6 z-10 shrink-0">
            <div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <Timer size={12} />
                    <span>Race Strategy Optimizer</span>
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mt-1">Stint 2 Projection</h3>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Live Telemetry</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-600 mt-1">Lap 24/52 • Pos 3</div>
            </div>
       </div>

       {/* Main Content Grid */}
       <div className="flex-1 flex gap-8 z-10 min-h-0">
            
            {/* Left: Inputs */}
            <div className="w-1/4 flex flex-col justify-center space-y-8 shrink-0">
                <div>
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-neutral-400 mb-2 uppercase tracking-wider">
                        <span>Current Tyre Deg</span>
                        <span className="text-slate-900 dark:text-white font-bold">{tyreDeg}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={tyreDeg} 
                        onChange={(e) => setTyreDeg(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[8px] text-slate-500 dark:text-neutral-600 mt-2">
                        <span>Fresh</span>
                        <span>Critical</span>
                    </div>
                </div>

                <div className="space-y-4">
                     <div className="p-3 bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 rounded">
                        <div className="text-[9px] text-slate-500 dark:text-neutral-500 uppercase mb-1">
                            <TermTooltip term="Undercut Risk" definition="Probability of losing track position to a rival who pits earlier for fresh tyres.">
                                Undercut Risk
                            </TermTooltip>
                        </div>
                        <div className={`text-sm font-bold ${tyreDeg > 60 ? 'text-red-500' : 'text-green-500'}`}>
                            {tyreDeg > 60 ? 'HIGH' : 'LOW'}
                        </div>
                     </div>
                     <div className="p-3 bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 rounded">
                        <div className="text-[9px] text-slate-500 dark:text-neutral-500 uppercase mb-1">Track Temp</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-neutral-300">42°C</div>
                     </div>
                </div>
            </div>

            {/* Right: Heatmap */}
            <div className="flex-1 h-full flex flex-col relative pl-6 pt-10">
                <div className="absolute left-0 top-[30px] bottom-0 w-6 flex items-center justify-center z-20">
                    <span className="-rotate-90 text-[10px] text-slate-400 dark:text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2 whitespace-nowrap opacity-80">
                         Compound
                    </span>
                </div>

                <div className="absolute top-1 left-[40px] right-0 h-6 flex items-center justify-center z-20">
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2 opacity-80">
                        Pit Window (Lap) <Milestone size={10} />
                    </span>
                </div>

                <div className="grid grid-cols-[40px_repeat(5,1fr)] grid-rows-[30px_repeat(3,1fr)] gap-1 w-full h-full">
                    <div className="relative border-b border-r border-slate-200 dark:border-neutral-800/50 bg-slate-50 dark:bg-neutral-900/20">
                        <span className="absolute bottom-1 right-1 text-[8px] text-slate-400 dark:text-neutral-700 font-mono">TYRE\LAP</span>
                    </div>

                    {pitLaps.map(lap => (
                        <div key={`col-${lap}`} className="flex flex-col items-center justify-end pb-2 border-b border-slate-200 dark:border-neutral-800/30 bg-slate-50 dark:bg-neutral-900/10">
                            <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono font-bold">{lap}</span>
                        </div>
                    ))}

                    {compounds.map((compound, rowIndex) => (
                        <React.Fragment key={`row-frag-${compound}`}>
                            <div className="flex flex-col items-end justify-center pr-2 border-r border-slate-200 dark:border-neutral-800/30 bg-slate-50 dark:bg-neutral-900/10">
                                <span className={`text-[10px] font-mono font-bold ${compound === 'SOFT' ? 'text-red-500 dark:text-red-400' : compound === 'MEDIUM' ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-800 dark:text-white'}`}>
                                    {compound[0]}
                                </span>
                            </div>

                            {pitLaps.map((lap, colIndex) => {
                                const prob = matrix[rowIndex][colIndex];
                                const isMax = prob === maxProb;
                                const isHovered = hoveredStrategy?.compound === compound && hoveredStrategy?.lap === lap;
                                const bgColor = `rgba(59, 130, 246, ${prob / 150})`; // Blue base
                                
                                return (
                                    <motion.div
                                        key={`${compound}-${lap}`}
                                        className={`
                                            relative rounded-sm cursor-pointer border transition-all duration-200
                                            flex items-center justify-center
                                            ${isMax ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10' : 'border-transparent'}
                                            ${isHovered ? 'z-20 border-slate-900 dark:border-white scale-110' : 'hover:border-blue-500/30'}
                                        `}
                                        style={{ backgroundColor: bgColor }}
                                        onMouseEnter={() => setHoveredStrategy({ compound, lap, prob })}
                                        onMouseLeave={() => setHoveredStrategy(null)}
                                    >
                                        <span className={`text-[11px] font-mono font-bold ${prob > 60 ? 'text-slate-900 dark:text-black' : 'text-slate-600 dark:text-neutral-400'}`}>
                                            {prob}%
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
       </div>

       <div className="h-16 mt-6 border-t border-slate-200 dark:border-neutral-800 pt-4 flex justify-between items-center">
            <AnimatePresence mode="wait">
                {hoveredStrategy ? (
                    <motion.div 
                        key="info"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex items-center gap-3">
                            <Trophy size={16} className="text-yellow-500" />
                            <div>
                                <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase">Est. Finish</div>
                                <div className="text-slate-900 dark:text-white font-bold">P{hoveredStrategy.prob > 80 ? '1' : hoveredStrategy.prob > 60 ? '2' : hoveredStrategy.prob > 40 ? '4' : '8'}</div>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-slate-200 dark:bg-neutral-800"></div>
                        <div>
                            <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase">Strategy Delta</div>
                            <div className={`text-sm font-mono ${hoveredStrategy.prob >= maxProb ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                                {hoveredStrategy.prob >= maxProb ? '+0.00s (OPTIMAL)' : `+${(maxProb - hoveredStrategy.prob) * 0.42}s`}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 dark:text-neutral-600 text-xs italic"
                    >
                        Hover over the heatmap to analyze pit window outcomes.
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-neutral-500">
                <Wind size={12} />
                <span>Model Confidence: 98.4%</span>
            </div>
       </div>

    </div>
  );
};

export default F1Strategy;
