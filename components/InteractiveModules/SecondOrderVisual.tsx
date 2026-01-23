
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Settings, AlertTriangle, Lightbulb, Target, ExternalLink, Github } from 'lucide-react';
import TermTooltip from '../TermTooltip';

// --- Mock Data Generator (Smoothed) ---
const generateData = (burn: number, revenue: number) => {
    const data = [];
    let cashP50 = 1000000;
    
    const netBurn = burn - revenue;

    for (let i = 0; i <= 12; i++) {
        const divergence = i * 3500; // variance grows over time
        const volatility = Math.random() * 2000;
        
        data.push({
            month: i,
            p50: Math.max(0, cashP50),
            p10: Math.max(0, cashP50 - (divergence * 1.8) - volatility),
            p90: Math.max(0, cashP50 + (divergence * 2.2) + volatility),
        });

        cashP50 -= netBurn; 
    }
    return data;
};

const SecondOrderVisual: React.FC = () => {
    const [cash, setCash] = useState(1000000);
    const [burn, setBurn] = useState(50000);
    const [revenue, setRevenue] = useState(20000);
    const [cac, setCac] = useState(100);
    const [customers, setCustomers] = useState(500);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const data = generateData(burn, revenue);
    const finalMonth = data[12];
    
    const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

    // Colors adjusted for light/dark
    const colors = {
        bg: isDark ? '#050505' : '#ffffff',
        sidebarBg: isDark ? '#080808' : '#f8fafc',
        border: isDark ? '#262626' : '#e2e8f0',
        text: isDark ? '#ffffff' : '#0f172a',
        subText: isDark ? '#737373' : '#64748b',
        accent: isDark ? '#00f0ff' : '#0284c7',
        chartGrid: isDark ? '#1a1a1a' : '#e2e8f0',
        p10: '#ef4444',
        p50: '#3b82f6',
        p90: '#22c55e'
    };

    return (
        <div className="w-full h-full font-mono flex text-xs border relative transition-colors duration-500" style={{ backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }}>
            
            {/* Sidebar Controls - Flex Column */}
            <div className="w-64 shrink-0 border-r flex flex-col z-20 h-full overflow-hidden transition-colors duration-500" style={{ backgroundColor: colors.sidebarBg, borderColor: colors.border }}>
                <div className="p-6 shrink-0">
                    <div className="flex items-center gap-2" style={{ color: colors.accent }}>
                        <Settings size={14} className="animate-spin-slow" />
                        <span className="font-bold uppercase tracking-widest text-xs">Controls</span>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto px-6 space-y-5 scrollbar-hide">
                    <InputGroup label="Cash Balance" value={cash} onChange={setCash} prefix="$" isDark={isDark} />
                    <InputGroup label="Monthly Burn" value={burn} onChange={setBurn} prefix="$" isDark={isDark} />
                    <InputGroup label="Monthly Revenue" value={revenue} onChange={setRevenue} prefix="$" isDark={isDark} />
                    <InputGroup label="CAC" value={cac} onChange={setCac} prefix="$" isDark={isDark} />
                    <InputGroup label="Customers" value={customers} onChange={setCustomers} isDark={isDark} />
                </div>

                <div className="p-6 border-t shrink-0" style={{ borderColor: colors.border }}>
                     <InputGroup label="ARPU" value={40} readOnly prefix="$" isDark={isDark} />
                     <div className="text-[10px] mt-4 font-mono opacity-50 tracking-widest" style={{ color: colors.subText }}>0029 : 0389</div>
                </div>
            </div>

            {/* Main Dashboard - Flex Column */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
                {/* Header */}
                <div className="flex justify-between items-end p-6 pb-4 border-b shrink-0" style={{ borderColor: colors.border }}>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold tracking-tight font-sans leading-none" style={{ color: colors.accent }}>SecondOrder</h2>
                        <div className="flex items-center gap-4">
                            <a href="https://second-order-45sf.onrender.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider hover:opacity-80 transition-colors cursor-pointer z-50" style={{ color: colors.subText }}>
                                <ExternalLink size={10} /> Live System
                            </a>
                            <div className="w-[1px] h-3 bg-neutral-800"></div>
                            <a href="https://github.com/vibhorrrrr/SecondOrder" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider hover:opacity-80 transition-colors cursor-pointer z-50" style={{ color: colors.subText }}>
                                <Github size={10} /> Source Code
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider mb-1" style={{ color: colors.accent }}>
                         <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: colors.accent }} />
                         Simulation Active
                    </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col p-6 overflow-hidden">
                    
                    {/* KPI Row */}
                    <div className="grid grid-cols-4 gap-4 mb-4 shrink-0 h-20">
                        <Card 
                            title={<TermTooltip term="Survival Prob." definition="Likelihood of cash balance remaining > 0 over the 12-month horizon.">Survival Prob.</TermTooltip>}
                            value="100%" 
                            subValue="Stable" 
                            color={colors.text}
                            borderColor={colors.border}
                            subTextColor={colors.subText}
                            bg={colors.sidebarBg}
                        />
                        <Card 
                            title={<TermTooltip term="P50 Cash" definition="Median outcome; 50% of simulations ended above this value.">P50 Cash</TermTooltip>}
                            value={formatCurrency(finalMonth.p50)} 
                            subValue="Median" 
                            color={colors.text}
                            borderColor={colors.border}
                            subTextColor={colors.subText}
                            bg={colors.sidebarBg}
                        />
                        <Card 
                            title={<TermTooltip term="P10 Cash" definition="Pessimistic scenario; 90% of outcomes were better than this (Downside risk).">P10 Cash</TermTooltip>}
                            value={formatCurrency(finalMonth.p10)} 
                            subValue="Downside" 
                            color={colors.p10} 
                            borderColor={isDark ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.2)'}
                            subTextColor={colors.subText}
                            bg={colors.sidebarBg}
                        />
                        <Card 
                            title={<TermTooltip term="P90 Cash" definition="Optimistic scenario; only 10% of outcomes beat this (Upside potential).">P90 Cash</TermTooltip>}
                            value={formatCurrency(finalMonth.p90)} 
                            subValue="Upside" 
                            color={colors.p90} 
                            borderColor={isDark ? 'rgba(34,197,94,0.3)' : 'rgba(34,197,94,0.2)'}
                            subTextColor={colors.subText}
                            bg={colors.sidebarBg}
                        />
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 min-h-0 border rounded-sm p-4 relative mb-4 flex flex-col" style={{ borderColor: colors.border, backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }}>
                        <div className="flex justify-between items-start mb-2 shrink-0">
                             <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.subText }}>Cash Flow Projection (12 Mo)</div>
                             <div className="flex gap-4 text-[9px] font-bold uppercase tracking-wider">
                                 <div className="flex items-center gap-2" style={{ color: colors.p10 }}><div className="w-3 h-[2px]" style={{ backgroundColor: colors.p10 }}></div> P10</div>
                                 <div className="flex items-center gap-2" style={{ color: colors.p50 }}><div className="w-3 h-[2px]" style={{ backgroundColor: colors.p50 }}></div> P50</div>
                                 <div className="flex items-center gap-2" style={{ color: colors.p90 }}><div className="w-3 h-[2px]" style={{ backgroundColor: colors.p90 }}></div> P90</div>
                             </div>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGrid} vertical={true} />
                                    <XAxis 
                                        dataKey="month" 
                                        tick={{ fill: colors.subText, fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                                        axisLine={false} 
                                        tickLine={false} 
                                        dy={10} 
                                    />
                                    <YAxis 
                                        tick={{ fill: colors.subText, fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tickFormatter={(val) => `$${val/1000}k`} 
                                        width={40} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: isDark ? '#000' : '#fff', border: `1px solid ${colors.border}`, color: colors.text, fontSize: '11px', fontFamily: 'JetBrains Mono' }} 
                                        formatter={(val) => [formatCurrency(val as number), '']} 
                                        labelStyle={{ color: colors.subText, marginBottom: '4px' }} 
                                    />
                                    <Line type="monotone" dataKey="p10" stroke={colors.p10} strokeWidth={1.5} dot={false} activeDot={{r: 4, strokeWidth: 0}} />
                                    <Line type="monotone" dataKey="p50" stroke={colors.p50} strokeWidth={1.5} dot={false} activeDot={{r: 4, strokeWidth: 0}} />
                                    <Line type="monotone" dataKey="p90" stroke={colors.p90} strokeWidth={1.5} dot={false} activeDot={{r: 4, strokeWidth: 0}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Analysis Section */}
                    <div className="h-28 shrink-0 border rounded-sm p-4 relative overflow-hidden flex flex-col justify-center" style={{ borderColor: isDark ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)', backgroundColor: isDark ? 'rgba(6,78,59,0.05)' : 'rgba(22,163,74,0.05)' }}>
                        <div className={`absolute top-0 right-0 p-32 blur-[80px] rounded-full pointer-events-none ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'}`}></div>
                        
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                            <Lightbulb size={14} className="text-emerald-500" />
                            <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Strategic Analysis</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-8 relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-1 text-[#fbbf24] text-[10px] font-bold uppercase tracking-wider">
                                    <Target size={12} /> Recs
                                </div>
                                <ul className="space-y-1 text-[10px] leading-relaxed font-mono" style={{ color: colors.subText }}>
                                    <li className="flex gap-2 truncate"><span className="opacity-50">→</span> Optimize burn efficiency.</li>
                                    <li className="flex gap-2 truncate"><span className="opacity-50">→</span> Scale customer acquisition.</li>
                                </ul>
                            </div>
                            <div>
                                 <div className="flex items-center gap-2 mb-1 text-[#ef4444] text-[10px] font-bold uppercase tracking-wider">
                                    <AlertTriangle size={12} /> Risks
                                </div>
                                <ul className="space-y-1 text-[10px] leading-relaxed font-mono" style={{ color: colors.subText }}>
                                    <li className="flex gap-2 truncate"><span className="opacity-50">→</span> CAC drift indicates inflation.</li>
                                    <li className="flex gap-2 truncate"><span className="opacity-50">→</span> OpEx gradually increasing.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ label, value, onChange, readOnly, highlight, prefix, isDark }: any) => {
    const borderColor = isDark ? '#262626' : '#e2e8f0';
    const bgColor = isDark ? '#0a0a0a' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';
    
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest block" style={{ color: isDark ? '#737373' : '#64748b' }}>{label}</label>
            <div className={`flex items-center border rounded-sm px-3 py-2 focus-within:border-neutral-500 transition-all`} style={{ backgroundColor: bgColor, borderColor: highlight ? (isDark ? '#00f0ff' : '#0284c7') : borderColor }}>
                {prefix && <span className="mr-2 select-none font-mono text-xs" style={{ color: isDark ? '#737373' : '#94a3b8' }}>{prefix}</span>}
                <input 
                    type="number" 
                    value={value}
                    onChange={(e) => onChange && onChange(Number(e.target.value))}
                    readOnly={readOnly}
                    className="w-full bg-transparent outline-none font-mono text-xs"
                    style={{ color: readOnly ? (isDark ? '#737373' : '#94a3b8') : textColor }}
                />
            </div>
        </div>
    );
};

const Card = ({ title, value, subValue, color, borderColor, subTextColor, bg }: any) => (
    <div className="border p-3 rounded-sm flex flex-col justify-center h-full hover:brightness-110 transition-all relative overflow-hidden group" style={{ borderColor, backgroundColor: bg }}>
        <div className="text-[9px] uppercase font-bold tracking-widest relative z-10 mb-1" style={{ color: subTextColor }}>{title}</div>
        <div className="relative z-10">
            <div className="text-xl font-bold tracking-tighter font-mono" style={{ color }}>{value}</div>
            {subValue && <div className="text-[9px] font-medium" style={{ color: subTextColor }}>{subValue}</div>}
        </div>
    </div>
);

export default SecondOrderVisual;
