
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Loader2, Play, AlertCircle, Lock, Sparkles, Film, Key } from 'lucide-react';

const VeoVideoGen: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [prompt, setPrompt] = useState('A cyberpunk city with neon lights reflecting in puddles, cinematic 4k');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    if ((window as any).aistudio?.hasSelectedApiKey) {
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleSelectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Assume success after interaction (handling race condition as per instructions)
      setHasKey(true);
    } else {
        setError("API Key selection not available in this environment.");
    }
  };

  const generateVideo = async () => {
    if (!process.env.API_KEY && !hasKey) {
        // Fallback check if process.env isn't populated but hasKey is true
        // The instructions say use process.env.API_KEY directly.
    }

    setIsGenerating(true);
    setError(null);
    setVideoUri(null);
    setProgress('Initializing Veo-3.1...');

    try {
      // Create new instance per call to ensure fresh key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
      });

      setProgress('Synthesizing frames...');
      
      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
        operation = await ai.operations.getVideosOperation({operation: operation});
        setProgress('Rendering video...');
      }

      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        // The URI requires the key appended for fetching
        const fetchUrl = `${downloadLink}&key=${process.env.API_KEY}`;
        
        // Fetch the blob
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error(`Failed to fetch video: ${res.statusText}`);
        const blob = await res.blob();
        setVideoUri(URL.createObjectURL(blob));
      } else {
        throw new Error("No video generated in response");
      }

    } catch (e: any) {
        console.error(e);
        if (e.message?.includes("Requested entity was not found") || e.toString().includes("404")) {
            setHasKey(false);
            setError("Session expired or key invalid. Please re-authenticate.");
        } else {
            setError(e.message || "Generation failed");
        }
    } finally {
        setIsGenerating(false);
        setProgress('');
    }
  };

  return (
    <div className="w-full h-full bg-black border border-neutral-800 flex flex-col font-mono text-sm relative overflow-hidden">
        {/* Background Ambient */}
        <div className="absolute inset-0 bg-neutral-900/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/20 blur-[100px] rounded-full"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-neutral-400">
                <Film size={14} className="text-purple-500" />
                <span className="text-xs font-bold tracking-widest uppercase">Veo Generative Suite</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isGenerating ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span className="text-[10px] text-neutral-500 uppercase">{isGenerating ? 'PROCESSING' : 'READY'}</span>
            </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col p-6 items-center justify-center">
            
            {!hasKey ? (
                <div className="text-center space-y-4 max-w-md">
                    <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto border border-neutral-800 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <Lock size={24} className="text-purple-500" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Restricted Access</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                        High-fidelity generative models require authorized credentials. Please verify your identity via Google AI Studio to proceed with Veo-3.1 simulation.
                    </p>
                    <button 
                        onClick={handleSelectKey}
                        className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 mx-auto"
                    >
                        <Key size={14} /> Initialize Security Key
                    </button>
                    <div className="pt-4">
                         <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[10px] text-neutral-600 hover:text-neutral-400 underline decoration-dotted">
                            Billing & Access Documentation
                         </a>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col gap-4">
                    {/* Video Display Area */}
                    <div className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-sm relative overflow-hidden group flex items-center justify-center">
                        {videoUri ? (
                            <video 
                                src={videoUri} 
                                controls 
                                autoPlay 
                                loop 
                                className="w-full h-full object-contain"
                            />
                        ) : isGenerating ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 size={32} className="text-purple-500 animate-spin" />
                                <span className="text-xs text-purple-400 animate-pulse">{progress}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-neutral-600">
                                <Video size={32} strokeWidth={1} />
                                <span className="text-xs uppercase tracking-wider">No output generated</span>
                            </div>
                        )}
                        
                        {/* Grid Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                    </div>

                    {/* Controls */}
                    <div className="shrink-0 flex gap-2">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isGenerating}
                                className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs p-3 pl-10 focus:outline-none focus:border-purple-500 transition-colors rounded-sm"
                                placeholder="Describe the scene to generate..."
                            />
                            <Sparkles size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                        </div>
                        <button 
                            onClick={generateVideo}
                            disabled={isGenerating || !prompt}
                            className="px-6 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2"
                        >
                            {isGenerating ? 'Generating' : 'Generate'}
                            {!isGenerating && <Play size={12} fill="currentColor" />}
                        </button>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-900/20 border border-red-900/50 rounded-sm flex items-center gap-3 text-xs text-red-400"
                        >
                            <AlertCircle size={14} className="shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default VeoVideoGen;
