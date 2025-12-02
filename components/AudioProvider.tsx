"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type AudioContextValue = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }

  return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const previousSrcRef = useRef<string | null>(null);
  const wasPlayingRef = useRef(false);

  // Determine which audio file to play based on the route
  const getAudioSrc = useCallback(() => {
    if (pathname?.includes("/events/cruise-gang-44db")) {
      return "/Idanski.mp3";
    } else if (pathname?.includes("/events/waved")) {
      return "/shakabulizzy.mp3";
    } else if (pathname?.includes("/events/sv-dance-forever")) {
      return "/song.mp3";
    }
    // Default to idanski for home page or other pages
    return "/Idanski.mp3";
  }, [pathname]);

  const audioSrc = getAudioSrc();

  // Initialize audio source on mount and handle route changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const newSrc = getAudioSrc();
    
    // Get current source path (handle both relative and absolute URLs)
    let currentSrc = "";
    if (audio.src) {
      try {
        const url = new URL(audio.src);
        currentSrc = url.pathname;
      } catch {
        // If it's already a relative path
        currentSrc = audio.src;
      }
    }
    
    // Only update if the source actually changed
    if (currentSrc !== newSrc) {
      const wasPlaying = isPlaying;
      
      // Update the source
      audio.src = newSrc;
      audio.load();
      
      // Restore playback state if it was playing
      if (wasPlaying) {
        // Use a small timeout to ensure the audio is loaded
        setTimeout(() => {
          const playPromise = audio.play();
          if (playPromise instanceof Promise) {
            playPromise.catch(() => undefined);
          }
        }, 100);
      }
    }

    previousSrcRef.current = newSrc;
  }, [audioSrc, getAudioSrc, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise instanceof Promise) {
      playPromise.catch(() => undefined);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const value = useMemo(
    () => ({
      isPlaying,
      play,
      pause,
      toggle,
    }),
    [isPlaying, pause, play, toggle]
  );

  return (
    <AudioContext.Provider value={value}>
      <audio ref={audioRef} preload="auto" loop />
      {children}
    </AudioContext.Provider>
  );
};
