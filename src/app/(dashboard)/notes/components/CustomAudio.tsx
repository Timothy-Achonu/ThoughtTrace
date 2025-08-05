"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utils";

interface AudioWaveformProps {
  audioUrl: string;
  timestamp?: number;
  canPlayAudio: boolean;
}

export function AudioWaveform({
  audioUrl,
  timestamp = 100,
  canPlayAudio,
}: AudioWaveformProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(13);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [objectUrl, setObjectUrl] = useState<string>("");


  // Convert base64 to blob and create object URL
  useEffect(() => {
    if (!audioUrl) return;
    let url = "";

    try {
      // Check if it's a base64 data URL
      if (audioUrl.startsWith("data:audio/")) {
        // Extract the full MIME type (including codecs if present)
        const [mimeTypePart, base64Data] = audioUrl.split(",");
        const mimeType = mimeTypePart
          .replace("data:", "")
          .replace(";base64", "");

        // Convert base64 to binary
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create blob and object URL with correct MIME type
        const blob = new Blob([bytes], { type: mimeType });
        url = URL.createObjectURL(blob);
      } else {
        // If it's already a regular URL, use it directly
        url = audioUrl;
      }

      setObjectUrl(url);
    } catch (error) {
      console.error("Error converting audio data:", error);
    }

    // Cleanup function to revoke object URL
    return () => {
      if (url && url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    };
  }, [audioUrl]);

  // Generate consistent waveform data based on audio URL
  useEffect(() => {
    const generateWaveform = () => {
      const bars = 40;
      // Use audioUrl as seed for consistent waveform
      const audioSplit = audioUrl.split("");
      const seed = audioSplit.reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
      );
      const data = Array.from({ length: bars }, (_, i) => {
        const pseudoRandom = Math.sin(seed + i * 0.5) * 0.5 + 0.5;
        return pseudoRandom * 0.8 + 0.2;
      });
      setWaveformData(data);
    };
    generateWaveform();
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !objectUrl) return;

    const handleLoadedMetadata = () => {
      // setAudioDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);

    const handleError = (e: Event) => {
      const audioElement = e.target as HTMLAudioElement;
      const error = audioElement.error;

      const src = audioElement.currentSrc || audioElement.src;
      console.error("Audio playback error:", { error, src }, e);

      if (error) {
        console.error("Unknown audio error. Source was:", src);
        return;
      }

      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      // Audio is ready to play
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    // Set the source and load
    // audio.src = objectUrl;
    // audio.load();

    if (audioRef.current && objectUrl) {
      audioRef.current.src = objectUrl;
      audioRef.current.load();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [objectUrl]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !objectUrl) return;

    const readyState = audio.readyState;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        if (readyState >= 2) {
          await audio.play();
        } else {
          // Wait for audio to be ready
          const playWhenReady = () => {
            audio.removeEventListener("canplay", playWhenReady);
            audio.play().catch((error) => {
              console.error("Error playing audio:", error);
              setIsPlaying(false);
            });
          };
          audio.addEventListener("canplay", playWhenReady);
        }
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  const handleWaveformClick = (e: React.MouseEvent) => {
    const audio = audioRef.current;
    const waveform = waveformRef.current;
    if (!audio || !waveform || audioDuration === 0) return;

    const rect = waveform.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * audioDuration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time) || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress =
    audioDuration > 0 ? Math.min(1, currentTime / audioDuration) : 0;

  const isAudioDisabled = !objectUrl || !canPlayAudio;

  return (
    <div className="flex justify-end">
      <div className="max-w-xs lg:max-w-md rounded-lg  shadow-sm">
        <audio ref={audioRef} preload="metadata" src={objectUrl} />

        <div className="flex items-center space-x-3">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-primary-testimonials hover:bg-[#20BC5A] disabled:bg-transparent disabled:opacity-40 text-white p-0 flex-shrink-0 flex justify-center items-center disabled:cursor-not-allowed"
            disabled={isAudioDisabled}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Waveform Container */}
          <div className="flex-1 min-w-0">
            <div
              ref={waveformRef}
              className={cn(
                "flex items-end space-x-0.5 h-8 cursor-pointer",
                isAudioDisabled && "pointer-events-none opacity-40"
              )}
              onClick={handleWaveformClick}
              role="button"
            >
              {waveformData.map((height, index) => {
                const barProgress = index / (waveformData.length - 1);

                // Only active if progress has strictly passed this bar’s point
                const isActive = barProgress < progress;
                return (
                  <div
                    key={index}
                    className={`  
                      w-1 rounded-full transition-all duration-150 ease-in-out
                      ${isActive ? "bg-[#25D366]" : "bg-gray-300"}
                      ${isPlaying && isActive ? "animate-pulse" : ""}
                    `}
                    style={{
                      height: `${height * 100}%`,
                      minHeight: "4px",
                      animationDelay: isPlaying ? `${index * 50}ms` : "0ms",
                    }}
                  />
                );
              })}
            </div>

            {/* Time Display */}
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-600 font-mono">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs text-gray-600 font-mono">
                {formatTime(audioDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
