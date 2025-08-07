// React example
// See https://github.com/katspaugh/wavesurfer-react

import React, { useMemo, useState, useCallback, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

const audioUrls = [
  "/examples/audio/audio.wav",
  "/examples/audio/stereo.mp3",
  "/examples/audio/mono.mp3",
  "/examples/audio/librivox.mp3",
];

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

// A React component that will render wavesurfer
export const CustomAudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const containerRef = useRef(null);
  const [urlIndex, setUrlIndex] = useState(0);

  const mediaElement = useMemo(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous"; // ← key bit for CORS
    audio.src = audioUrl;
    return audio;
  }, [audioUrl]);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    backend: "MediaElement", 
    media: mediaElement,
    height: 100,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
  });

  const onUrlChange = useCallback(() => {
    setUrlIndex((index) => (index + 1) % audioUrls.length);
  }, []);

  const onPlayPause = useCallback(() => {    
    wavesurfer && wavesurfer.playPause();    
  }, [wavesurfer]);

  return (
    <>
      <div ref={containerRef} />

      <p>Current audio: {audioUrls[urlIndex]}</p>

      <p>Current time: {formatTime(currentTime)}</p>

      <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
        <button onClick={onUrlChange}>Change audio</button>

        <button onClick={onPlayPause} style={{ minWidth: "5em" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
};
