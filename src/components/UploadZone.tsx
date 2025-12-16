import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Music, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onFileAccepted: (file: File) => void;
  currentFile: File | null;
  onClear: () => void;
}

export function UploadZone({ onFileAccepted, currentFile, onClear }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a']
    },
    maxFiles: 1,
    noClick: !!currentFile,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden',
        'cursor-pointer group',
        isDragActive 
          ? 'border-primary bg-primary/10 shadow-[0_0_60px_hsl(var(--primary)/0.4)]' 
          : 'border-border/50 hover:border-primary/50 hover:bg-muted/30'
      )}
    >
      <input {...getInputProps()} />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <AnimatePresence mode="wait">
        {currentFile ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative p-8 flex items-center gap-6"
          >
            {/* Animated icon */}
            <div className="relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(var(--primary) / 0.3)',
                    '0 0 40px hsl(var(--primary) / 0.5)',
                    '0 0 20px hsl(var(--primary) / 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                <Music className="w-8 h-8 text-primary-foreground" />
              </motion.div>
            </div>
            
            {/* File info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-lg font-semibold text-foreground truncate">
                {currentFile.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {(currentFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to process
              </p>
            </div>

            {/* Clear button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-5 h-5" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-12 text-center"
          >
            <motion.div
              animate={{ y: isDragActive ? -10 : 0 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6 group-hover:bg-primary/10 transition-colors"
            >
              <Upload className={cn(
                'w-10 h-10 transition-colors',
                isDragActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
              )} />
            </motion.div>
            
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {isDragActive ? 'Drop your track here' : 'Upload Your Track'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag & drop an audio file or click to browse
            </p>
            <p className="text-xs text-muted-foreground/60">
              Supports MP3, WAV, FLAC, AAC, OGG, M4A
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag overlay effect */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
