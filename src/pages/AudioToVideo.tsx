import { motion } from 'framer-motion';
import { MainNav } from '@/components/MainNav';
import { Video, Palette, Type, Sparkles, Image, CircleDot, Waves, RotateCcw } from 'lucide-react';

const visualStyles = [
  { name: 'Classic Bars', icon: '📊' },
  { name: 'Rounded', icon: '🔵' },
  { name: 'Dots', icon: '⚫' },
  { name: 'Blocks', icon: '🟦' },
  { name: 'Circular', icon: '⭕' },
  { name: 'Radial', icon: '🌀' },
  { name: 'Wave', icon: '🌊' },
  { name: 'Comic', icon: '💥' },
];

export default function AudioToVideo() {
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--accent)/0.5)]">
                <Video className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-wider bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                  AUDIO TO VIDEO
                </h1>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  Music Visualizer Generator
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
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <Video className="w-10 h-10 text-accent" />
            </div>
            
            <h2 className="font-display text-3xl font-bold">Music Visualizer Generator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create stunning music visualizer videos with customizable templates, 
              backgrounds, color schemes, and effects. Perfect for social media, 
              streaming, and music promotion.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
              {visualStyles.map((style, i) => (
                <motion.div
                  key={style.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-all cursor-pointer hover:scale-105"
                >
                  <div className="text-3xl mb-2">{style.icon}</div>
                  <p className="text-sm font-medium">{style.name}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Palette className="w-4 h-4" /> Color Schemes
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Image className="w-4 h-4" /> Custom Backgrounds
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Type className="w-4 h-4" /> Text Overlays
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" /> Particle Effects
              </div>
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
