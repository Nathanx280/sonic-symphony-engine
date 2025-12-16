import { Stem, StemEffects } from '@/types/audio';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EffectsPanelProps {
  stem: Stem | null;
  onEffectChange: (effect: keyof StemEffects, value: any) => void;
}

const EFFECT_CONFIGS = [
  { key: 'reverb', label: 'Reverb', icon: '🌊', max: 100 },
  { key: 'delay', label: 'Delay', icon: '📡', max: 100 },
  { key: 'distortion', label: 'Distortion', icon: '⚡', max: 100 },
  { key: 'pitchShift', label: 'Pitch Shift', icon: '🎵', min: -12, max: 12 },
  { key: 'timeStretch', label: 'Time Stretch', icon: '⏱️', min: 50, max: 200 },
  { key: 'compression', label: 'Compression', icon: '📊', max: 100 },
  { key: 'chorus', label: 'Chorus', icon: '🎭', max: 100 },
  { key: 'phaser', label: 'Phaser', icon: '🌀', max: 100 },
  { key: 'bitcrush', label: 'Bitcrush', icon: '👾', max: 100 },
];

export function EffectsPanel({ stem, onEffectChange }: EffectsPanelProps) {
  if (!stem) {
    return (
      <div className="glass-panel p-6 h-full flex items-center justify-center">
        <p className="text-muted-foreground text-center font-body">
          Select a stem to edit effects
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full"
          style={{ 
            backgroundColor: stem.color,
            boxShadow: `0 0 10px ${stem.color}`
          }}
        />
        <h3 className="font-display text-lg font-semibold">
          {stem.name} Effects
        </h3>
      </div>

      {/* Filter Section */}
      <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
        <h4 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
          <span>🎛️</span> Filter
        </h4>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Type</Label>
            <Select
              value={stem.effects.filter.type}
              onValueChange={(value) => 
                onEffectChange('filter', { ...stem.effects.filter, type: value })
              }
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowpass">Low Pass</SelectItem>
                <SelectItem value="highpass">High Pass</SelectItem>
                <SelectItem value="bandpass">Band Pass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Frequency</Label>
              <span className="text-xs text-primary font-mono">
                {stem.effects.filter.frequency.toFixed(0)} Hz
              </span>
            </div>
            <Slider
              value={[stem.effects.filter.frequency]}
              min={20}
              max={20000}
              step={10}
              onValueChange={([v]) => 
                onEffectChange('filter', { ...stem.effects.filter, frequency: v })
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Resonance</Label>
              <span className="text-xs text-primary font-mono">
                {stem.effects.filter.resonance.toFixed(0)}%
              </span>
            </div>
            <Slider
              value={[stem.effects.filter.resonance]}
              min={0}
              max={100}
              step={1}
              onValueChange={([v]) => 
                onEffectChange('filter', { ...stem.effects.filter, resonance: v })
              }
            />
          </div>
        </div>
      </div>

      {/* Effect Sliders */}
      <div className="grid gap-4">
        {EFFECT_CONFIGS.map(({ key, label, icon, min = 0, max = 100 }) => {
          const value = stem.effects[key as keyof StemEffects];
          if (typeof value !== 'number') return null;

          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{icon}</span> {label}
                </Label>
                <span className="text-xs text-primary font-mono tabular-nums">
                  {key === 'pitchShift' ? `${value > 0 ? '+' : ''}${value} st` : 
                   key === 'timeStretch' ? `${value}%` : 
                   `${value.toFixed(0)}%`}
                </span>
              </div>
              <Slider
                value={[value]}
                min={min}
                max={max}
                step={key === 'pitchShift' ? 1 : key === 'timeStretch' ? 5 : 1}
                onValueChange={([v]) => onEffectChange(key as keyof StemEffects, v)}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:shadow-[0_0_10px_hsl(var(--primary))]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
