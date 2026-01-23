
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface NodeState {
    id: string;
    label: string;
    x: number;
    y: number;
    value: 'neutral' | 'high' | 'low';
    trend?: 'up' | 'down' | 'stable';
    description: string;
}

const CausalInferenceMap: React.FC = () => {
    const [scenario, setScenario] = useState<'IDLE' | 'EXPORT_BAN' | 'MSP_HIKE'>('IDLE');
    const [activeNodes, setActiveNodes] = useState<string[]>([]);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Node Positions (Percentage based)
    const nodes: NodeState[] = [
        { id: 'policy', label: 'Policy Node', x: 15, y: 50, value: 'neutral', description: 'Govt Intervention' },
        { id: 'supply', label: 'Domestic Supply', x: 45, y: 30, value: 'neutral', description: 'Market Volume' },
        { id: 'income', label: 'Farmer Income', x: 45, y: 70, value: 'neutral', description: 'Producer Revenue' },
        { id: 'price', label: 'Consumer Price', x: 70, y: 30, value: 'neutral', description: 'Inflation Index' },
        { id: 'sentiment', label: 'Public Sentiment', x: 85, y: 60, value: 'neutral', description: 'Political Stability' },
    ];

    useEffect(() => {
        if (scenario === 'IDLE') {
            setActiveNodes([]);
            return;
        }

        const sequence = [
            ['policy'],
            ['supply', 'income'],
            ['price'],
            ['sentiment']
        ];

        let accumulatedDelay = 0;
        setActiveNodes([]);

        sequence.forEach((batch, i) => {
            setTimeout(() => {
                setActiveNodes(prev => [...prev, ...batch]);
            }, accumulatedDelay);
            accumulatedDelay += 800;
        });

    }, [scenario]);

    const getNodeStatus = (id: string) => {
        if (!activeNodes.includes(id)) return { color: 'border-slate-300 dark:border-neutral-800 text-slate-400 dark:text-neutral-600', bg: 'bg-slate-100 dark:bg-neutral-900', icon: <Activity size={14} /> };

        if (scenario === 'EXPORT_BAN') {
            switch (id) {
                case 'policy': return { color: 'border-red-500 text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', icon: <AlertTriangle size={14} />, val: 'RESTRICTIVE' };
                case 'supply': return { color: 'border-blue-500 text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: <TrendingUp size={14} />, val: 'SURPLUS' };
                case 'income': return { color: 'border-red-500 text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', icon: <TrendingDown size={14} />, val: 'CRASH' };
                case 'price': return { color: 'border-green-500 text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', icon: <TrendingDown size={14} />, val: 'DROPS' };
                case 'sentiment': return { color: 'border-amber-500 text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', icon: <AlertTriangle size={14} />, val: 'VOLATILE' };
            }
        }
        if (scenario === 'MSP_HIKE') {
            switch (id) {
                case 'policy': return { color: 'border-blue-500 text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: <CheckCircle size={14} />, val: 'SUPPORTIVE' };
                case 'supply': return { color: 'border-slate-400 dark:border-neutral-500 text-slate-500 dark:text-neutral-400', bg: 'bg-slate-50 dark:bg-neutral-900/20', icon: <Activity size={14} />, val: 'STABLE' };
                case 'income': return { color: 'border-green-500 text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', icon: <TrendingUp size={14} />, val: 'RISES' };
                case 'price': return { color: 'border-amber-500 text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', icon: <TrendingUp size={14} />, val: 'INFLATION' };
                case 'sentiment': return { color: 'border-blue-500 text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: <TrendingUp size={14} />, val: 'POSITIVE' };
            }
        }
        return { color: 'border-slate-400 dark:border-neutral-700 text-slate-500 dark:text-neutral-300', bg: 'bg-slate-100 dark:bg-neutral-900', icon: <Activity size={14} /> };
    };

    return (
        <div className="w-full h-full bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 relative overflow-hidden flex flex-col md:flex-row transition-colors duration-500">
            
            {/* Control Panel */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-neutral-800 p-4 flex flex-col justify-between z-10 bg-white/90 dark:bg-neutral-950/90 backdrop-blur shrink-0 overflow-y-auto">
                <div>
                    <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-neutral-500">
                        <Network size={16} />
                        <span className="text-xs font-mono uppercase tracking-widest">Causal Graph</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Policy Simulator</h3>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400 mb-6 leading-relaxed">
                        Inject shocks to observe 2nd/3rd order propagation.
                    </p>

                    <div className="space-y-3">
                        <div className="text-[9px] text-slate-500 dark:text-neutral-600 uppercase tracking-widest">Intervention Type</div>
                        
                        <button 
                            onClick={() => setScenario('EXPORT_BAN')}
                            className={`w-full p-3 border text-left transition-all group rounded-sm ${scenario === 'EXPORT_BAN' ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-slate-200 dark:border-neutral-800 hover:border-slate-400 dark:hover:border-neutral-600 bg-slate-50 dark:bg-neutral-900'}`}
                        >
                            <div className={`text-xs font-bold mb-1 ${scenario === 'EXPORT_BAN' ? 'text-red-500' : 'text-slate-600 dark:text-neutral-300'}`}>Export Ban (Sudden)</div>
                            <div className="text-[9px] text-slate-500 dark:text-neutral-500 group-hover:text-slate-600 dark:group-hover:text-neutral-400 leading-tight">Prioritize domestic stock over trade.</div>
                        </button>

                        <button 
                            onClick={() => setScenario('MSP_HIKE')}
                            className={`w-full p-3 border text-left transition-all group rounded-sm ${scenario === 'MSP_HIKE' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-slate-200 dark:border-neutral-800 hover:border-slate-400 dark:hover:border-neutral-600 bg-slate-50 dark:bg-neutral-900'}`}
                        >
                            <div className={`text-xs font-bold mb-1 ${scenario === 'MSP_HIKE' ? 'text-blue-500' : 'text-slate-600 dark:text-neutral-300'}`}>MSP Hike (+15%)</div>
                            <div className="text-[9px] text-slate-500 dark:text-neutral-500 group-hover:text-slate-600 dark:group-hover:text-neutral-400 leading-tight">Increase government procurement price.</div>
                        </button>
                    </div>
                </div>

                <button 
                    onClick={() => setScenario('IDLE')}
                    className="mt-4 py-2 text-[10px] text-slate-500 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest flex items-center gap-2 border border-transparent hover:border-slate-200 dark:hover:border-neutral-800 justify-center rounded-sm transition-all"
                >
                    <Activity size={12} /> Reset System
                </button>
            </div>

            {/* Graph Canvas */}
            <div className="flex-1 relative bg-slate-50 dark:bg-black min-h-0 transition-colors duration-500">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Edges (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill={isDark ? "#333" : "#cbd5e1"} />
                        </marker>
                    </defs>
                    
                    {[
                        ['policy', 'supply'],
                        ['policy', 'income'],
                        ['supply', 'price'],
                        ['income', 'sentiment'],
                        ['price', 'sentiment']
                    ].map(([startId, endId], i) => {
                        const start = nodes.find(n => n.id === startId)!;
                        const end = nodes.find(n => n.id === endId)!;
                        const isActive = activeNodes.includes(startId) && activeNodes.includes(endId);

                        return (
                            <g key={i}>
                                <line 
                                    x1={`${start.x}%`} y1={`${start.y}%`} 
                                    x2={`${end.x}%`} y2={`${end.y}%`} 
                                    stroke={isDark ? "#222" : "#e2e8f0"} strokeWidth="2" 
                                />
                                {isActive && (
                                    <motion.line
                                        x1={`${start.x}%`} y1={`${start.y}%`} 
                                        x2={`${end.x}%`} y2={`${end.y}%`} 
                                        stroke={scenario === 'EXPORT_BAN' ? '#ef4444' : '#3b82f6'} 
                                        strokeWidth="2"
                                        strokeDasharray="5 5"
                                        initial={{ strokeDashoffset: 20 }}
                                        animate={{ strokeDashoffset: 0 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Nodes */}
                {nodes.map((node) => {
                    const status = getNodeStatus(node.id);
                    const isActive = activeNodes.includes(node.id);

                    return (
                        <div 
                            key={node.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 w-28"
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                            <motion.div 
                                animate={{ scale: isActive ? 1.1 : 1 }}
                                className={`w-10 h-10 rounded-full border-2 bg-white dark:bg-neutral-950 flex items-center justify-center shadow-lg transition-all duration-500 ${status.color} ${status.bg} ${isActive ? 'shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]' : ''}`}
                            >
                                {status.icon}
                            </motion.div>
                            
                            <div className="mt-2 text-center bg-white/80 dark:bg-black/80 backdrop-blur px-2 py-1.5 border border-slate-200 dark:border-neutral-800 rounded w-full">
                                <div className={`text-[9px] font-bold uppercase mb-0.5 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-neutral-500'}`}>{node.label}</div>
                                {isActive && status.val && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-[8px] font-mono font-bold px-1 rounded inline-block ${status.color.split(' ')[0]} border text-slate-800 dark:text-white mt-1`}
                                    >
                                        {status.val}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default CausalInferenceMap;
