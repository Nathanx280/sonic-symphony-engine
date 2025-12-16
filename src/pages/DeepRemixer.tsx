import { motion } from 'framer-motion';
import { MainNav } from '@/components/MainNav';
import { Wand2, Sliders, Waves, Timer, Music, Compass, Volume2, Sparkles, Radio, Cpu } from 'lucide-react';

const features = [
  { icon: <Waves className="w-5 h-5" />, name: 'Spectral Processing', desc: 'FFT-based spectral manipulation' },
  { icon: <Sparkles className="w-5 h-5" />, name: 'Granular Synthesis', desc: 'Micro-sound grain control' },
  { icon: <Timer className="w-5 h-5" />, name: 'Time Manipulation', desc: 'Stretch, reverse, stutter effects' },
  { icon: <Music className="w-5 h-5" />, name: 'Harmonic Processing', desc: 'Pitch shifting & harmonics' },
  { icon: <Radio className="w-5 h-5" />, name: 'Rhythmic Processing', desc: 'Beat slicing & quantization' },
  { icon: <Compass className="w-5 h-5" />, name: 'Spatial Processing', desc: '3D audio positioning' },
  { icon: <Volume2 className="w-5 h-5" />, name: 'Dynamic Processing', desc: 'Compression & limiting' },
  { icon: <Cpu className="w-5 h-5" />, name: 'Creative Effects', desc: 'Bit crush, tape wobble, glitch' },
];

export default function DeepRemixer() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-[0_0_30px_hsl(var(--secondary)/0.5)]">
                <Wand2 className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-wider bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                  DEEP REMIXER
                </h1>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  Deep Song Rework Studio
                </p>
              </div>
            </motion.div>
            <MainNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="glass-panel p-8 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
              <Wand2 className="w-10 h-10 text-secondary" />
            </div>
            
            <h2 className="font-display text-3xl font-bold">Deep Song Rework Studio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced audio processing with spectral manipulation, granular synthesis, 
              time-stretching, and AI-powered creative effects. Transform any track into 
              something entirely new.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-background/50 border border-border/50 hover:border-secondary/50 transition-colors"
                >
                  <div className="text-secondary mb-2">{feat.icon}</div>
                  <h3 className="font-medium text-sm">{feat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feat.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 text-sm text-muted-foreground">
              <p>🚧 Feature from Sonic Alchemist - Integration pending</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
