export interface Stem {
  id: string;
  name: string;
  type: 'vocals' | 'drums' | 'bass' | 'melody' | 'other';
  color: string;
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
  effects: StemEffects;
  waveformData: number[];
}

export interface StemEffects {
  reverb: number;
  delay: number;
  distortion: number;
  pitchShift: number;
  timeStretch: number;
  filter: {
    type: 'lowpass' | 'highpass' | 'bandpass';
    frequency: number;
    resonance: number;
  };
  compression: number;
  chorus: number;
  phaser: number;
  bitcrush: number;
}

export interface RemixStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  bpmMultiplier: number;
  stemTransforms: {
    [key: string]: Partial<StemEffects> & { volumeMultiplier?: number };
  };
  arrangement: ArrangementPattern;
}

export interface ArrangementPattern {
  intro: number[];
  verse: number[];
  chorus: number[];
  bridge: number[];
  drop: number[];
  outro: number[];
}

export interface SongAnalysis {
  bpm: number;
  key: string;
  energy: number;
  danceability: number;
  mood: string;
  duration: number;
}

export interface RemixSettings {
  style: RemixStyle;
  intensity: number;
  randomness: number;
  preserveVocals: boolean;
  autoArrange: boolean;
  targetBpm: number | null;
  targetKey: string | null;
}

export interface ProcessingState {
  status: 'idle' | 'uploading' | 'analyzing' | 'separating' | 'remixing' | 'exporting' | 'complete' | 'error';
  progress: number;
  message: string;
}
