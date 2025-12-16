import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
  data: number[];
  color: string;
  isPlaying?: boolean;
  progress?: number;
  height?: number;
  className?: string;
  interactive?: boolean;
  onSeek?: (position: number) => void;
}

export function WaveformVisualizer({
  data,
  color,
  isPlaying = false,
  progress = 0,
  height = 80,
  className,
  interactive = false,
  onSeek
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      const barWidth = rect.width / data.length;
      const centerY = rect.height / 2;

      data.forEach((value, index) => {
        const x = index * barWidth;
        const barHeight = value * (rect.height * 0.8);
        const isPlayed = (index / data.length) < progress;
        const isHovered = hoveredPosition !== null && Math.abs(index / data.length - hoveredPosition) < 0.02;

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, centerY - barHeight / 2, x, centerY + barHeight / 2);
        
        if (isPlayed) {
          gradient.addColorStop(0, color);
          gradient.addColorStop(0.5, color);
          gradient.addColorStop(1, `${color}88`);
        } else {
          gradient.addColorStop(0, `${color}66`);
          gradient.addColorStop(0.5, `${color}44`);
          gradient.addColorStop(1, `${color}22`);
        }

        ctx.fillStyle = gradient;
        
        // Add glow effect for playing bars
        if (isPlayed && isPlaying) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
        } else if (isHovered) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw bar
        const barGap = 1;
        ctx.beginPath();
        ctx.roundRect(
          x + barGap / 2,
          centerY - barHeight / 2,
          Math.max(1, barWidth - barGap),
          barHeight,
          2
        );
        ctx.fill();
      });

      // Draw playhead
      if (progress > 0 && progress < 1) {
        const playheadX = progress * rect.width;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(playheadX, 0);
        ctx.lineTo(playheadX, rect.height);
        ctx.stroke();
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data, color, isPlaying, progress, hoveredPosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    setHoveredPosition(position);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current || !onSeek) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(1, position)));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-lg',
        interactive && 'cursor-pointer',
        className
      )}
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredPosition(null)}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Animated scan line when playing */}
      {isPlaying && (
        <div
          className="absolute top-0 bottom-0 w-px opacity-50"
          style={{
            left: `${progress * 100}%`,
            background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      )}
    </div>
  );
}
