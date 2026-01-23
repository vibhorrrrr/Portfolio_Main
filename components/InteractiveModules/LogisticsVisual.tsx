
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, TrendingDown, Activity, Scale, Milestone } from 'lucide-react';

const LogisticsVisual: React.FC = () => {
  const [trafficDensity, setTrafficDensity] = useState(40); // 0-100
  const [hoveredCell, setHoveredCell] = useState<{distance: number; weight: number; cost: number} | null>(null);

  const weights = [10, 20, 30, 40, 50]; // kg
  const distances = [5, 10, 15, 20, 25]; // km

  // Generate cost matrix based on traffic, weight, and distance
  const matrix = useMemo(() => {
    return weights.map(w => {
      return distances.map(d => {
        // Base cost formula simulation
        // Cost = (Base + Weight*0.5 + Distance*1.2) * TrafficMultiplier
        const trafficMult = 1 + (trafficDensity / 100) * 0.8; // 1.0 to 1.8
        const baseCost = 50 + (w * 0.5) + (d * 1.5);
        const efficiencyBonus = (w > 30 && d > 15) ? 0.9 : 1.0; // Efficiency at scale
        
        return Math.floor(baseCost * trafficMult * efficiencyBonus);
      });
    });
  }, [trafficDensity]);

  const maxCost = Math.max(...matrix.flat());
  const minCost = Math.min(...matrix.flat());

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col font-mono text-sm relative overflow-hidden p-6 transition-colors duration-500">
       
       {/* Background Decor */}
       <div className="absolute bottom-0 left-0 p-32 bg-emerald-500/5 dark:bg-emerald-900/10 blur-[80px] rounded-full pointer-events-none" />

       {/* Header */}
       <div className="flex justify-between items-start mb-6 z-10 shrink-0">
            <div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <Truck size={12} />
                    <span>Cost Optimization Engine</span>
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mt-1">Stochastic Cost Simulator</h3>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest">Simulation Active</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-600 mt-1">Accuracy (MAE): 0.85</div>
            </div>
       </div>

       {/* Main Content Grid */}
       <div className="flex-1 flex gap-8 z-10 min-h-0">
            
            {/* Left: Inputs */}
            <div className="w-1/4 flex flex-col justify-center space-y-8 shrink-0">
                <div>
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-neutral-400 mb-2 uppercase tracking-wider">
                        <span>Traffic Density</span>
                        <span className="text-slate-900 dark:text-white font-bold">{trafficDensity}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={trafficDensity} 
                        onChange={(e) => setTrafficDensity(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[8px] text-slate-500 dark:text-neutral-600 mt-2">
                        <span>Clear</span>
                        <span>Congested</span>
                    </div>
                </div>

                <div className="space-y-4">
                     <div className="p-3 bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 rounded">
                        <div className="text-[9px] text-slate-500 dark:text-neutral-500 uppercase mb-1">Route Efficiency</div>
                        <div className={`text-sm font-bold ${trafficDensity > 60 ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
                            {trafficDensity > 60 ? 'DEGRADED' : 'OPTIMAL'}
                        </div>
                     </div>
                     <div className="p-3 bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 rounded">
                        <div className="text-[9px] text-slate-500 dark:text-neutral-500 uppercase mb-1">Fuel Index</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-neutral-300">₹96.4 / L</div>
                     </div>
                </div>
            </div>

            {/* Right: Heatmap */}
            <div className="flex-1 h-full flex flex-col relative pl-6 pt-10">
                
                {/* Axis Labels (Positioned in Padding Gutter) */}
                <div className="absolute left-0 top-[30px] bottom-0 w-6 flex items-center justify-center z-20">
                    <span className="-rotate-90 text-[10px] text-slate-400 dark:text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2 whitespace-nowrap opacity-80">
                        <Scale size={10} className="rotate-90" /> Payload
                    </span>
                </div>

                <div className="absolute top-1 left-[40px] right-0 h-6 flex items-center justify-center z-20">
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2 opacity-80">
                        Route Distance <Milestone size={10} />
                    </span>
                </div>
                
                {/* CSS Grid for perfect alignment */}
                <div className="grid grid-cols-[40px_repeat(5,1fr)] grid-rows-[30px_repeat(5,1fr)] gap-1 w-full h-full">
                    
                    {/* Corner */}
                    <div className="relative border-b border-r border-slate-200 dark:border-neutral-800/50 bg-slate-50 dark:bg-neutral-900/20">
                        <span className="absolute bottom-1 right-1 text-[8px] text-slate-400 dark:text-neutral-700 font-mono">KG\KM</span>
                    </div>

                    {/* Column Headers (Distances) */}
                    {distances.map(d => (
                        <div key={`col-${d}`} className="flex flex-col items-center justify-end pb-2 border-b border-slate-200 dark:border-neutral-800/30 bg-slate-50 dark:bg-neutral-900/10">
                            <span className="text-[10px] text-slate-400 dark:text-neutral-400 font-mono font-bold">{d}</span>
                            <span className="text-[8px] text-slate-500 dark:text-neutral-600 uppercase">km</span>
                        </div>
                    ))}

                    {/* Data Rows */}
                    {weights.map((weight, rowIndex) => (
                        <React.Fragment key={`row-frag-${weight}`}>
                            {/* Row Header (Weight) */}
                            <div className="flex flex-col items-end justify-center pr-2 border-r border-slate-200 dark:border-neutral-800/30 bg-slate-50 dark:bg-neutral-900/10">
                                <span className="text-[10px] text-slate-400 dark:text-neutral-400 font-mono font-bold">{weight}</span>
                                <span className="text-[8px] text-slate-500 dark:text-neutral-600 uppercase">kg</span>
                            </div>

                            {/* Cells */}
                            {distances.map((dist, colIndex) => {
                                const cost = matrix[rowIndex][colIndex];
                                const intensity = (cost - minCost) / (maxCost - minCost);
                                const isHovered = hoveredCell?.weight === weight && hoveredCell?.distance === dist;
                                
                                // Colors: Low cost = darker/transparent, High cost = bright emerald
                                const bgColor = `rgba(16, 185, 129, ${0.1 + intensity * 0.8})`;
                                const textColor = intensity > 0.6 ? 'text-white dark:text-black' : 'text-emerald-700 dark:text-emerald-400';

                                return (
                                    <motion.div
                                        key={`${weight}-${dist}`}
                                        className={`
                                            relative rounded-sm cursor-pointer border transition-all duration-200
                                            flex items-center justify-center
                                            ${isHovered ? 'z-20 border-slate-900 dark:border-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-110' : 'border-transparent hover:border-emerald-500/30'}
                                        `}
                                        style={{ backgroundColor: bgColor }}
                                        onMouseEnter={() => setHoveredCell({ weight, distance: dist, cost })}
                                        onMouseLeave={() => setHoveredCell(null)}
                                    >
                                        <span className={`text-[11px] font-mono font-bold ${textColor}`}>
                                            {cost}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>

            </div>
       </div>

       {/* Footer / Tooltip Area */}
       <div className="h-16 mt-6 border-t border-slate-200 dark:border-neutral-800 pt-4 flex justify-between items-center shrink-0">
            <AnimatePresence mode="wait">
                {hoveredCell ? (
                    <motion.div 
                        key="info"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex items-center gap-3">
                            <TrendingDown size={16} className="text-emerald-600 dark:text-emerald-500" />
                            <div>
                                <div className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase">Est. Cost</div>
                                <div className="text-slate-900 dark:text-white font-bold text-lg">₹{hoveredCell.cost}</div>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-slate-200 dark:bg-neutral-800"></div>
                        <div className="text-xs text-slate-500 dark:text-neutral-400">
                            Config: <span className="text-slate-900 dark:text-white font-bold">{hoveredCell.weight}kg</span> payload / <span className="text-slate-900 dark:text-white font-bold">{hoveredCell.distance}km</span> route
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 dark:text-neutral-600 text-xs italic"
                    >
                        Hover over grid cells to inspect delivery cost variations.
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-neutral-500">
                <Activity size={12} />
                <span>Sim. Latency: 12ms</span>
            </div>
       </div>

    </div>
  );
};

export default LogisticsVisual;
