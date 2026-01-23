
import React from 'react';
import { PROJECTS, SOCIAL_LINKS } from '../constants';
import { motion } from 'framer-motion';
import { Linkedin, Github, Gamepad2 } from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  onOpenGame: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate, onOpenGame }) => {
  return (
    <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col justify-center pl-8 z-40 pointer-events-none">
      <div className="pointer-events-auto flex flex-col h-full py-16">
          <div className="mb-auto">
            <div className="text-xs font-mono text-slate-500 dark:text-neutral-600 mb-8 tracking-widest uppercase border-b border-neutral-800 pb-2 inline-block">
            Vibhor Joshi [ARCHITECT]
            </div>
            <div className="space-y-6">
                {PROJECTS.map((project) => (
                <div 
                    key={project.id}
                    className="group relative cursor-pointer"
                    onClick={() => onNavigate(project.id)}
                >
                    <div className="flex items-center space-x-3">
                    <motion.div 
                        className={`h-[1px] bg-current transition-all duration-300 ${activeId === project.id ? 'w-8 bg-blue-600 dark:bg-neural' : 'w-2 bg-slate-300 dark:bg-neutral-700 group-hover:w-4 group-hover:bg-slate-500 dark:group-hover:bg-neutral-500'}`}
                    />
                    <span className={`text-sm font-mono transition-colors duration-300 ${activeId === project.id ? 'text-blue-600 dark:text-neural font-bold' : 'text-slate-500 dark:text-neutral-600 group-hover:text-slate-800 dark:group-hover:text-neutral-300'}`}>
                        {project.title}
                    </span>
                    </div>
                    
                    {/* Hover tooltip for philosophy */}
                    <div className="absolute left-full ml-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-64 pointer-events-none">
                        <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-3 text-xs text-slate-600 dark:text-neutral-400 shadow-xl backdrop-blur-sm">
                            {project.philosophy}
                        </div>
                    </div>
                </div>
                ))}
            </div>
          </div>

          {/* Social Links at Bottom */}
          <div className="flex items-center gap-4">
               <a 
                 href={SOCIAL_LINKS.linkedin} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-slate-400 dark:text-neutral-600 hover:text-blue-600 dark:hover:text-neural transition-colors"
                 aria-label="LinkedIn"
               >
                 <Linkedin size={20} />
               </a>
               <a 
                 href={SOCIAL_LINKS.github} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-slate-400 dark:text-neutral-600 hover:text-slate-800 dark:hover:text-white transition-colors"
                 aria-label="GitHub"
               >
                 <Github size={20} />
               </a>
               
               <div className="w-[1px] h-4 bg-slate-300 dark:bg-neutral-800"></div>

               <button
                 onClick={onOpenGame}
                 className="text-slate-400 dark:text-neutral-600 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                 aria-label="System Idle Protocol"
                 title="System Idle Protocol"
               >
                 <Gamepad2 size={20} />
               </button>
          </div>
      </div>
    </div>
  );
};

export default Sidebar;
