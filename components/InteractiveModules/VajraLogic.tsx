
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Scale, CheckCircle2, Database, ScanLine, BrainCircuit, Gavel } from 'lucide-react';

const VajraLogic: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'ANALYZING' | 'MAPPING' | 'REASONING' | 'RESULT'>('IDLE');
  const [scannedSection, setScannedSection] = useState('Initializing...');
  const [similarity, setSimilarity] = useState(0);

  const legalSections = [
    'IPC Section 302: Punishment for murder', 
    'CrPC Section 41: When police may arrest without warrant', 
    'BNS Section 103: Punishment for murder (New)', 
    'IEA Section 25: Confession to police officer', 
    'IPC Section 420: Cheating and dishonestly inducing delivery', 
    'CrPC Section 144: Power to issue order in urgent cases', 
    'BNS Section 69: Sexual intercourse by employing deceitful means', 
    'IT Act 66A: Punishment for sending offensive messages'
  ];

  const handleSimulate = () => {
    if (!query) return;
    setStatus('ANALYZING');
    setSimilarity(0);
    setTimeout(() => setStatus('MAPPING'), 1500);
    setTimeout(() => setStatus('REASONING'), 4500);
    setTimeout(() => setStatus('RESULT'), 7000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'MAPPING') {
      let counter = 0;
      interval = setInterval(() => {
        setScannedSection(legalSections[counter % legalSections.length]);
        setSimilarity(Math.floor(Math.random() * 60) + 30);
        counter++;
      }, 150);
    } else if (status === 'REASONING') {
        setScannedSection('CrPC Section 41');
        setSimilarity(98);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col p-6 bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-sm relative overflow-hidden font-mono text-sm transition-colors duration-500">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Ambient Neural Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto h-full flex flex-col">
        
        {/* Input Simulation */}
        <div className="space-y-2 shrink-0 mb-8">
            <label className="text-[10px] text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                <Gavel size={12} /> VAJRA Legal Intelligence Core
            </label>
            <div className="flex gap-0 border border-slate-300 dark:border-neutral-700 rounded-sm overflow-hidden transition-all focus-within:border-amber-500/50 focus-within:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <div className="bg-slate-100 dark:bg-neutral-900 px-3 py-3 flex items-center justify-center border-r border-slate-200 dark:border-neutral-800">
                    <BrainCircuit size={16} className="text-slate-500 dark:text-neutral-500" />
                </div>
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describe a legal situation (e.g., 'Police arrested me without a warrant')"
                    className="w-full bg-white dark:bg-neutral-900 p-3 text-slate-800 dark:text-neutral-200 focus:outline-none text-xs font-mono"
                />
                <button 
                    onClick={handleSimulate}
                    disabled={status !== 'IDLE' && status !== 'RESULT'}
                    className="bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-white px-6 border-l border-slate-300 dark:border-neutral-700 transition-colors disabled:opacity-50 font-bold uppercase text-[10px] tracking-wider"
                >
                    {status === 'IDLE' || status === 'RESULT' ? 'Consult' : 'Processing'}
                </button>
            </div>
        </div>

        {/* Dynamic Visual Pipeline */}
        <div className="flex-1 flex flex-col relative">
            
            {/* Pipeline Steps Row */}
            <div className="flex justify-between items-start mb-8 relative z-10 px-4">
                {/* Connecting Line Background */}
                <div className="absolute top-5 left-4 right-4 h-[2px] bg-slate-200 dark:bg-neutral-800 -z-10" />

                <PipelineNode 
                    icon={FileText} 
                    label="Intent Parsing" 
                    active={status !== 'IDLE'} 
                    status={status === 'ANALYZING' ? 'processing' : status !== 'IDLE' ? 'done' : 'idle'}
                />
                <PipelineNode 
                    icon={Database} 
                    label="Vector Search" 
                    active={['MAPPING', 'REASONING', 'RESULT'].includes(status)}
                    status={status === 'MAPPING' ? 'processing' : ['REASONING', 'RESULT'].includes(status) ? 'done' : 'idle'}
                />
                <PipelineNode 
                    icon={Scale} 
                    label="Legal Reasoning" 
                    active={['REASONING', 'RESULT'].includes(status)}
                    status={status === 'REASONING' ? 'processing' : status === 'RESULT' ? 'done' : 'idle'}
                />
                <PipelineNode 
                    icon={CheckCircle2} 
                    label="Citation" 
                    active={status === 'RESULT'} 
                    status={status === 'RESULT' ? 'done' : 'idle'}
                    final
                />
            </div>

            {/* Central Visualization Area */}
            <div className="flex-1 bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 rounded-sm relative overflow-hidden flex items-center justify-center p-6 min-h-[160px]">
                {/* Scanline Effect */}
                {(status === 'MAPPING' || status === 'REASONING') && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-20 animate-[scanline_2s_linear_infinite]" />
                )}

                <AnimatePresence mode="wait">
                    {status === 'IDLE' && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-3 text-slate-400 dark:text-neutral-600"
                        >
                            <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-neutral-800 flex items-center justify-center">
                                <Search size={20} />
                            </div>
                            <p className="text-xs uppercase tracking-widest">Awaiting Legal Query</p>
                        </motion.div>
                    )}
                    
                    {status === 'ANALYZING' && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="w-full max-w-md"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-[10px] text-amber-500 uppercase tracking-wider font-bold">Tokenizing Input</div>
                                <div className="text-[10px] text-slate-500 dark:text-neutral-500 font-mono">NLP Pipeline Active</div>
                            </div>
                            <div className="flex gap-2 flex-wrap justify-center">
                                {query.split(' ').map((word, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white dark:bg-neutral-800 px-3 py-1.5 rounded text-xs text-slate-800 dark:text-white border border-slate-200 dark:border-neutral-700 shadow-sm dark:shadow-lg flex flex-col items-center min-w-[60px]"
                                    >
                                        <span>{word}</span>
                                        <span className="text-[8px] text-slate-400 dark:text-neutral-500 mt-1 uppercase">
                                            {['arrest', 'warrant', 'police'].includes(word.toLowerCase()) ? 'Entity' : 'Token'}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {status === 'MAPPING' && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="w-full flex flex-col items-center gap-4"
                        >
                            <div className="flex items-center gap-3 text-amber-500 mb-2">
                                <ScanLine size={20} className="animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest">Traversing Vector Space</span>
                            </div>
                            
                            <div className="w-full max-w-lg bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 p-4 rounded font-mono relative overflow-hidden">
                                <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-neutral-800">
                                    <span className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase">Candidate Section</span>
                                    <span className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase">Cosine Sim</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-800 dark:text-white text-sm truncate pr-4">{scannedSection}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-amber-500 transition-all duration-100"
                                                style={{ width: `${similarity}%` }}
                                            />
                                        </div>
                                        <span className="text-amber-500 text-xs font-bold w-8 text-right">{similarity}%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {status === 'REASONING' && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="w-full flex flex-col items-center"
                        >
                            <div className="flex items-center gap-8 mb-6">
                                <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded border border-slate-200 dark:border-neutral-700 flex flex-col items-center">
                                    <span className="text-[9px] text-slate-500 dark:text-neutral-500 uppercase mb-1">Query Intent</span>
                                    <span className="text-slate-900 dark:text-white text-xs font-bold">Unlawful Arrest</span>
                                </div>
                                <div className="h-[1px] w-12 bg-slate-400 dark:bg-neutral-600 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                                </div>
                                <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded border border-amber-500/50 flex flex-col items-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                    <span className="text-[9px] text-amber-500 uppercase mb-1">Legal Match</span>
                                    <span className="text-slate-900 dark:text-white text-xs font-bold">CrPC Sec 41</span>
                                </div>
                            </div>
                            
                            <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono flex items-center gap-2 bg-slate-100 dark:bg-neutral-900 px-3 py-1 rounded-full border border-slate-200 dark:border-neutral-800">
                                <BrainCircuit size={12} className="text-amber-500" />
                                Synthesizing Plain-English Explanation...
                            </div>
                        </motion.div>
                    )}

                    {status === 'RESULT' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="w-full flex flex-col gap-4"
                        >
                            <div className="flex items-start gap-4 bg-amber-50/50 dark:bg-amber-950/20 p-4 rounded border border-amber-200 dark:border-amber-900/50">
                                <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-full border border-amber-200 dark:border-amber-500/30 mt-1">
                                    <Scale size={20} className="text-amber-600 dark:text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-amber-800 dark:text-amber-100 font-bold text-sm mb-1 font-mono tracking-tight">Section 41, Code of Criminal Procedure</h4>
                                    <p className="text-amber-700 dark:text-amber-100/70 text-xs leading-relaxed">
                                        Police may arrest <span className="text-amber-900 dark:text-white font-bold">without a warrant</span> only if:
                                    </p>
                                    <ul className="mt-2 space-y-1 text-xs text-amber-700/80 dark:text-neutral-400 list-disc list-inside">
                                        <li>A cognizable offense is committed in police presence.</li>
                                        <li>Credible info exists of an offense punishable by 7+ years.</li>
                                        <li>Arrest is necessary to prevent further offense or tampering.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="text-[9px] text-slate-500 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                    <CheckCircle2 size={10} className="text-green-600 dark:text-green-500" /> Confidence Score: 98.4%
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};

const PipelineNode = ({ icon: Icon, label, active, status, final }: any) => {
    const isProcessing = status === 'processing';
    const isDone = status === 'done';
    
    return (
        <div className={`flex flex-col items-center gap-3 relative z-10 w-24 transition-all duration-500 ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative bg-white dark:bg-black shrink-0
                ${isProcessing ? 'border-amber-500 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : ''}
                ${isDone ? (final ? 'border-amber-500 text-amber-500' : 'border-slate-800 dark:border-white text-slate-800 dark:text-white') : 'border-slate-300 dark:border-neutral-700 text-slate-400 dark:text-neutral-500'}
            `}>
                <Icon size={16} className={isProcessing ? 'animate-pulse' : ''} />
                {isProcessing && (
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                )}
            </div>
            <div className="text-center">
                <div className={`text-[9px] font-bold uppercase tracking-wider ${isProcessing ? 'text-amber-500' : isDone ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-neutral-500'}`}>
                    {label}
                </div>
            </div>
        </div>
    );
};

export default VajraLogic;
