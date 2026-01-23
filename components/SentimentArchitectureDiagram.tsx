import React from 'react';
import { Database, FileText, Smile, Meh, Frown, Network, Cpu, BarChart3, ArrowRight, Layers, FileJson } from 'lucide-react';

const SentimentArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto pb-4">
        {/* Container: White background, research-paper style */}
        <div className="min-w-[1000px] bg-white text-slate-800 p-8 rounded-sm shadow-lg border border-neutral-800/50">
            
            <h4 className="font-sans font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                Figure 1. Sentiment Analysis Ensemble Architecture
            </h4>

            <div className="flex flex-row items-center justify-between gap-4">
                
                {/* 1. Data Collection */}
                <Step 
                    label="Data Collection" 
                    icon={FileJson} 
                    sub="Sources"
                />
                
                <Arrow />

                {/* 2. Data Loading */}
                <Step 
                    label="Data Loading" 
                    icon={Database} 
                    sub="Ingestion"
                />

                <Arrow />

                {/* 3. Data Preprocessing (Large Box) */}
                <div className="flex flex-col w-48 shrink-0 bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm h-full min-h-[160px]">
                    <div className="flex items-center gap-2 mb-3 border-b border-slate-200 pb-2">
                        <Layers size={14} className="text-teal-600" />
                        <span className="text-xs font-bold uppercase text-slate-700">Preprocessing</span>
                    </div>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Cleaning</div>
                            <div className="text-[10px] text-slate-600 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">
                                Missing & Duplicates
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">NLP Tasks</div>
                            <div className="text-[10px] text-slate-600 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">
                                Tokenization • Stopwords • Stemming
                            </div>
                        </div>
                    </div>
                </div>

                <Arrow />

                {/* 4. Sentiment Labeling */}
                <div className="flex flex-col items-center justify-center gap-2 shrink-0 w-24">
                    <div className="flex gap-1 bg-slate-100 p-2 rounded-full">
                        <Smile className="text-green-500" size={18} />
                        <Meh className="text-slate-400" size={18} />
                        <Frown className="text-red-500" size={18} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Labeling</span>
                </div>

                <Arrow />

                {/* 5. Ensemble Model (Complex Box) */}
                <div className="flex flex-col w-72 shrink-0 bg-teal-50/50 border border-teal-200 rounded-lg p-4 shadow-sm relative">
                    <div className="absolute -top-3 left-4 bg-teal-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded shadow-sm">
                        Ensemble Core
                    </div>
                    
                    <div className="mt-2 text-center mb-3">
                        <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-1 rounded-full font-mono">
                            Split: 80% Train | 20% Val
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="flex flex-col items-center bg-white p-2 rounded border border-teal-100 shadow-sm">
                            <Network size={16} className="text-indigo-500 mb-1" />
                            <span className="text-[9px] font-bold text-slate-700">Transformer</span>
                        </div>
                        <div className="flex flex-col items-center bg-white p-2 rounded border border-teal-100 shadow-sm">
                            <Cpu size={16} className="text-blue-500 mb-1" />
                            <span className="text-[9px] font-bold text-slate-700">RNN + CNN</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-center -my-2 relative z-10">
                         <div className="bg-teal-100 rounded-full p-1"><ArrowRight size={10} className="rotate-90 text-teal-700"/></div>
                    </div>

                    <div className="bg-teal-600 text-white p-2 rounded text-center mt-2 shadow-sm">
                        <div className="flex items-center justify-center gap-2">
                            <Layers size={12} />
                            <span className="text-[10px] font-bold uppercase">Weighted Ensemble</span>
                        </div>
                    </div>
                </div>

                <Arrow />

                {/* 6. Final Prediction */}
                <Step 
                    label="Final Prediction" 
                    icon={BarChart3} 
                    sub="Inference"
                    highlight
                />

            </div>
        </div>
    </div>
  );
};

const Step = ({ label, icon: Icon, sub, highlight }: any) => (
    <div className={`flex flex-col items-center justify-center w-28 shrink-0 p-3 rounded-lg border ${highlight ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200'} shadow-sm`}>
        <div className={`p-2 rounded-full mb-2 ${highlight ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'}`}>
            <Icon size={20} />
        </div>
        <span className="text-[10px] font-bold uppercase text-slate-800 text-center">{label}</span>
        {sub && <span className="text-[9px] text-slate-400 mt-1">{sub}</span>}
    </div>
);

const Arrow = () => (
    <div className="shrink-0 text-slate-300">
        <ArrowRight size={24} />
    </div>
);

export default SentimentArchitectureDiagram;