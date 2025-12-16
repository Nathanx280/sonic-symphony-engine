import { ProcessingState } from '@/types/audio';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProcessingOverlayProps {
  state: ProcessingState;
}

const PROCESSING_MESSAGES = {
  idle: '',
  uploading: 'Uploading audio file...',
  analyzing: 'Analyzing song characteristics...',
  separating: 'Separating stems with AI...',
  remixing: 'Applying intelligent remix algorithms...',
  exporting: 'Rendering final mix...',
  complete: 'Remix complete!',
  error: 'An error occurred'
};

export function ProcessingOverlay({ state }: ProcessingOverlayProps) {
  if (state.status === 'idle' || state.status === 'complete') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl"
      >
        <div className="text-center space-y-8">
          {/* Animated visualization */}
          <div className="relative w-48 h-48 mx-auto">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              style={{
                borderTopColor: 'hsl(var(--primary))',
                boxShadow: '0 0 30px hsl(var(--primary) / 0.3)'
              }}
            />
            
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border-2 border-secondary/30"
              style={{
                borderTopColor: 'hsl(var(--secondary))',
                boxShadow: '0 0 20px hsl(var(--secondary) / 0.3)'
              }}
            />
            
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 rounded-full border-2 border-accent/30"
              style={{
                borderTopColor: 'hsl(var(--accent))',
                boxShadow: '0 0 15px hsl(var(--accent) / 0.3)'
              }}
            />

            {/* Center pulse */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50"
              style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.5)' }}
            />

            {/* Waveform bars */}
            <div className="absolute inset-0 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scaleY: [0.3, 1, 0.3],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: 'easeInOut'
                  }}
                  className="w-2 h-12 rounded-full bg-foreground"
                />
              ))}
            </div>
          </div>

          {/* Status text */}
          <div className="space-y-4">
            <motion.h2
              key={state.status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl font-bold text-foreground"
            >
              {PROCESSING_MESSAGES[state.status]}
            </motion.h2>
            
            <p className="text-muted-foreground">{state.message}</p>

            {/* Progress bar */}
            <div className="w-80 mx-auto">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${state.progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                  style={{ boxShadow: '0 0 20px hsl(var(--primary))' }}
                />
              </div>
              <p className="text-sm text-primary mt-2 font-mono">
                {state.progress.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
