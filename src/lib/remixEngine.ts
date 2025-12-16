import { Stem, StemEffects, RemixStyle, SongAnalysis, RemixSettings } from '@/types/audio';

// Sophisticated remix styles with complex transformations
export const REMIX_STYLES: RemixStyle[] = [
  {
    id: 'trap-flip',
    name: 'Trap Flip',
    description: 'Heavy 808s, hi-hat rolls, dark atmosphere',
    icon: '🔥',
    bpmMultiplier: 0.75,
    stemTransforms: {
      drums: { distortion: 40, compression: 80, bitcrush: 15, volumeMultiplier: 1.4 },
      bass: { distortion: 60, filter: { type: 'lowpass', frequency: 200, resonance: 70 }, volumeMultiplier: 1.6 },
      vocals: { reverb: 45, delay: 30, pitchShift: -2, volumeMultiplier: 0.9 },
      melody: { reverb: 60, delay: 40, filter: { type: 'lowpass', frequency: 3000, resonance: 40 }, volumeMultiplier: 0.7 }
    },
    arrangement: { intro: [0, 0, 0, 1], verse: [1, 1, 1, 1], chorus: [1, 1, 1, 1], bridge: [0, 1, 0, 1], drop: [1, 1, 1, 1], outro: [0, 0, 1, 0] }
  },
  {
    id: 'dnb-refix',
    name: 'DnB Refix',
    description: 'Breakbeats, jungle vibes, high energy',
    icon: '⚡',
    bpmMultiplier: 1.8,
    stemTransforms: {
      drums: { timeStretch: 180, distortion: 25, compression: 90, volumeMultiplier: 1.3 },
      bass: { distortion: 35, filter: { type: 'bandpass', frequency: 150, resonance: 60 }, timeStretch: 180, volumeMultiplier: 1.4 },
      vocals: { reverb: 35, delay: 50, chorus: 30, volumeMultiplier: 0.85 },
      melody: { phaser: 50, delay: 60, filter: { type: 'highpass', frequency: 500, resonance: 30 }, volumeMultiplier: 0.8 }
    },
    arrangement: { intro: [1, 0, 0, 1], verse: [1, 1, 0, 1], chorus: [1, 1, 1, 1], bridge: [1, 0, 0, 0], drop: [1, 1, 1, 1], outro: [1, 0, 0, 1] }
  },
  {
    id: 'house-rework',
    name: 'House Rework',
    description: 'Four-on-floor, groovy basslines, club ready',
    icon: '🏠',
    bpmMultiplier: 1.0,
    stemTransforms: {
      drums: { compression: 70, filter: { type: 'highpass', frequency: 80, resonance: 20 }, volumeMultiplier: 1.2 },
      bass: { filter: { type: 'lowpass', frequency: 250, resonance: 50 }, compression: 60, volumeMultiplier: 1.3 },
      vocals: { reverb: 50, delay: 25, filter: { type: 'highpass', frequency: 200, resonance: 20 }, volumeMultiplier: 1.0 },
      melody: { chorus: 40, phaser: 30, reverb: 45, volumeMultiplier: 0.9 }
    },
    arrangement: { intro: [1, 0, 0, 0], verse: [1, 1, 0, 1], chorus: [1, 1, 1, 1], bridge: [1, 1, 0, 0], drop: [1, 1, 1, 1], outro: [1, 0, 0, 0] }
  },
  {
    id: 'ambient-deconstruct',
    name: 'Ambient Deconstruct',
    description: 'Ethereal textures, stretched time, dreamscape',
    icon: '🌌',
    bpmMultiplier: 0.4,
    stemTransforms: {
      drums: { reverb: 90, timeStretch: 300, volumeMultiplier: 0.3 },
      bass: { reverb: 80, filter: { type: 'lowpass', frequency: 100, resonance: 80 }, timeStretch: 400, volumeMultiplier: 0.5 },
      vocals: { reverb: 95, delay: 80, pitchShift: -5, timeStretch: 250, volumeMultiplier: 0.7 },
      melody: { reverb: 100, delay: 90, chorus: 60, timeStretch: 350, volumeMultiplier: 0.8 }
    },
    arrangement: { intro: [0, 0, 0, 1], verse: [0, 0, 1, 1], chorus: [0, 1, 1, 1], bridge: [0, 0, 0, 1], drop: [0, 1, 1, 1], outro: [0, 0, 0, 1] }
  },
  {
    id: 'glitch-core',
    name: 'Glitch Core',
    description: 'Chopped, stuttered, digital chaos',
    icon: '💥',
    bpmMultiplier: 1.2,
    stemTransforms: {
      drums: { bitcrush: 60, distortion: 50, compression: 95, volumeMultiplier: 1.1 },
      bass: { bitcrush: 40, distortion: 70, filter: { type: 'bandpass', frequency: 200, resonance: 90 }, volumeMultiplier: 1.2 },
      vocals: { bitcrush: 30, delay: 70, reverb: 40, pitchShift: 3, volumeMultiplier: 0.8 },
      melody: { bitcrush: 50, phaser: 70, delay: 80, volumeMultiplier: 0.7 }
    },
    arrangement: { intro: [1, 0, 1, 0], verse: [1, 1, 0, 1], chorus: [1, 1, 1, 1], bridge: [0, 1, 1, 0], drop: [1, 1, 1, 1], outro: [1, 0, 1, 0] }
  },
  {
    id: 'synthwave-reimagine',
    name: 'Synthwave Reimagine',
    description: '80s nostalgia, arpeggios, neon sunset',
    icon: '🌅',
    bpmMultiplier: 0.9,
    stemTransforms: {
      drums: { reverb: 50, compression: 60, filter: { type: 'highpass', frequency: 100, resonance: 30 }, volumeMultiplier: 1.0 },
      bass: { distortion: 20, chorus: 50, filter: { type: 'lowpass', frequency: 300, resonance: 60 }, volumeMultiplier: 1.2 },
      vocals: { reverb: 60, delay: 40, chorus: 30, volumeMultiplier: 1.0 },
      melody: { chorus: 70, phaser: 40, reverb: 55, delay: 50, volumeMultiplier: 1.1 }
    },
    arrangement: { intro: [0, 0, 0, 1], verse: [1, 1, 0, 1], chorus: [1, 1, 1, 1], bridge: [0, 1, 0, 1], drop: [1, 1, 1, 1], outro: [0, 0, 0, 1] }
  },
  {
    id: 'lo-fi-chill',
    name: 'Lo-Fi Chill',
    description: 'Vinyl crackle, jazzy chords, study beats',
    icon: '☕',
    bpmMultiplier: 0.7,
    stemTransforms: {
      drums: { bitcrush: 20, filter: { type: 'lowpass', frequency: 8000, resonance: 20 }, compression: 50, volumeMultiplier: 0.9 },
      bass: { filter: { type: 'lowpass', frequency: 400, resonance: 40 }, compression: 40, volumeMultiplier: 1.1 },
      vocals: { reverb: 40, filter: { type: 'lowpass', frequency: 6000, resonance: 30 }, volumeMultiplier: 0.7 },
      melody: { chorus: 30, reverb: 50, filter: { type: 'lowpass', frequency: 5000, resonance: 25 }, volumeMultiplier: 1.0 }
    },
    arrangement: { intro: [1, 0, 0, 1], verse: [1, 1, 0, 1], chorus: [1, 1, 1, 1], bridge: [1, 0, 0, 1], drop: [1, 1, 1, 1], outro: [1, 0, 0, 1] }
  },
  {
    id: 'hardstyle-mutation',
    name: 'Hardstyle Mutation',
    description: 'Distorted kicks, euphoric leads, 150+ BPM',
    icon: '🎪',
    bpmMultiplier: 1.5,
    stemTransforms: {
      drums: { distortion: 80, compression: 100, bitcrush: 10, volumeMultiplier: 1.5 },
      bass: { distortion: 90, filter: { type: 'lowpass', frequency: 150, resonance: 90 }, volumeMultiplier: 1.6 },
      vocals: { pitchShift: 2, reverb: 60, delay: 30, volumeMultiplier: 0.8 },
      melody: { distortion: 30, phaser: 50, reverb: 40, volumeMultiplier: 1.2 }
    },
    arrangement: { intro: [1, 0, 0, 0], verse: [1, 1, 0, 1], chorus: [1, 1, 1, 1], bridge: [0, 0, 0, 1], drop: [1, 1, 1, 1], outro: [1, 0, 0, 0] }
  },
  {
    id: 'drill-edit',
    name: 'Drill Edit',
    description: 'Sliding 808s, UK/NY drill patterns',
    icon: '🔫',
    bpmMultiplier: 0.95,
    stemTransforms: {
      drums: { compression: 85, distortion: 20, volumeMultiplier: 1.3 },
      bass: { pitchShift: -3, distortion: 55, filter: { type: 'lowpass', frequency: 180, resonance: 75 }, volumeMultiplier: 1.5 },
      vocals: { reverb: 30, delay: 20, volumeMultiplier: 1.0 },
      melody: { reverb: 50, filter: { type: 'lowpass', frequency: 4000, resonance: 35 }, volumeMultiplier: 0.75 }
    },
    arrangement: { intro: [0, 0, 0, 0], verse: [1, 1, 1, 1], chorus: [1, 1, 1, 1], bridge: [1, 1, 0, 0], drop: [1, 1, 1, 1], outro: [0, 1, 0, 0] }
  },
  {
    id: 'psytrance-warp',
    name: 'Psytrance Warp',
    description: 'Rolling basslines, psychedelic textures, 145 BPM',
    icon: '🍄',
    bpmMultiplier: 1.45,
    stemTransforms: {
      drums: { compression: 75, filter: { type: 'highpass', frequency: 60, resonance: 25 }, volumeMultiplier: 1.2 },
      bass: { distortion: 45, filter: { type: 'bandpass', frequency: 200, resonance: 85 }, phaser: 60, volumeMultiplier: 1.4 },
      vocals: { delay: 70, reverb: 75, phaser: 50, pitchShift: 1, volumeMultiplier: 0.6 },
      melody: { phaser: 80, delay: 60, reverb: 55, filter: { type: 'bandpass', frequency: 2000, resonance: 50 }, volumeMultiplier: 1.0 }
    },
    arrangement: { intro: [1, 1, 0, 0], verse: [1, 1, 0, 1], chorus: [1, 1, 1, 1], bridge: [1, 1, 0, 0], drop: [1, 1, 1, 1], outro: [1, 1, 0, 0] }
  }
];

