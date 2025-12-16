import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download } from 'lucide-react';
import { formatTime } from '@/lib/remixEngine';

interface TransportControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onExport: () => void;
  disabled?: boolean;
}

export function TransportControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onExport,
  disabled
}: TransportControlsProps) {
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center gap-4">
        {/* Transport buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSeek(0)}
            disabled={disabled}
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button
            variant="neon"
            size="icon"
            onClick={onPlayPause}
            disabled={disabled}
            className="w-12 h-12"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSeek(duration)}
            disabled={disabled}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Time display */}
        <div className="font-mono text-sm text-muted-foreground w-24">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Seek bar */}
        <div className="flex-1">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={([v]) => onSeek(v)}
            disabled={disabled}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:shadow-[0_0_10px_hsl(var(--primary))]"
          />
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2 w-32">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={([v]) => onVolumeChange(v)}
          />
        </div>

        {/* Export button */}
        <Button
          variant="magenta"
          onClick={onExport}
          disabled={disabled}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}
