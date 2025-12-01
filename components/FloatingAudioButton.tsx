"use client";

import { Pause, Play } from "lucide-react";
import { useAudio } from "@/components/AudioProvider";

export const FloatingAudioButton = () => {
  const { isPlaying, toggle } = useAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
      aria-pressed={isPlaying}
      className="fixed bottom-6 right-6 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {isPlaying ? (
        <Pause className="h-6 w-6" />
      ) : (
        <Play className="h-6 w-6 translate-x-0.5" />
      )}
    </button>
  );
};
