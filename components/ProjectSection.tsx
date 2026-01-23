
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SystemProject } from '../types';
import { Plus, Command, Github, FileText } from 'lucide-react';
import DecryptedText from './DecryptedText';
import TermTooltip from './TermTooltip';

interface ProjectSectionProps {
  project: SystemProject;
  children: ReactNode;
  isActive: boolean;
  onOpenDeepDive: () => void;
}

const GLOSSARY: Record<string, string> = {
  "Monte Carlo": "Algorithms relying on repeated random sampling to obtain numerical results, useful for simulating systems with many coupled degrees of freedom.",
  "MCTS": "Monte Carlo Tree Search: A heuristic search algorithm used for decision processes, notably in AI like AlphaGo.",
  "P10/P50/P90": "Probability thresholds representing pessimistic (P10), median (P50), and optimistic (P90) outcomes in a distribution.",
  "RAG": "Retrieval-Augmented Generation: Optimizing LLM output by referencing an external authoritative knowledge base before generating a response.",
  "Stochastic": "Systems determined by random probability distributions, which can be analyzed statistically but not predicted precisely.",
  "Difference-in-Differences": "A statistical technique calculating the effect of a treatment by comparing the average change over time in the treatment group vs. control group.",
  "Synthetic Controls": "A method to evaluate intervention effects by constructing a weighted combination of control units to approximate the counterfactual.",
  "Agent-Based": "Simulations modeling the simultaneous operations and interactions of multiple autonomous agents to assess system-level effects.",
  "Gradient Boosting": "A machine learning technique producing a prediction model in the form of an ensemble of weak prediction models, typically decision trees.",
  "System Dynamics": "An approach to understanding the nonlinear behaviour of complex systems over time using stocks, flows, internal feedback loops, and time delays.",
  "Prompt-Based Routing": "A technique to dynamically direct queries to the most appropriate model (e.g., small vs large) based on input complexity.",
  "Seq2Seq": "Sequence-to-Sequence models (like T5/BART) that map an input sequence (e.g., text) to an output sequence, fundamental for translation and QA.",
  "Transformer": "A deep learning architecture that relies on self-attention mechanisms, weighing the significance of each part of the input data."
};

