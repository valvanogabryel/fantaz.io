'use client';

import { useMusic } from '@/contexts/MusicContext';
import { Volume2, VolumeX, Pause, Play, Music2Icon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { CoolMode } from './magicui/cool-mode';

export default function MusicControls() {
  const { isPlaying, toggle, volume, setVolume, muted, setMuted } = useMusic();
  const [expanded, setExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Delay pra recolher
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 500); // <-- Delay de recolhimento aqui
  };

  // Partículas animadas
  const particles = Array.from({ length: 5 });

  return (
    <motion.div 
      className="fixed bottom-4 right-4 bg-white/20 backdrop-blur-md rounded-lg shadow p-3 flex items-center z-50 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ width: '44px' }}
      animate={{ 
        width: expanded ? 'auto' : '44px',
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <motion.div 
        className="relative flex items-center gap-4"
        initial={false}
        animate={{ 
          width: expanded ? 'auto' : '20px',
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
      >
        {/* Botão de som */}
          <motion.button 
            onClick={() => setMuted(!muted)} 
            className="flex-shrink-0 relative"
            layout
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}

            {/* Partículas quando tocando */}
            {/* {!muted && isPlaying && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none">
                {particles.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-white rounded-full absolute"
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [-2, -10, -20],
                      scale: [0.6, 1, 0.4],
                    }}
                    transition={{
                      duration: 1 + i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                    style={{ left: `${i * 2}px` }}
                  />
                ))}
              </div>
            )} */}
          </motion.button>

        {/* Controles expandíveis */}
        <AnimatePresence>
          {expanded && (
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: 1, 
                width: 'auto',
                transition: { 
                  opacity: { duration: 0.2, delay: 0.1 },
                  width: { duration: 0.3 }
                }
              }}
              exit={{ 
                opacity: 0, 
                width: 0,
                transition: { 
                  opacity: { duration: 0.2 },
                  width: { duration: 0.3, delay: 0.1 }
                }
              }}
            >
              {/* Botão play/pause */}
              <motion.button 
                onClick={toggle} 
                className="flex-shrink-0"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>
              
              {/* Slider de volume */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Slider
                  defaultValue={[volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0] / 100)}
                  className="w-24"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
