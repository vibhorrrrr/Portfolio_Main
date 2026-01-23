import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Hide on touch devices (simple check)
  if (typeof navigator !== 'undefined' && typeof window !== 'undefined') {
     const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
     if (isTouch) return null;
  }

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input { cursor: none; }
      `}</style>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Main Circle */}
            <div className={`border border-white rounded-full transition-all duration-300 ${isHovering ? 'w-8 h-8 opacity-50 bg-white/20' : 'w-2 h-2 bg-white'}`} />
            
            {/* Crosshair (visible when not hovering) */}
            {!isHovering && (
                <>
                    <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-white/30 -translate-y-1/2" />
                    <div className="absolute left-1/2 top-0 h-8 w-[1px] bg-white/30 -translate-x-1/2" />
                </>
            )}

            {/* Corner Brackets (visible when hovering) */}
            {isHovering && (
                <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
                </div>
            )}
        </div>
        
        {/* Coordinates Tag */}
        <div className="absolute top-8 left-8 text-[8px] font-mono text-white whitespace-nowrap opacity-50">
            {mousePosition.x.toString().padStart(4, '0')} : {mousePosition.y.toString().padStart(4, '0')}
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;