const processText = (text: string) => {
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length); // Match longest terms first
  const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    if (GLOSSARY[part]) {
      return (
        <TermTooltip key={i} term={part} definition={GLOSSARY[part]} className="border-slate-300 dark:border-neutral-600">
          {part}
        </TermTooltip>
      );
    }
    return part;
  });
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, children, isActive, onOpenDeepDive }) => {
  // Determine if this project requires the full-width stacked layout
  const isStackedLayout = ['second-order', 'f1-strategy', 'counterfactual-lab', 'agri-policy', 'seq2seq'].includes(project.id);

  return (
    <section id={project.id} className="min-h-screen w-full flex items-center justify-center py-20 px-4 md:px-12 border-b border-slate-200 dark:border-neutral-900/50">
      <div className={`w-full max-w-6xl grid grid-cols-1 ${isStackedLayout ? 'gap-16' : 'lg:grid-cols-2 gap-12 lg:gap-20'} items-center`}>
        
        {/* Text Content */}
        <motion.div 
            className={`space-y-8 ${isStackedLayout ? 'w-full max-w-4xl' : 'order-2 lg:order-1'}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
                <motion.div 
                    animate={{ width: isActive ? 24 : 0, opacity: isActive ? 1 : 0 }}
                    className="h-[2px] bg-blue-600 dark:bg-neural"
                />
                <span className={`font-mono text-xs transition-colors duration-500 ${isActive ? 'text-blue-600 dark:text-neural' : 'text-slate-400 dark:text-neutral-600'}`}>
                    0x{project.id.toUpperCase().substring(0,4)}
                </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight min-h-[3.5rem] leading-tight py-2">
                <DecryptedText text={project.title} animateOnHover={true} speed={60} />
            </h2>
            <p className="text-lg text-slate-600 dark:text-neutral-400 italic font-serif border-l-2 border-amber-500 pl-4 py-1">
              "{project.philosophy}"
            </p>
          </div>

          <p className={`text-slate-600 dark:text-neutral-400 leading-relaxed ${isStackedLayout ? 'max-w-3xl' : 'max-w-lg'}`}>
            {processText(project.description)}
          </p>

          <div className="space-y-6">
             <div className="flex flex-wrap gap-2">
                {project.capabilities.map(cap => (
                    <span key={cap} className="px-3 py-1 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-neutral-300 font-mono">
                        {cap}
                    </span>
                ))}
             </div>
             
             <div className="flex flex-wrap gap-6 items-center pt-2">
                 <button 
                    onClick={onOpenDeepDive}
                    className="group flex items-center gap-3 text-sm text-slate-800 dark:text-white font-mono uppercase tracking-wider hover:text-blue-600 dark:hover:text-neural transition-colors"
                 >
                    <div className="p-1 border border-slate-300 dark:border-neutral-700 rounded group-hover:border-blue-600 dark:group-hover:border-neural transition-colors">
                        <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                    </div>
                    <span>Initialize Deep Dive</span>
                    {isActive && (
                        <span className="hidden lg:flex items-center gap-1 text-[10px] text-slate-400 dark:text-neutral-600 ml-2 opacity-50">
                            <Command size={10} /> 
                            <span>ENTER</span>
                        </span>
                    )}
                 </button>

                 {project.repoUrl && (
                    <a 
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-sm text-slate-800 dark:text-white font-mono uppercase tracking-wider hover:text-blue-600 dark:hover:text-neural transition-colors"
                    >
                         <div className="p-1 border border-slate-300 dark:border-neutral-700 rounded group-hover:border-blue-600 dark:group-hover:border-neural transition-colors">
                            <Github size={14} />
                        </div>
                        <span>Source Code</span>
                    </a>
                 )}

                 {project.paperUrl && (
                    <a 
                        href={project.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-sm text-slate-800 dark:text-white font-mono uppercase tracking-wider hover:text-blue-600 dark:hover:text-neural transition-colors"
                    >
                         <div className="p-1 border border-slate-300 dark:border-neutral-700 rounded group-hover:border-blue-600 dark:group-hover:border-neural transition-colors">
                            <FileText size={14} />
                        </div>
                        <span>Read Paper</span>
                    </a>
                 )}
             </div>
          </div>
        </motion.div>

        {/* Interactive Module */}
        <motion.div 
            className={`${isStackedLayout ? 'w-full h-[500px] lg:h-[650px]' : 'order-1 lg:order-2 h-[400px] lg:h-[500px] w-full'} relative group`}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
            {/* Technical Corner Decorations */}
            <div className={`absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 transition-all duration-700 ${isActive ? 'border-blue-600 dark:border-neural opacity-100' : 'border-slate-300 dark:border-neutral-700 opacity-30'}`} />
            <div className={`absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 transition-all duration-700 ${isActive ? 'border-blue-600 dark:border-neural opacity-100' : 'border-slate-300 dark:border-neutral-700 opacity-30'}`} />
            <div className={`absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 transition-all duration-700 ${isActive ? 'border-blue-600 dark:border-neural opacity-100' : 'border-slate-300 dark:border-neutral-700 opacity-30'}`} />
            <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 transition-all duration-700 ${isActive ? 'border-blue-600 dark:border-neural opacity-100' : 'border-slate-300 dark:border-neutral-700 opacity-30'}`} />

            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-neural dark:to-purple-600 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative w-full h-full bg-black border border-neutral-800 shadow-2xl overflow-hidden">
                 {/* Header of Interface */}
                 <div className="h-8 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-950">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        {isActive && <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />}
                        <div className="text-[10px] font-mono text-neutral-600 uppercase">Interactive System Preview</div>
                    </div>
                 </div>
                 {/* The Interactive Component */}
                 <div className="w-full h-[calc(100%-2rem)]">
                    {children}
                 </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectSection;
