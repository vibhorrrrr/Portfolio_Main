import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Database, Activity } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  techStack: string[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, techStack }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="modal-backdrop"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            key="modal-content"
            className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 max-h-[90vh] overflow-y-auto scrollbar-hide relative"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header */}
              <div className="sticky top-0 bg-neutral-950/90 backdrop-blur border-b border-neutral-800 p-6 flex justify-between items-center z-10">
                  <div>
                      <h3 className="text-xl font-bold text-white font-mono uppercase">System Architecture: {title}</h3>
                      <div className="flex gap-2 mt-2">
                          {techStack.map(tech => (
                              <span key={tech} className="text-[10px] bg-neutral-900 border border-neutral-700 px-2 py-0.5 text-neutral-400 font-mono">
                                  {tech}
                              </span>
                          ))}
                      </div>
                  </div>
                  <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                      <X size={24} />
                  </button>
              </div>

              {/* Content */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                      <Section title="Architecture" icon={Layers}>
                          <p className="text-neutral-400 text-sm leading-relaxed">
                              The system utilizes a hybrid approach, combining symbolic reasoning graphs with dense vector embeddings. This allows for both semantic search capabilities and logical deduction paths, minimizing hallucination rates in high-stakes environments.
                          </p>
                      </Section>
                      
                      <Section title="Data Pipeline" icon={Database}>
                          <p className="text-neutral-400 text-sm leading-relaxed">
                              Ingestion involves cleaning unstructured text, entity extraction (NER), and relationship mapping. Data is stored in a Neo4j graph database, indexed by a vector store (Milvus) for rapid retrieval.
                          </p>
                      </Section>
                  </div>

                  <div className="space-y-6">
                      <Section title="Metrics & Performance" icon={Activity}>
                          <div className="space-y-4">
                              <Metric label="Latency (P99)" value="124ms" bar={80} />
                              <Metric label="Recall @ 10" value="94.2%" bar={94} />
                              <Metric label="Reasoning Depth" value="4 Hops" bar={60} />
                          </div>
                      </Section>

                      <div className="p-4 border border-red-900/30 bg-red-900/5 rounded">
                          <h4 className="text-red-400 text-xs font-bold uppercase mb-2">Known Failure Cases</h4>
                          <ul className="list-disc list-inside text-xs text-red-200/70 space-y-1">
                              <li>Ambiguous negation in complex queries.</li>
                              <li>Latency spikes during massive graph traversals.</li>
                          </ul>
                      </div>
                  </div>
              </div>
              
              <div className="p-6 border-t border-neutral-800 bg-neutral-900/30 text-center">
                   <p className="text-neutral-500 font-serif italic text-sm">"The goal is not just accuracy, but explainable correctness."</p>
              </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Section = ({ title, icon: Icon, children }: any) => (
    <div>
        <div className="flex items-center gap-2 mb-3 text-white">
            <Icon size={16} className="text-neural" />
            <h4 className="font-bold text-sm uppercase tracking-wide">{title}</h4>
        </div>
        {children}
    </div>
);

const Metric = ({ label, value, bar }: any) => (
    <div>
        <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>{label}</span>
            <span className="text-white font-mono">{value}</span>
        </div>
        <div className="h-1 bg-neutral-800 w-full overflow-hidden">
            <div className="h-full bg-neutral-500" style={{ width: `${bar}%` }} />
        </div>
    </div>
);

export default Modal;