// Generate fake but realistic waveform data
export function generateWaveformData(length: number = 200): number[] {
  const data: number[] = [];
  let prev = 0.5;
  
  for (let i = 0; i < length; i++) {
    const noise = (Math.random() - 0.5) * 0.3;
    const wave = Math.sin(i * 0.1) * 0.2;
    const value = Math.max(0.1, Math.min(1, prev + noise + wave * 0.1));
    prev = value * 0.7 + prev * 0.3;
    data.push(value);
  }
  
  return data;
}

// Analyze song characteristics
export function analyzeSong(): SongAnalysis {
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const modes = ['maj', 'min'];
  const moods = ['Energetic', 'Melancholic', 'Uplifting', 'Dark', 'Chill', 'Aggressive', 'Dreamy', 'Nostalgic'];
  
  return {
    bpm: Math.floor(Math.random() * 60) + 90,
    key: `${keys[Math.floor(Math.random() * keys.length)]} ${modes[Math.floor(Math.random() * modes.length)]}`,
    energy: Math.random() * 100,
    danceability: Math.random() * 100,
    mood: moods[Math.floor(Math.random() * moods.length)],
    duration: Math.floor(Math.random() * 180) + 120
  };
}

// Create default stems from uploaded audio
export function createDefaultStems(): Stem[] {
  const stemTypes: Array<{ type: Stem['type']; name: string; color: string }> = [
    { type: 'vocals', name: 'Vocals', color: 'hsl(320, 100%, 60%)' },
    { type: 'drums', name: 'Drums', color: 'hsl(180, 100%, 50%)' },
    { type: 'bass', name: 'Bass', color: 'hsl(280, 100%, 65%)' },
    { type: 'melody', name: 'Melody', color: 'hsl(25, 100%, 55%)' }
  ];

  return stemTypes.map((stem, index) => ({
    id: `stem-${index}`,
    name: stem.name,
    type: stem.type,
    color: stem.color,
    volume: 100,
    pan: 0,
    muted: false,
    solo: false,
    effects: getDefaultEffects(),
    waveformData: generateWaveformData()
  }));
}

