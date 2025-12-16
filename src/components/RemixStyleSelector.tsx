import { RemixStyle } from '@/types/audio';
import { REMIX_STYLES } from '@/lib/remixEngine';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface RemixStyleSelectorProps {
  selectedStyle: RemixStyle | null;
  onSelectStyle: (style: RemixStyle) => void;
}

export function RemixStyleSelector({ selectedStyle, onSelectStyle }: RemixStyleSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
        <span className="text-2xl">🎨</span>
        Remix Styles
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {REMIX_STYLES.map((style, index) => (
          <motion.button
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectStyle(style)}
            className={cn(
              'relative p-4 rounded-xl text-left transition-all duration-300',
              'border border-border/50 backdrop-blur-sm',
              'hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]',
              'group overflow-hidden',
              selectedStyle?.id === style.id && [
                'border-primary bg-primary/10',
                'shadow-[0_0_40px_hsl(var(--primary)/0.4)]',
                'ring-2 ring-primary/50'
              ]
            )}
          >
            {/* Background glow */}
            <div className={cn(
              'absolute inset-0 opacity-0 transition-opacity duration-300',
              'bg-gradient-to-br from-primary/20 via-transparent to-secondary/20',
              'group-hover:opacity-100',
              selectedStyle?.id === style.id && 'opacity-100'
            )} />
            
            <div className="relative z-10">
              <div className="text-3xl mb-2">{style.icon}</div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                {style.name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {style.description}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-primary/70 font-mono">
                  {(style.bpmMultiplier * 100).toFixed(0)}% BPM
                </span>
              </div>
            </div>

            {/* Selection indicator */}
            {selectedStyle?.id === style.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
