import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, GitCommit, ArrowRight, CheckCircle2 } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const workHistory = [
    {
      role: "AI Research Engineer",
      org: "Predixen.ai",
      location: "Remote",
      period: "2025.12 — Present",
      description: "Engineered the core architecture of a Stochastic Decision Support System, designed to model complex, non-linear market dynamics. Collaborated directly with technical leadership (Senior Researcher from Google DeepMind) to translate theoretical concepts from Game Theory and Causal Inference into a scalable, production-grade simulation engine.",
      achievements: [
        "Causal Graph Architecture: Implemented Directed Acyclic Graphs (DAGs) to explicitly model cause-and-effect relationships, reducing LLM hallucinations.",
        "Stochastic Search Logic: Designed custom Monte Carlo Tree Search (MCTS) algorithms to navigate high-dimensional state spaces.",
        "Agentic Workflow Design: Developed modular Agent-Based Modeling (ABM) systems using LLMs and graph orchestration.",
        "Probabilistic Risk Modeling: Engineered statistical modules to compute confidence intervals (P10/P50/P90) and survival distributions.",
        "Computational Optimization: Refactored the primary simulation loop to optimize memory management and concurrency."
      ],
      tags: ["Causal Inference", "Monte Carlo", "LLMs", "Agentic Workflows", "NumPy"],
      highlight: "Stochastic Decision System"
    },
    {
      role: "Data Analyst & ML Engineer",
      org: "Spedite",
      location: "Nagpur, India",
      period: "2023.10 — 2024.03",
      description: "Deployed predictive logic for logistics optimization. Engineered stochastic models utilizing Gradient Boosting to minimize entropy in delivery cost estimation. Optimized hyperparameters to handle variable traffic and efficiency constraints.",
      tags: ["Predictive Modeling", "Gradient Boosting", "Python"],
      highlight: "Reduced MAE by 15%"
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-neutral-900 relative overflow-hidden">
      
      {/* Background Tech Lines */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-5">
         <div className="absolute left-10 top-0 w-[1px] h-full bg-dashed border-l border-neutral-500"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-16">
            <div className="w-2 h-2 bg-amber-500 dark:bg-alert rounded-full animate-pulse"></div>
            <h2 className="text-sm font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-[0.2em]">
                System Log // Operational History
            </h2>
        </div>

        <div className="space-y-12">
            {workHistory.map((item, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                    className="group"
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Time Column */}
                        <div className="md:w-1/4 flex flex-col justify-start pt-2 border-l-2 border-slate-200 dark:border-neutral-800 pl-6 relative">
                             <motion.div 
                                className={`absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-slate-100 dark:bg-black border-2 ${index === 0 ? 'border-amber-500 dark:border-alert' : 'border-blue-600 dark:border-neural'}`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                             />
                             <span className={`font-mono text-xs font-bold mb-1 ${index === 0 ? 'text-amber-500 dark:text-alert' : 'text-blue-600 dark:text-neural'}`}>
                                {item.period}
                             </span>
                             <span className="text-xs text-slate-500 dark:text-neutral-600 uppercase tracking-wider">
                                {item.location}
                             </span>
                        </div>

                        {/* Content Card */}
                        <div className="md:w-3/4">
                            <div className="p-6 border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:border-blue-500/50 dark:hover:border-neural/50 transition-all duration-300 relative overflow-hidden group-hover:shadow-2xl dark:group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                
                                {/* Hover Effect Scanline */}
                                <div className="absolute top-0 left-0 w-[2px] h-full bg-blue-500 dark:bg-neural opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">{item.role}</h3>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400 font-bold mt-1">
                                            <Briefcase size={14} />
                                            <span>{item.org}</span>
                                        </div>
                                    </div>
                                    
                                    {item.highlight && (
                                        <div className="px-3 py-1 bg-blue-50 dark:bg-neural/10 border border-blue-100 dark:border-neural/20 rounded text-[10px] font-mono text-blue-700 dark:text-neural uppercase tracking-wide">
                                            Outcome: {item.highlight}
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed mb-6 border-l-2 border-slate-100 dark:border-neutral-800 pl-4">
                                    {item.description}
                                </p>

                                {item.achievements && (
                                    <div className="mb-6 space-y-2">
                                        {item.achievements.map((achievement, i) => (
                                            <div key={i} className="flex gap-3 text-xs text-slate-500 dark:text-neutral-400">
                                                <CheckCircle2 size={14} className="shrink-0 text-blue-500 dark:text-neural mt-0.5" />
                                                <span>{achievement}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-[10px] text-slate-600 dark:text-neutral-500 font-mono uppercase transition-colors hover:text-blue-600 dark:hover:text-neural hover:border-blue-200 dark:hover:border-neural/30">
                                            <GitCommit size={10} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;