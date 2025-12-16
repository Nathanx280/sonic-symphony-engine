import { motion } from 'framer-motion';
import { MainNav } from '@/components/MainNav';
import { GitMerge, Upload, Layers, Sliders, Wand2, Download } from 'lucide-react';

export default function RemixMerge() {
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <GitMerge className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-wider bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  REMIX MERGE
                </h1>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  Multi-Track Mashup Studio
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
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <GitMerge className="w-10 h-10 text-green-400" />
            </div>
            
            <h2 className="font-display text-3xl font-bold">Multi-Track Mashup Studio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combine multiple audio tracks into seamless mashups. Align BPM, match keys, 
              crossfade transitions, and create professional DJ-quality mixes with 
              intelligent auto-alignment.
            </p>

            <div className="flex justify-center gap-4 pt-6">
              {[1, 2, 3].map((track) => (
                <motion.div
                  key={track}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: track * 0.1 }}
                  className="w-32 h-40 rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-2 hover:border-green-500/50 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Track {track}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                <Layers className="w-5 h-5 mx-auto mb-2 text-green-400" />
                <p className="text-xs font-medium">Layer Tracks</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                <Sliders className="w-5 h-5 mx-auto mb-2 text-green-400" />
                <p className="text-xs font-medium">BPM Sync</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                <Wand2 className="w-5 h-5 mx-auto mb-2 text-green-400" />
                <p className="text-xs font-medium">Key Match</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                <Download className="w-5 h-5 mx-auto mb-2 text-green-400" />
                <p className="text-xs font-medium">Export Mix</p>
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
