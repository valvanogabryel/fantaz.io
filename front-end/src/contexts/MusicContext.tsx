'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Howl } from 'howler';

const MusicContext = createContext<any>(null);

const ambientSound = new Howl({
  src: ['/sounds/songs/ambience.mp3'],
  loop: true,
  volume: 0.05,
  html5: true,
});

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    ambientSound.volume(volume);
    ambientSound.mute(muted);
  }, [volume, muted]);

  const play = () => {
    if (!isPlaying) {
      ambientSound.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    ambientSound.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    isPlaying ? pause() : play();
  };

  return (
    <MusicContext.Provider
      value={{ isPlaying, volume, muted, play, pause, toggle, setVolume, setMuted }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
