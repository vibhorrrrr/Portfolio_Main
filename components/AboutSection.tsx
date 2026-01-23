
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Globe, MapPin, Zap, ScanFace, Fingerprint } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 border-t border-slate-200 dark:border-neutral-900 bg-slate-50 dark:bg-black overflow-hidden">
      
      {/* Background Grid & Scanner */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <motion.div 
            className="absolute left-0 w-full h-[2px] bg-blue-500 dark:bg-neural shadow-[0_0_20px_rgba(0,240,255,0.5)]"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] w-12 bg-slate-400 dark:bg-neutral-700"></div>
            <h2 className="text-sm font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-[0.2em]">
                System Operator // V.Joshi
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200 dark:bg-neutral-900"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* LEFT: Profile / ID Card */}
            <div className="lg:col-span-4">
                <div className="sticky top-32">
                    <div className="relative bg-white dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 p-1 backdrop-blur-sm">
                        
                        {/* HOLOGRAPHIC AVATAR CONTAINER */}
                        <div className="h-64 bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 relative overflow-hidden group flex items-center justify-center">
                            
                            {/* Inner Grid for Depth */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                            
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent opacity-50" />

                            {/* Central Rotating Elements */}
                            <div className="relative z-10 flex items-center justify-center w-full h-full">
                                {/* Outer Dashed Ring */}
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-40 h-40 border-2 border-dashed border-blue-400/20 dark:border-neural/20 rounded-full"
                                />
                                {/* Middle Dotted Ring (Counter-Rotate) */}
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-32 h-32 border border-blue-500/20 dark:border-neural/20 rounded-full opacity-70"
                                />
                                {/* Inner Solid Ring Pulse */}
                                <motion.div 
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute w-24 h-24 border border-blue-400/40 dark:border-neural/40 rounded-full"
                                />
                                
                                {/* Center Icon */}
                                <motion.div
                                    initial={{ opacity: 0.6 }}
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-blue-500/50 dark:text-neural/50"
                                >
                                    <ScanFace size={56} strokeWidth={1} />
                                </motion.div>

                                {/* Floating Data Points */}
                                <div className="absolute top-6 right-6 flex flex-col items-end gap-1 pointer-events-none">
                                     <span className="text-[8px] font-mono text-blue-400 dark:text-neural opacity-60">ID: VJ-9920</span>
                                     <span className="text-[8px] font-mono text-blue-400 dark:text-neural opacity-60">SEC: L4-ALPHA</span>
                                </div>
                                <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1 pointer-events-none">
                                     <span className="text-[8px] font-mono text-blue-400 dark:text-neural opacity-60">BIOMETRICS: LOCKED</span>
                                </div>
                            </div>

                            {/* Scanning Laser Line */}
                            <motion.div 
                                className="absolute left-0 w-full h-[2px] bg-blue-500/50 dark:bg-neural/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_rgba(0,240,255,0.5)] z-20"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* Tech Markers (Corners) */}
                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-blue-300 dark:border-neutral-700"></div>
                            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-blue-300 dark:border-neutral-700"></div>
                            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-blue-300 dark:border-neutral-700"></div>
                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-blue-300 dark:border-neutral-700"></div>

                            {/* Status Indicator inside frame */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 z-20">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                <span className="text-[9px] font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider">Uplink: Secure</span>
                            </div>
                        </div>

                        {/* ID Details */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">Vibhor Joshi</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-neural"></div>
                                    <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase">Simulation Architect</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-neutral-800">
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-400">
                                    <MapPin size={14} className="shrink-0" />
                                    <span>Remote / Global Node</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-400">
                                    <Globe size={14} className="shrink-0" />
                                    <span>English, Hindi</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-400">
                                    <Zap size={14} className="shrink-0 text-amber-500" />
                                    <span>Status: <span className="text-slate-900 dark:text-white font-bold">Deploying</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Manifesto & Capabilities */}
            <div className="lg:col-span-8 flex flex-col justify-center">
                
                {/* Manifesto */}
                <div className="mb-16">
                    <h4 className="text-xs font-mono text-blue-600 dark:text-neural uppercase mb-4 tracking-widest">
                        // Mission Protocol
                    </h4>
                    <p className="text-2xl md:text-4xl font-light leading-tight text-slate-800 dark:text-off-white font-sans">
                        <span className="text-slate-300 dark:text-neutral-600">I do not just analyze data;</span> I architect simulations that reason. <span className="text-slate-300 dark:text-neutral-600">My work bridges the gap between static datasets and</span> dynamic real-world entropy.
                    </p>
                    <p className="mt-8 text-lg text-slate-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                        By engineering high-fidelity predictive models and stochastic simulations, I enable systems to reason through uncertainty. From logistical chaos to social dynamics, I build digital twins that optimize for survival and signal in a noisy world.
                    </p>
                </div>

                {/* Capability Matrix - Symmetrically Balanced */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CapabilityBlock 
                        icon={Terminal} 
                        title="Computational Core" 
                        skills={[
                            { name: "Python / PyTorch", level: 95 },
                            { name: "C++ / Java / C", level: 85 },
                            { name: "SQL / Vector DB", level: 90 }
                        ]} 
                    />
                    <CapabilityBlock 
                        icon={Cpu} 
                        title="Simulation Stack" 
                        skills={[
                            { name: "Stochastic Models", level: 90 },
                            { name: "Multi-Agent Systems", level: 85 },
                            { name: "Monte Carlo Logic", level: 85 }
                        ]} 
                    />
                    <CapabilityBlock 
                        icon={Shield} 
                        title="Reliability Ops" 
                        skills={[
                            { name: "Causal Inference", level: 90 },
                            { name: "Model Governance", level: 85 },
                            { name: "System Dynamics", level: 80 }
                        ]} 
                    />
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for Skill Bars
const CapabilityBlock = ({ icon: Icon, title, skills }: { icon: any, title: string, skills: {name: string, level: number}[] }) => (
    <div className="p-6 border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/20 hover:border-blue-500 dark:hover:border-neural transition-colors group flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 dark:bg-neutral-800 rounded group-hover:text-blue-600 dark:group-hover:text-neural transition-colors">
                <Icon size={18} />
            </div>
            <h5 className="font-mono text-xs font-bold uppercase text-slate-700 dark:text-neutral-300 tracking-wider whitespace-nowrap">{title}</h5>
        </div>
        
        <div className="space-y-5 flex-1">
            {skills.map((skill) => (
                <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-neutral-400 font-medium">{skill.name}</span>
                        <span className="font-mono text-slate-400 dark:text-neutral-600">{skill.level}%</span>
                    </div>
                    {/* Frequency Visualizer Bar */}
                    <div className="h-1 flex gap-[2px]">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div 
                                key={i}
                                className={`flex-1 transition-colors duration-500 ${
                                    (i * 5) < skill.level 
                                        ? 'bg-blue-600 dark:bg-neural opacity-80' 
                                        : 'bg-slate-200 dark:bg-neutral-800'
                                }`}
                                style={{
                                    height: (i * 5) < skill.level ? '100%' : '20%' // Unfilled parts look like dots
                                }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default AboutSection;
