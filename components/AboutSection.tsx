
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Globe, MapPin, Zap } from 'lucide-react';

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
                        {/* Holographic Wireframe Placeholder */}
                        <div className="h-64 bg-slate-100 dark:bg-black border border-slate-100 dark:border-neutral-800 relative overflow-hidden flex items-center justify-center group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50"></div>
                            
                            {/* Animated Abstract Shape */}
                            <div className="relative w-32 h-32">
                                <motion.div 
                                    className="absolute inset-0 border border-blue-500 dark:border-neural opacity-30 rounded-full"
                                    animate={{ rotateX: 180, rotateY: 180 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div 
                                    className="absolute inset-2 border border-purple-500 opacity-30 rounded-full"
                                    animate={{ rotateX: -180, rotateY: 90 }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div 
                                    className="absolute inset-8 border border-amber-500 dark:border-alert opacity-30"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-blue-600 dark:bg-white rounded-full animate-pulse shadow-[0_0_15px_currentColor]" />
                                </div>
                            </div>

                            {/* Corner Markers */}
                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-slate-400 dark:border-neutral-600"></div>
                            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-slate-400 dark:border-neutral-600"></div>
                            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-slate-400 dark:border-neutral-600"></div>
                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-slate-400 dark:border-neutral-600"></div>
                        </div>

                        {/* ID Details */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">Vibhor Joshi</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
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
