import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <button 
      onClick={toggle}
      className="fixed top-6 right-6 z-50 p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
            initial={false}
            animate={{ y: isDark ? 20 : 0, opacity: isDark ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-amber-500"
        >
             <Sun size={18} />
        </motion.div>
        
        <motion.div
            initial={false}
            animate={{ y: isDark ? 0 : -20, opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-neural"
        >
             <Moon size={18} />
        </motion.div>
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap font-mono">
        {isDark ? 'Switch to Research Mode' : 'Switch to System Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;