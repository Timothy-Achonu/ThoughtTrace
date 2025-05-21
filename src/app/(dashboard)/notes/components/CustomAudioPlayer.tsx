// components/AudioPlayer.tsx
import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";
import WavesurferPlayer from "@wavesurfer/react";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");



  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [wavesurfer, setWavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // const onReady = (ws) => {
  //   setWavesurfer(ws)
  //   setIsPlaying(false)
  // }

  // const onPlayPause = () => {
  //   wavesurfer && wavesurfer.playPause()
  // }  

  return (
    <>
      <WavesurferPlayer
        height={100}
        waveColor="violet"
        url={audioUrl}
        // onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button> */}
    </>
  );
};

export { AudioPlayer };
