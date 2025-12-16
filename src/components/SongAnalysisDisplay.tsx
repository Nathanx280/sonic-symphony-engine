import { SongAnalysis } from '@/types/audio';
import { motion } from 'framer-motion';
import { Music, Gauge, Sparkles, Heart, Clock } from 'lucide-react';
import { formatTime } from '@/lib/remixEngine';

interface SongAnalysisDisplayProps {
  analysis: SongAnalysis | null;
}

export function SongAnalysisDisplay({ analysis }: SongAnalysisDisplayProps) {
  if (!analysis) {
    return (
      <div className="glass-panel p-6 text-center">
        <p className="text-muted-foreground">Upload a song to see analysis</p>
      </div>
    );
  }

  const stats = [
    { 
      icon: <Gauge className="w-5 h-5" />, 
      label: 'BPM', 
      value: analysis.bpm.toString(),
      color: 'text-neon-cyan'
    },
    { 
      icon: <Music className="w-5 h-5" />, 
      label: 'Key', 
      value: analysis.key,
      color: 'text-neon-magenta'
    },
    { 
      icon: <Sparkles className="w-5 h-5" />, 
      label: 'Energy', 
      value: `${analysis.energy.toFixed(0)}%`,
      color: 'text-neon-orange'
    },
    { 
      icon: <Heart className="w-5 h-5" />, 
      label: 'Mood', 
      value: analysis.mood,
      color: 'text-neon-purple'
    },
    { 
      icon: <Clock className="w-5 h-5" />, 
      label: 'Duration', 
      value: formatTime(analysis.duration),
      color: 'text-neon-green'
    },
  ];

  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        <Music className="w-5 h-5 text-primary" />
        Song Analysis
      </h3>
      
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`${stat.color} mb-2 flex justify-center`}>
              {stat.icon}
            </div>
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className="font-display text-lg font-semibold text-foreground">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Visual bars for energy and danceability */}
      <div className="mt-6 space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Energy</span>
            <span className="text-primary">{analysis.energy.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysis.energy}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full"
              style={{ boxShadow: '0 0 10px hsl(var(--neon-cyan))' }}
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Danceability</span>
            <span className="text-secondary">{analysis.danceability.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysis.danceability}%` }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-full bg-gradient-to-r from-neon-magenta to-neon-purple rounded-full"
              style={{ boxShadow: '0 0 10px hsl(var(--neon-magenta))' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
