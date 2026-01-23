
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Database, Award } from 'lucide-react';

const EducationSection: React.FC = () => {
  const education = [
    {
      id: "IIIT-H",
      role: "Minors in Modern Machine Learning",
      org: "IIIT Hyderabad",
      period: "2023.08 — 2025.08",
      description: "Advanced research track specializing in Deep Neural Networks and Probabilistic Methods.",
      modules: [
        "Deep Learning", 
        "Computer Vision", 
        "Natural Language Processing", 
        "Speech Understanding", 
        "Probabilistic Graphical Models"
      ],
      status: "Grade A"
    },
    {
      id: "GHRCE",
      role: "B.Tech, Data Science",
      org: "G.H. Raisoni College of Engineering",
      period: "2022.10 — 2026.06",
      description: "Foundation in Big Data Computing and Next-Gen Database Management.",
      modules: [
        "Data Structures & Algorithms", 
        "Operating Systems", 
        "DBMS", 
        "Statistics & Probability", 
        "Big Data Analytics", 
        "Artificial Intelligence",
        "Cloud Computing"
      ],
      status: "CGPA: 8.57"
    }
  ];

  return (
    <section id="education" className="py-24 px-6 md:px-12 bg-slate-100 dark:bg-neutral-950/50 border-t border-slate-200 dark:border-neutral-900 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
             <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 dark:bg-neural rounded-sm animate-spin-slow"></div>
                <h2 className="text-sm font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-[0.2em]">
                    Knowledge Kernel // Training Data
                </h2>
            </div>
            <div className="hidden md:block h-[1px] w-32 bg-slate-300 dark:bg-neutral-800"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group"
                >
                    {/* Card Container */}
                    <div className="h-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-8 relative overflow-hidden transition-all duration-300 hover:border-blue-400 dark:hover:border-neural/50">
                        
                        {/* Background Code/Glitch Decoration */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                            <Database size={120} />
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6">
                            <div className={`text-[10px] font-mono uppercase px-2 py-1 border rounded transition-colors ${item.status.includes('Grade A') ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-900/10 dark:text-green-400' : 'border-slate-200 dark:border-neutral-700 text-slate-500 dark:text-neutral-400'}`}>
                                {item.status}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-neutral-800 flex items-center justify-center rounded mb-6 group-hover:scale-110 transition-transform duration-300">
                                <GraduationCap size={20} className="text-slate-700 dark:text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 pr-12 leading-tight">{item.role}</h3>
                            <div className="text-sm font-mono text-blue-600 dark:text-neural mb-1">{item.org}</div>
                            <div className="text-xs text-slate-400 dark:text-neutral-500 font-mono mb-6">{item.period}</div>

                            <p className="text-sm text-slate-600 dark:text-neutral-400 mb-8 leading-relaxed">
                                {item.description}
                            </p>

                            {/* Modules Grid */}
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-[10px] text-slate-400 dark:text-neutral-500 uppercase tracking-widest">
                                    <BookOpen size={10} />
                                    <span>Key Modules</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {item.modules.map(mod => (
                                        <span key={mod} className="text-[11px] px-2 py-1 bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-300 font-mono hover:border-blue-300 dark:hover:border-neural/50 transition-colors cursor-default">
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Decoration Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-neutral-800">
                             <div className="h-full bg-blue-600 dark:bg-neural w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
