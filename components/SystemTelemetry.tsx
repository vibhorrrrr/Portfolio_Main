import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Zap } from 'lucide-react';

const SystemTelemetry: React.FC = () => {
  const [metrics, setMetrics] = useState({
    cpu: 12,
    memory: 45,
    entropy: 0.02
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() - 0.5) * 15)),
        memory: Math.min(100, Math.max(30, prev.memory + (Math.random() - 0.5) * 5)),
        entropy: Math.max(0, prev.entropy + (Math.random() - 0.5) * 0.01)
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-40 hidden lg:flex flex-col gap-2 p-4 bg-neutral-950/90 dark:bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm rounded-sm font-mono shadow-xl">
      <div className="text-[10px] text-neutral-500 uppercase mb-2 tracking-wider flex items-center justify-between">
         <span>System Telemetry</span>
         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      
      <div className="flex items-center gap-3 text-xs">
         <Cpu size={12} className="text-blue-500 dark:text-neural" />
         <div className="w-16 text-neutral-400">COMPUTE</div>
         <div className="w-24 bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div 
                className="h-full bg-blue-500 dark:bg-neural transition-all duration-1000" 
                style={{ width: `${metrics.cpu}%` }} 
            />
         </div>
         <span className="text-white w-8 text-right">{metrics.cpu.toFixed(0)}%</span>
      </div>

      <div className="flex items-center gap-3 text-xs">
         <Zap size={12} className="text-amber-500 dark:text-alert" />
         <div className="w-16 text-neutral-400">MEMORY</div>
         <div className="w-24 bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div 
                className="h-full bg-amber-500 dark:bg-alert transition-all duration-1000" 
                style={{ width: `${metrics.memory}%` }} 
            />
         </div>
         <span className="text-white w-8 text-right">{metrics.memory.toFixed(0)}%</span>
      </div>

      <div className="flex items-center gap-3 text-xs">
         <Activity size={12} className="text-red-500 dark:text-critical" />
         <div className="w-16 text-neutral-400">ENTROPY</div>
         <span className="text-red-500 dark:text-critical font-bold">{metrics.entropy.toFixed(4)}</span>
      </div>
    </div>
  );
};

export default SystemTelemetry;