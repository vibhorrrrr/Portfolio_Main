
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_TEXT } from '../constants';
import { ArrowDown, Cpu, Network, Box, Terminal, ChevronRight } from 'lucide-react';
import DecryptedText from './DecryptedText';

interface HeroProps {
  onEnter: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSystemEntry = () => {
    setIsNavigating(true);
    // Delay to allow animation to play
    setTimeout(() => {
        onEnter(); // Unlock body scroll
        
        // Wait for DOM update after unlock before scrolling
        setTimeout(() => {
            const el = document.getElementById('second-order');
            if (el) {
                const offset = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
        
        setTimeout(() => setIsNavigating(false), 1000);
    }, 800);
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-neural/5 rounded-full blur-3xl mix-blend-screen animate-pulse" 
        />
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl mix-blend-screen" 
        />
      </div>

      <div className="z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          <p className="font-mono text-blue-600 dark:text-neural text-xs tracking-[0.3em] uppercase opacity-80">
            System Core • Online
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="mb-6"
        >
            <h2 className="text-lg md:text-xl font-mono text-slate-500 dark:text-neutral-500 tracking-[0.4em] uppercase">
                Vibhor Joshi
            </h2>
        </motion.div>

        <motion.div 
          className="mb-10 min-h-[120px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                <DecryptedText text={HERO_TEXT.headline} speed={50} />
            </h1>
        </motion.div>

        <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-600 dark:text-neutral-400 text-sm font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
        >
            <div className="flex items-center gap-2">
                <Box size={14} className="text-amber-500 dark:text-alert" />
                <span className="font-bold text-slate-800 dark:text-white">Simulation Engineer</span>
            </div>
            <span className="hidden md:inline text-neutral-700 opacity-50">|</span>
            <div className="flex items-center gap-2">
                <Cpu size={14} className="text-blue-500 dark:text-neural" />
                <span>AI Architect</span>
            </div>
            <span className="hidden md:inline text-neutral-700 opacity-50">|</span>
            <div className="flex items-center gap-2">
                <Network size={14} className="text-purple-500" />
                <span>Computational Research</span>
            </div>
        </motion.div>

        <motion.div 
            className="mt-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 3 }}
        >
            <div className="flex gap-8 items-center">
                {/* Interactive Enter Systems Button */}
                <button 
                    onClick={handleSystemEntry}
                    disabled={isNavigating}
                    className={`
                        relative px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] border transition-all duration-300 group overflow-hidden
                        ${isNavigating 
                            ? 'border-green-500 text-green-500 bg-green-500/10' 
                            : 'border-slate-300 dark:border-neutral-700 text-slate-500 dark:text-neutral-500 hover:border-blue-600 dark:hover:border-neural hover:text-blue-600 dark:hover:text-neural'
                        }
                    `}
                >
                    <div className="relative z-10 flex items-center gap-2">
                        {isNavigating ? (
                            <>
                                <Terminal size={14} className="animate-pulse" />
                                <span className="animate-pulse">ACCESS GRANTED</span>
                            </>
                        ) : (
                            <>
                                <span>ENTER SYSTEMS</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </div>
                    
                    {/* Background Fill Animation */}
                    <div className={`absolute inset-0 bg-blue-600/5 dark:bg-neural/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out ${isNavigating ? 'hidden' : 'block'}`} />
                </button>

                {/* Secondary Link */}
                <button 
                    className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-500 relative group"
                    onClick={() => {
                        onEnter(); // Also unlock if user clicks this
                        setTimeout(() => {
                            const el = document.getElementById('research');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }}
                >
                    VIEW RESEARCH
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-600 dark:bg-neural group-hover:w-full transition-all duration-500 ease-out" />
                </button>
            </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-neutral-700 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 4, repeat: Infinity }}
      >
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

export default Hero;
