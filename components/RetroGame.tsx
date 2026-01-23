
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, RotateCcw, Trophy, Keyboard, MousePointer2, Cpu } from 'lucide-react';

interface RetroGameProps {
  onClose: () => void;
}

const RetroGame: React.FC<RetroGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [gameMode, setGameMode] = useState<'MOUSE' | 'KEYBOARD'>('MOUSE');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'PLAYER' | 'AI' | null>(null);

  // Game State Refs (for loop performance)
  const gameState = useRef({
    ball: { x: 400, y: 250, dx: 4, dy: 4, speed: 6, radius: 6 },
    paddlePlayer: { x: 20, y: 200, width: 10, height: 80, dy: 0, score: 0 },
    paddleAI: { x: 770, y: 200, width: 10, height: 80, dy: 0, speed: 5, score: 0 },
    keys: { w: false, s: false, up: false, down: false },
    mouseY: 250,
    isPaused: true
  });

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W') gameState.current.keys.w = true;
      if (e.key === 's' || e.key === 'S') gameState.current.keys.s = true;
      if (e.key === 'ArrowUp') gameState.current.keys.up = true;
      if (e.key === 'ArrowDown') gameState.current.keys.down = true;
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') togglePause();
      if (['ArrowUp', 'ArrowDown', ' '].includes(e.key)) e.preventDefault();
      
      if (gameMode === 'MOUSE' && ['w', 's', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        setGameMode('KEYBOARD');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W') gameState.current.keys.w = false;
      if (e.key === 's' || e.key === 'S') gameState.current.keys.s = false;
      if (e.key === 'ArrowUp') gameState.current.keys.up = false;
      if (e.key === 'ArrowDown') gameState.current.keys.down = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleY = 500 / rect.height;
      gameState.current.mouseY = (e.clientY - rect.top) * scaleY;
      if (gameMode === 'KEYBOARD') setGameMode('MOUSE');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // Attach mouse move to window to catch movements outside canvas
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameMode, onClose]);

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resetBall = () => {
      const state = gameState.current;
      state.ball.x = 400;
      state.ball.y = 250;
      state.ball.speed = 6;
      state.ball.dx = (Math.random() > 0.5 ? 1 : -1) * state.ball.speed;
      state.ball.dy = (Math.random() * 2 - 1) * state.ball.speed;
    };

    const update = () => {
      const state = gameState.current;
      if (state.isPaused || gameOver) return;

      // Player Movement
      if (gameMode === 'KEYBOARD') {
        if (state.keys.w || state.keys.up) state.paddlePlayer.y -= 7;
        if (state.keys.s || state.keys.down) state.paddlePlayer.y += 7;
      } else {
        // Mouse follow with slight lerp for smoothness
        state.paddlePlayer.y += (state.mouseY - state.paddlePlayer.height/2 - state.paddlePlayer.y) * 0.2;
      }

      // Clamp Player
      state.paddlePlayer.y = Math.max(0, Math.min(500 - state.paddlePlayer.height, state.paddlePlayer.y));

      // AI Movement (Simple tracking with speed limit and reaction delay simulated by speed)
      const aiCenter = state.paddleAI.y + state.paddleAI.height / 2;
      if (aiCenter < state.ball.y - 35) state.paddleAI.y += state.paddleAI.speed;
      if (aiCenter > state.ball.y + 35) state.paddleAI.y -= state.paddleAI.speed;
      state.paddleAI.y = Math.max(0, Math.min(500 - state.paddleAI.height, state.paddleAI.y));

      // Ball Movement
      state.ball.x += state.ball.dx;
      state.ball.y += state.ball.dy;

      // Wall Collision (Top/Bottom)
      if (state.ball.y - state.ball.radius < 0 || state.ball.y + state.ball.radius > 500) {
        state.ball.dy *= -1;
      }

      // Paddle Collision
      // Player
      if (
        state.ball.x - state.ball.radius < state.paddlePlayer.x + state.paddlePlayer.width &&
        state.ball.y > state.paddlePlayer.y &&
        state.ball.y < state.paddlePlayer.y + state.paddlePlayer.height &&
        state.ball.dx < 0
      ) {
        state.ball.dx *= -1.05; // Speed up
        state.ball.speed *= 1.05;
        // Add "English" (spin) based on where it hits the paddle
        const hitPoint = state.ball.y - (state.paddlePlayer.y + state.paddlePlayer.height / 2);
        state.ball.dy = hitPoint * 0.3; 
      }

      // AI
      if (
        state.ball.x + state.ball.radius > state.paddleAI.x &&
        state.ball.y > state.paddleAI.y &&
        state.ball.y < state.paddleAI.y + state.paddleAI.height &&
        state.ball.dx > 0
      ) {
        state.ball.dx *= -1.05;
        state.ball.speed *= 1.05;
        const hitPoint = state.ball.y - (state.paddleAI.y + state.paddleAI.height / 2);
        state.ball.dy = hitPoint * 0.3;
      }

      // Scoring
      if (state.ball.x < 0) {
        state.paddleAI.score += 1;
        setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
        resetBall();
        if (state.paddleAI.score >= 5) {
            setGameOver(true);
            setWinner('AI');
            state.isPaused = true;
            setIsPlaying(false);
        }
      }
      if (state.ball.x > 800) {
        state.paddlePlayer.score += 1;
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        resetBall();
        if (state.paddlePlayer.score >= 5) {
            setGameOver(true);
            setWinner('PLAYER');
            state.isPaused = true;
            setIsPlaying(false);
        }
      }
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = '#050505'; // Dark bg always for retro feel
      ctx.fillRect(0, 0, 800, 500);

      // Grid Lines
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i=0; i<800; i+=40) { ctx.moveTo(i, 0); ctx.lineTo(i, 500); }
      for(let i=0; i<500; i+=40) { ctx.moveTo(0, i); ctx.lineTo(800, i); }
      ctx.stroke();

      // Center Line
      ctx.strokeStyle = '#333';
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(400, 0);
      ctx.lineTo(400, 500);
      ctx.stroke();
      ctx.setLineDash([]);

      const state = gameState.current;

      // Draw Paddles
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.fillStyle = '#00f0ff'; // Player Blue/Cyan
      ctx.fillRect(state.paddlePlayer.x, state.paddlePlayer.y, state.paddlePlayer.width, state.paddlePlayer.height);

      ctx.shadowColor = '#ef4444';
      ctx.fillStyle = '#ef4444'; // AI Red
      ctx.fillRect(state.paddleAI.x, state.paddleAI.y, state.paddleAI.width, state.paddleAI.height);

      // Draw Ball
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    const render = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameMode, gameOver]);

  const togglePause = () => {
    if (gameOver) return;
    gameState.current.isPaused = !gameState.current.isPaused;
    setIsPlaying(!gameState.current.isPaused);
  };

  const restartGame = () => {
    gameState.current.paddlePlayer.score = 0;
    gameState.current.paddleAI.score = 0;
    gameState.current.ball.x = 400;
    gameState.current.ball.y = 250;
    gameState.current.ball.speed = 6;
    gameState.current.isPaused = false;
    setScore({ player: 0, ai: 0 });
    setGameOver(false);
    setWinner(null);
    setIsPlaying(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
        <div className="relative w-full max-w-4xl flex flex-col items-center">
            
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4 px-4 text-white">
                <div className="flex items-center gap-3">
                    <Cpu size={20} className="text-blue-500 animate-pulse" />
                    <div>
                        <h2 className="text-lg font-bold font-mono tracking-widest uppercase">System Idle Protocol</h2>
                        <p className="text-[10px] text-neutral-400 font-mono">Neural Reflex Calibration // Pong v1.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                         <div className="text-[10px] text-neutral-500 uppercase">Input Mode</div>
                         <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                             {gameMode === 'MOUSE' ? <MousePointer2 size={12} /> : <Keyboard size={12} />}
                             {gameMode}
                         </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors text-white"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Game Container */}
            <div className="relative border-4 border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
                <canvas 
                    ref={canvasRef} 
                    width={800} 
                    height={500} 
                    className="w-full h-auto max-h-[70vh] cursor-none bg-black"
                />

                {/* Overlay UI */}
                {(!isPlaying || gameOver) && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                        {gameOver ? (
                            <div className="text-center animate-in fade-in zoom-in duration-300">
                                <Trophy size={48} className={`mx-auto mb-4 ${winner === 'PLAYER' ? 'text-yellow-500' : 'text-neutral-600'}`} />
                                <h3 className="text-3xl font-bold font-mono text-white mb-2">
                                    {winner === 'PLAYER' ? 'SIMULATION PASSED' : 'SIMULATION FAILED'}
                                </h3>
                                <p className="text-neutral-400 font-mono text-sm mb-6">
                                    {winner === 'PLAYER' ? 'Human reflexes exceed baseline.' : 'AI adaptation superior.'}
                                </p>
                                <button 
                                    onClick={restartGame}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold uppercase tracking-widest rounded-sm flex items-center gap-2 mx-auto transition-all"
                                >
                                    <RotateCcw size={16} /> Reboot System
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h3 className="text-2xl font-bold font-mono text-white mb-6 uppercase tracking-[0.2em]">Ready to Start?</h3>
                                <button 
                                    onClick={togglePause}
                                    className="px-8 py-3 bg-white hover:bg-neutral-200 text-black font-mono font-bold uppercase tracking-widest rounded-sm flex items-center gap-2 mx-auto transition-all"
                                >
                                    <Play size={16} fill="currentColor" /> Initialize
                                </button>
                                <p className="mt-6 text-xs text-neutral-500 font-mono">
                                    Use [Mouse] or [W/S] Keys to Move
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Scoreboard Overlay */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-12 text-4xl font-mono font-bold opacity-50 pointer-events-none select-none">
                    <span className="text-cyan-500">{score.player}</span>
                    <span className="text-red-500">{score.ai}</span>
                </div>
            </div>

        </div>
    </motion.div>
  );
};

export default RetroGame;
