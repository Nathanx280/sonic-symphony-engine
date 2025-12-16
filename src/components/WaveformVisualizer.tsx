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

        // Create gradient for each bar - Canvas doesn't support hex-alpha appended to hsl()/css vars
        const gradient = ctx.createLinearGradient(x, centerY - barHeight / 2, x, centerY + barHeight / 2);

        const resolveCssVar = (input: string) => {
          const m = input.match(/var\((--[^)\s,]+)(?:,\s*[^)]+)?\)/);
          if (!m) return null;
          const raw = getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim();
          return raw || null;
        };

        const parseHsl = (input: string): { h: number; s: number; l: number } | null => {
          const trimmed = input.trim();
          // Accept formats:
          // - "25 100% 55%" (shadcn css vars)
          // - "25, 100%, 55%"
          // - "hsl(25 100% 55%)" or "hsl(25, 100%, 55%)"
          const normalized = trimmed
            .replace(/^hsl\(/, '')
            .replace(/\)$/, '')
            .replace(/\s+/g, ' ')
            .replace(/\s*,\s*/g, ' ');

          const parts = normalized.split(' ').filter(Boolean);
          if (parts.length < 3) return null;

          const h = Number(parts[0]);
          const s = Number(parts[1].replace('%', ''));
          const l = Number(parts[2].replace('%', ''));
          if ([h, s, l].some((n) => Number.isNaN(n))) return null;
          return { h, s, l };
        };

        // Convert HSL -> RGBA (Canvas always accepts rgba())
        const hslToRgba = (h: number, s: number, l: number, a: number) => {
          const S = s / 100;
          const L = l / 100;
          const C = (1 - Math.abs(2 * L - 1)) * S;
          const hp = ((h % 360) + 360) % 360 / 60;
          const X = C * (1 - Math.abs((hp % 2) - 1));

          let r1 = 0,
            g1 = 0,
            b1 = 0;
          if (hp >= 0 && hp < 1) [r1, g1, b1] = [C, X, 0];
          else if (hp < 2) [r1, g1, b1] = [X, C, 0];
          else if (hp < 3) [r1, g1, b1] = [0, C, X];
          else if (hp < 4) [r1, g1, b1] = [0, X, C];
          else if (hp < 5) [r1, g1, b1] = [X, 0, C];
          else [r1, g1, b1] = [C, 0, X];

          const m = L - C / 2;
          const r = Math.round((r1 + m) * 255);
          const g = Math.round((g1 + m) * 255);
          const b = Math.round((b1 + m) * 255);
          return `rgba(${r}, ${g}, ${b}, ${a})`;
        };

        const toRgba = (col: string, alpha: number) => {
          // rgb/rgba
          if (col.startsWith('rgb')) {
            return col.replace(/rgba?\(([^)]+)\)/, (_, values) => {
              const parts = values.split(',').slice(0, 3).map((p: string) => p.trim());
              return `rgba(${parts.join(', ')}, ${alpha})`;
            });
          }

          // hex
          if (col.startsWith('#') && col.length >= 7) {
            const hex = col.slice(1);
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }

          // hsl(...) and/or css var based colors
          const varValue = col.includes('var(') ? resolveCssVar(col) : null;
          const hsl = parseHsl(varValue ?? col);
          if (hsl) return hslToRgba(hsl.h, hsl.s, hsl.l, alpha);

          // final fallback
          return col;
        };

        if (isPlayed) {
          gradient.addColorStop(0, toRgba(color, 1));
          gradient.addColorStop(0.5, toRgba(color, 1));
          gradient.addColorStop(1, toRgba(color, 0.5));
        } else {
          gradient.addColorStop(0, toRgba(color, 0.4));
          gradient.addColorStop(0.5, toRgba(color, 0.25));
          gradient.addColorStop(1, toRgba(color, 0.15));
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
