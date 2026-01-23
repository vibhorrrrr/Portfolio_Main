
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermTooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
  className?: string;
}

const TermTooltip: React.FC<TermTooltipProps> = ({ term, definition, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className={`relative inline-block border-b border-dashed border-slate-400 dark:border-neutral-500 cursor-help transition-colors hover:border-blue-500 dark:hover:border-neural ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || term}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-sm shadow-xl z-50 pointer-events-none text-left"
          >
            <div className="text-[10px] font-bold text-slate-900 dark:text-white mb-1 font-mono uppercase tracking-wider">{term}</div>
            <div className="text-[10px] text-slate-600 dark:text-neutral-400 leading-relaxed font-sans">{definition}</div>
            
            {/* Tiny arrow */}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-neutral-900 border-b border-r border-slate-200 dark:border-neutral-700 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default TermTooltip;
