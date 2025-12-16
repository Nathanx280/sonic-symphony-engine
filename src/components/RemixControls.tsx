import { RemixSettings, RemixStyle } from '@/types/audio';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Shuffle, Wand2, Sparkles, Zap } from 'lucide-react';

interface RemixControlsProps {
  settings: RemixSettings;
  onSettingsChange: (settings: Partial<RemixSettings>) => void;
  onRemix: () => void;
  onRandomize: () => void;
  isProcessing: boolean;
}

export function RemixControls({
  settings,
  onSettingsChange,
  onRemix,
  onRandomize,
  isProcessing
}: RemixControlsProps) {
  return (
    <div className="glass-panel p-6 space-y-6">
      <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
        <Wand2 className="w-5 h-5 text-primary" />
        Remix Controls
      </h3>

      <div className="space-y-5">
        {/* Intensity */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-neon-orange" />
              Intensity
            </Label>
            <span className="text-sm text-primary font-mono">
              {settings.intensity}%
            </span>
          </div>
          <Slider
            value={[settings.intensity]}
            min={0}
            max={100}
            step={1}
            onValueChange={([v]) => onSettingsChange({ intensity: v })}
          />
          <p className="text-xs text-muted-foreground">
            How aggressively to apply the remix transformations
          </p>
        </div>

        {/* Randomness */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-purple" />
              Randomness
            </Label>
            <span className="text-sm text-primary font-mono">
              {settings.randomness}%
            </span>
          </div>
          <Slider
            value={[settings.randomness]}
            min={0}
            max={100}
            step={1}
            onValueChange={([v]) => onSettingsChange({ randomness: v })}
          />
          <p className="text-xs text-muted-foreground">
            Add creative variations to make each remix unique
          </p>
        </div>

        {/* Toggle Options */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-foreground">
              Preserve Vocals
            </Label>
            <Switch
              checked={settings.preserveVocals}
              onCheckedChange={(v) => onSettingsChange({ preserveVocals: v })}
            />
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            Keep vocals more recognizable in the remix
          </p>

          <div className="flex items-center justify-between">
            <Label className="text-sm text-foreground">
              Auto Arrange
            </Label>
            <Switch
              checked={settings.autoArrange}
              onCheckedChange={(v) => onSettingsChange({ autoArrange: v })}
            />
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            Automatically restructure the song arrangement
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          onClick={onRemix}
          disabled={isProcessing || !settings.style}
          className="w-full"
          size="lg"
          variant="neon"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          {isProcessing ? 'Processing...' : 'Generate Remix'}
        </Button>

        <Button
          onClick={onRandomize}
          disabled={isProcessing}
          variant="outline"
          className="w-full"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Randomize All Settings
        </Button>
      </div>
    </div>
  );
}
