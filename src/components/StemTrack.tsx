import { Stem } from '@/types/audio';
import { WaveformVisualizer } from './WaveformVisualizer';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StemTrackProps {
  stem: Stem;
  isPlaying: boolean;
  progress: number;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onSoloToggle: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

export function StemTrack({
  stem,
  isPlaying,
  progress,
  onVolumeChange,
  onMuteToggle,
  onSoloToggle,
  onSelect,
  isSelected
}: StemTrackProps) {
  return (
    <div
      className={cn(
        'glass-panel p-4 transition-all duration-300 cursor-pointer',
        isSelected && 'ring-2 ring-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]',
        stem.muted && 'opacity-50'
      )}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        {/* Stem indicator */}
        <div
          className="w-3 h-12 rounded-full"
          style={{ 
            backgroundColor: stem.color,
            boxShadow: `0 0 15px ${stem.color}`
          }}
        />
        
        {/* Stem info */}
        <div className="w-24">
          <h4 className="font-display text-sm font-semibold text-foreground">
            {stem.name}
          </h4>
          <p className="text-xs text-muted-foreground capitalize">
            {stem.type}
          </p>
        </div>

        {/* Waveform */}
        <div className="flex-1">
          <WaveformVisualizer
            data={stem.waveformData}
            color={stem.color}
            isPlaying={isPlaying && !stem.muted}
            progress={progress}
            height={48}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Volume slider */}
          <div className="w-24 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[stem.volume]}
              min={0}
              max={150}
              step={1}
              onValueChange={([v]) => onVolumeChange(v)}
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Mute button */}
          <Button
            variant={stem.muted ? 'destructive' : 'ghost'}
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onMuteToggle();
            }}
            className="w-8 h-8"
          >
            {stem.muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          {/* Solo button */}
          <Button
            variant={stem.solo ? 'default' : 'ghost'}
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSoloToggle();
            }}
            className="w-8 h-8"
          >
            <Headphones className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
