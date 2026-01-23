
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = [
    "Allocating CUDA tensors...",
    "Initializing neural environment...",
    "Calibrating physics engine...",
    "Mounting data pipelines...",
    "Authenticating: Vibhor Joshi...",
    "Identity Verified: Lead Architect",
    "Pre-caching Monte Carlo paths...",
    "System ready."
  ];

  useEffect(() => {
    // Log sequence
    let delay = 0;
    bootLogs.forEach((log, index) => {
      delay += Math.random() * 300 + 200;
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${log}`]);
        if (index === bootLogs.length - 1) {
          setTimeout(() => setStep(1), 800);
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [step, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-sm"
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div className="w-80 md:w-96">
        <div className="mb-4 flex justify-between text-neutral-500 text-xs uppercase tracking-widest">
          <span>Boot Sequence</span>
          <span>VJ.AI v2.4</span>
        </div>
        
        <div className="h-32 overflow-hidden border-l-2 border-neural/30 pl-4 relative">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${i === logs.length - 1 ? 'text-neural' : 'text-neutral-400'}`}
              >
                {log}
              </motion.div>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

        <motion.div 
          className="mt-6 h-1 w-full bg-neutral-900 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="h-full bg-neural"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BootSequence;
