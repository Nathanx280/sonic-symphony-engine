import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stem, StemEffects, RemixSettings, ProcessingState, SongAnalysis } from '@/types/audio';
import { 
  REMIX_STYLES, 
  createDefaultStems, 
  analyzeSong, 
  applyRemixTransformations,
  getDefaultEffects
} from '@/lib/remixEngine';
import { UploadZone } from '@/components/UploadZone';
import { StemTrack } from '@/components/StemTrack';
import { EffectsPanel } from '@/components/EffectsPanel';
import { RemixStyleSelector } from '@/components/RemixStyleSelector';
import { RemixControls } from '@/components/RemixControls';
import { SongAnalysisDisplay } from '@/components/SongAnalysisDisplay';
import { ProcessingOverlay } from '@/components/ProcessingOverlay';
import { TransportControls } from '@/components/TransportControls';
import { WaveformVisualizer } from '@/components/WaveformVisualizer';
import { MainNav } from '@/components/MainNav';
import { toast } from 'sonner';
import { Zap } from 'lucide-react';

export default function Index() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [stems, setStems] = useState<Stem[]>([]);
  const [selectedStemId, setSelectedStemId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SongAnalysis | null>(null);
  const [masterWaveform, setMasterWaveform] = useState<number[]>([]);
  
  const [remixSettings, setRemixSettings] = useState<RemixSettings>({
    style: REMIX_STYLES[0],
    intensity: 75,
    randomness: 30,
    preserveVocals: true,
    autoArrange: true,
    targetBpm: null,
    targetKey: null
  });

  const [processingState, setProcessingState] = useState<ProcessingState>({
    status: 'idle',
    progress: 0,
    message: ''
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);

  const selectedStem = stems.find(s => s.id === selectedStemId) || null;

  // Simulated playback progress
  useEffect(() => {
    if (!isPlaying || !analysis) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= analysis.duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, analysis]);

  const handleFileAccepted = useCallback(async (file: File) => {
    setAudioFile(file);
    setProcessingState({ status: 'uploading', progress: 0, message: 'Reading audio file...' });
    
    // Simulate upload
    await simulateProgress(20, 'Uploading audio data...');
    
    // Analyze
    setProcessingState({ status: 'analyzing', progress: 20, message: 'Detecting tempo and key...' });
    await simulateProgress(40, 'Analyzing frequency spectrum...');
    const songAnalysis = analyzeSong();
    setAnalysis(songAnalysis);
    
    // Separate stems
    setProcessingState({ status: 'separating', progress: 40, message: 'Isolating vocals...' });
    await simulateProgress(60, 'Extracting drum patterns...');
    await simulateProgress(80, 'Separating bass frequencies...');
    await simulateProgress(95, 'Isolating melodic elements...');
    
    const newStems = createDefaultStems();
    setStems(newStems);
    setMasterWaveform(newStems[0].waveformData);
    
    setProcessingState({ status: 'complete', progress: 100, message: 'Ready to remix!' });
    setTimeout(() => {
      setProcessingState({ status: 'idle', progress: 0, message: '' });
    }, 1000);
    
    toast.success('Audio processed successfully!', {
      description: `Detected ${songAnalysis.bpm} BPM in ${songAnalysis.key}`
    });
  }, []);

  const simulateProgress = (target: number, message: string): Promise<void> => {
    return new Promise(resolve => {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        setProcessingState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 2, target),
          message
        }));
        if (current >= target - (target > 20 ? 20 : 0)) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  const handleRemix = useCallback(async () => {
    if (!remixSettings.style || stems.length === 0) {
      toast.error('Please upload a song and select a remix style');
      return;
    }

    setProcessingState({ status: 'remixing', progress: 0, message: 'Initializing remix engine...' });
    
    await simulateProgress(30, 'Applying stem transformations...');
    await simulateProgress(60, 'Processing effects chains...');
    await simulateProgress(85, 'Generating new arrangements...');
    
    const remixedStems = applyRemixTransformations(stems, remixSettings);
    setStems(remixedStems);
    
    // Generate new master waveform
    const newWaveform = remixedStems[0].waveformData.map((_, i) => {
      return remixedStems.reduce((sum, stem) => {
        return sum + (stem.muted ? 0 : stem.waveformData[i] * (stem.volume / 100));
      }, 0) / remixedStems.length;
    });
    setMasterWaveform(newWaveform);
    
    setProcessingState({ status: 'complete', progress: 100, message: 'Remix generated!' });
    setTimeout(() => {
      setProcessingState({ status: 'idle', progress: 0, message: '' });
    }, 1000);

    toast.success(`${remixSettings.style.name} remix created!`, {
      description: 'Your track has been transformed'
    });
  }, [stems, remixSettings]);

  const handleRandomize = useCallback(() => {
    const randomStyle = REMIX_STYLES[Math.floor(Math.random() * REMIX_STYLES.length)];
    setRemixSettings({
      style: randomStyle,
      intensity: Math.floor(Math.random() * 60) + 40,
      randomness: Math.floor(Math.random() * 70) + 20,
      preserveVocals: Math.random() > 0.3,
      autoArrange: Math.random() > 0.4,
      targetBpm: null,
      targetKey: null
    });
    toast.info('Settings randomized!', { description: `Selected: ${randomStyle.name}` });
  }, []);

  const handleStemVolumeChange = useCallback((stemId: string, volume: number) => {
    setStems(prev => prev.map(s => s.id === stemId ? { ...s, volume } : s));
  }, []);

  const handleStemMuteToggle = useCallback((stemId: string) => {
    setStems(prev => prev.map(s => s.id === stemId ? { ...s, muted: !s.muted } : s));
  }, []);

  const handleStemSoloToggle = useCallback((stemId: string) => {
    setStems(prev => {
      const stem = prev.find(s => s.id === stemId);
      if (!stem) return prev;
      
      if (stem.solo) {
        // Unsolo - unmute all
        return prev.map(s => ({ ...s, solo: false, muted: false }));
      } else {
        // Solo - mute others
        return prev.map(s => ({
          ...s,
          solo: s.id === stemId,
          muted: s.id !== stemId
        }));
      }
    });
  }, []);

  const handleEffectChange = useCallback((effect: keyof StemEffects, value: any) => {
    if (!selectedStemId) return;
    setStems(prev => prev.map(s => {
      if (s.id !== selectedStemId) return s;
      return {
        ...s,
        effects: { ...s.effects, [effect]: value }
      };
    }));
  }, [selectedStemId]);

  const handleExport = useCallback(() => {
    setProcessingState({ status: 'exporting', progress: 0, message: 'Rendering audio...' });
    
    setTimeout(() => {
      setProcessingState({ status: 'complete', progress: 100, message: 'Export ready!' });
      setTimeout(() => {
        setProcessingState({ status: 'idle', progress: 0, message: '' });
        toast.success('Export complete!', {
          description: 'Your remix has been rendered (simulated)'
        });
      }, 1000);
    }, 2000);
  }, []);

  const progress = analysis ? currentTime / analysis.duration : 0;

  return (
    <div className="min-h-screen">
      <ProcessingOverlay state={processingState} />
      
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-wider bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  SONIC REMIX
                </h1>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  AI-Powered Stem Remixer
                </p>
              </div>
            </motion.div>
            <MainNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Upload Section */}
        {!audioFile && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <UploadZone
              onFileAccepted={handleFileAccepted}
              currentFile={audioFile}
              onClear={() => {
                setAudioFile(null);
                setStems([]);
                setAnalysis(null);
                setMasterWaveform([]);
              }}
            />
          </motion.section>
        )}

        {/* Main Workspace */}
        {audioFile && stems.length > 0 && (
          <>
            {/* Master Waveform & Transport */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="glass-panel p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">{audioFile.name}</h3>
                    <p className="text-sm text-muted-foreground">Master Output</p>
                  </div>
                </div>
                <WaveformVisualizer
                  data={masterWaveform}
                  color="hsl(var(--primary))"
                  isPlaying={isPlaying}
                  progress={progress}
                  height={100}
                  interactive
                  onSeek={(pos) => setCurrentTime(pos * (analysis?.duration || 0))}
                />
              </div>
              
              <TransportControls
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={analysis?.duration || 0}
                volume={volume}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onSeek={setCurrentTime}
                onVolumeChange={setVolume}
                onExport={handleExport}
              />
            </motion.section>

            {/* Analysis */}
            <SongAnalysisDisplay analysis={analysis} />

            {/* Remix Styles */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <RemixStyleSelector
                selectedStyle={remixSettings.style}
                onSelectStyle={(style) => setRemixSettings(prev => ({ ...prev, style }))}
              />
            </motion.section>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Stems & Effects */}
              <div className="lg:col-span-3 space-y-4">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <span className="text-2xl">🎚️</span>
                  Stem Mixer
                </h3>
                
                <div className="space-y-3">
                  {stems.map((stem, index) => (
                    <motion.div
                      key={stem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <StemTrack
                        stem={stem}
                        isPlaying={isPlaying}
                        progress={progress}
                        onVolumeChange={(v) => handleStemVolumeChange(stem.id, v)}
                        onMuteToggle={() => handleStemMuteToggle(stem.id)}
                        onSoloToggle={() => handleStemSoloToggle(stem.id)}
                        onSelect={() => setSelectedStemId(stem.id)}
                        isSelected={selectedStemId === stem.id}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Effects Panel */}
              <div className="space-y-4">
                <EffectsPanel
                  stem={selectedStem}
                  onEffectChange={handleEffectChange}
                />
                
                <RemixControls
                  settings={remixSettings}
                  onSettingsChange={(s) => setRemixSettings(prev => ({ ...prev, ...s }))}
                  onRemix={handleRemix}
                  onRandomize={handleRandomize}
                  isProcessing={processingState.status !== 'idle'}
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            SONIC REMIX • Professional AI-Powered Audio Remixing Engine
          </p>
        </div>
      </footer>
    </div>
  );
}
