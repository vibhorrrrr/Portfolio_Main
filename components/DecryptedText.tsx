import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  animateOnHover?: boolean;
  revealDirection?: 'start' | 'end' | 'random';
}

// Alphanumeric set to approximate width of standard text better than wide symbols
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  className = '', 
  speed = 50, // Slower default for more "intentional" feel
  animateOnHover = false,
  revealDirection = 'start'
}) => {
  const [revealedCount, setRevealedCount] = useState(animateOnHover ? text.length : 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    if (!animateOnHover) {
        startAnimation();
    }
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, animateOnHover]);

  const startAnimation = () => {
    setRevealedCount(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setRevealedCount(prev => {
        if (prev >= text.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return text.length;
        }
        return prev + 1; 
      });
    }, speed);
  };

  const handleMouseEnter = () => {
    if (animateOnHover && !isHovering.current) {
        isHovering.current = true;
        startAnimation();
    }
  };

  const handleMouseLeave = () => {
      isHovering.current = false;
  };

  // Split by words to preserve wrapping
  const words = text.split(/(\s+)/);
  let charIndexAccumulator = 0;

  return (
    <span 
      className={`inline-block ${className}`} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, i) => {
        const startIndex = charIndexAccumulator;
        const length = word.length;
        charIndexAccumulator += length;
        
        return (
          <Word 
            key={i} 
            word={word} 
            startIndex={startIndex} 
            revealedCount={revealedCount} 
            revealDirection={revealDirection}
          />
        );
      })}
    </span>
  );
};

const Word: React.FC<{ 
    word: string; 
    startIndex: number; 
    revealedCount: number;
    revealDirection: 'start' | 'end' | 'random';
}> = ({ word, startIndex, revealedCount, revealDirection }) => {
    
    // Determine how many characters in this word should be revealed
    const charsRevealed = Math.max(0, revealedCount - startIndex);
    const isFullyRevealed = charsRevealed >= word.length;

    const [displayWord, setDisplayWord] = useState(word);

    useEffect(() => {
        if (isFullyRevealed) {
            setDisplayWord(word);
        } else {
            // Scramble logic
            const nextWord = word.split('').map((char, i) => {
                // If it's a space or newline, keep it
                if (char === ' ' || char === '\n') return char;
                
                // Logic for "start" direction: reveal from left to right
                if (i < charsRevealed) return char;

                // Return random char for unrevealed
                return characters[Math.floor(Math.random() * characters.length)];
            }).join('');
            setDisplayWord(nextWord);
        }
    }, [revealedCount, word, startIndex, isFullyRevealed, charsRevealed]);

    // Handle whitespace specifically to ensure correct spacing
    if (word.match(/^\s+$/)) {
        return <span className="whitespace-pre">{word}</span>;
    }

    return (
        <span className="relative inline-block whitespace-nowrap overflow-hidden align-top pb-1">
            {/* Anchor: Invisible text that defines the width. 
                Using opacity-0 ensures it takes up space. 
                This prevents layout shift as long as the font is consistent. */}
            <span className="opacity-0">{word}</span>
            
            {/* Overlay: The visible scrambled/revealed text. 
                Absolute positioning puts it right on top of the anchor. */}
            <span className="absolute top-0 left-0 w-full h-full">
                {displayWord}
            </span>
        </span>
    );
};

export default DecryptedText;