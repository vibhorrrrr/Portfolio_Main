
import React, { useEffect, useRef } from 'react';

interface GlobalNeuralBackgroundProps {
  theme: 'dark' | 'light';
}

const GlobalNeuralBackground: React.FC<GlobalNeuralBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    // Configuration
    const particleCount = 70; 
    const connectionDistance = 160;
    const mouseDistance = 220;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        // SIGNIFICANTLY REDUCED SPEED: 0.6 -> 0.15
        this.vx = (Math.random() - 0.5) * 0.15; 
        this.vy = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 2.5 + 1.5; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

        // Mouse interaction (repel)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          
          // SIGNIFICANTLY REDUCED MOUSE FORCE: 0.6 -> 0.05
          // This prevents particles from permanently speeding up after interaction
          const directionX = forceDirectionX * force * 0.05;
          const directionY = forceDirectionY * force * 0.05;

          this.vx -= directionX;
          this.vy -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        // Theme-based colors with higher opacity (maintained from previous request)
        if (theme === 'dark') {
             ctx.fillStyle = 'rgba(0, 240, 255, 0.8)'; // Neural cyan
        } else {
             ctx.fillStyle = 'rgba(71, 85, 105, 0.8)'; // Slate 600
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            
            // Calculate opacity based on distance
            const opacity = 1 - distance / connectionDistance;
            
            // Theme-based line colors
            if (theme === 'dark') {
                ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.4})`;
            } else {
                ctx.strokeStyle = `rgba(71, 85, 105, ${opacity * 0.4})`;
            }

            ctx.lineWidth = 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-100 transition-opacity duration-500"
    />
  );
};

export default GlobalNeuralBackground;