export function getDefaultEffects(): StemEffects {
  return {
    reverb: 0,
    delay: 0,
    distortion: 0,
    pitchShift: 0,
    timeStretch: 100,
    filter: { type: 'lowpass', frequency: 20000, resonance: 0 },
    compression: 0,
    chorus: 0,
    phaser: 0,
    bitcrush: 0
  };
}

// Apply remix transformations with randomization
export function applyRemixTransformations(
  stems: Stem[],
  settings: RemixSettings
): Stem[] {
  const { style, intensity, randomness } = settings;
  
  return stems.map(stem => {
    const transforms = style.stemTransforms[stem.type] || {};
    const newEffects = { ...stem.effects };
    
    // Apply each effect with intensity and randomness
    Object.entries(transforms).forEach(([key, value]) => {
      if (key === 'volumeMultiplier') return;
      if (key === 'filter' && typeof value === 'object') {
        newEffects.filter = value as StemEffects['filter'];
      } else if (typeof value === 'number') {
        const randomFactor = 1 + (Math.random() - 0.5) * (randomness / 50);
        (newEffects as any)[key] = Math.min(100, value * (intensity / 100) * randomFactor);
      }
    });
    
    const volumeMultiplier = transforms.volumeMultiplier || 1;
    const randomVolume = 1 + (Math.random() - 0.5) * (randomness / 100);
    
    return {
      ...stem,
      volume: Math.min(150, stem.volume * volumeMultiplier * randomVolume),
      effects: newEffects,
      waveformData: generateWaveformData() // New waveform for remix
    };
  });
}

// Format time display
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
