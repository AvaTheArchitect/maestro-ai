// src/hooks/usePitchAnalyzer.js
import { useState, useEffect, useRef } from 'react';

export default function usePitchAnalyzer(onPitch) {
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    async function init() {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sourceRef.current = audioCtxRef.current.createMediaStreamSource(stream);

      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      sourceRef.current.connect(analyserRef.current);

      const buffer = new Float32Array(analyserRef.current.fftSize);
      const detectPitch = () => {
        analyserRef.current.getFloatTimeDomainData(buffer);

        let peak = 0;
        for (let i = 0; i < buffer.length; i++) {
          if (Math.abs(buffer[i]) > peak) peak = buffer[i];
        }
        // Basic pitch detection stub (RMS → note)
        const rms = Math.sqrt(buffer.reduce((s, v) => s + v * v, 0) / buffer.length);
        const cents = Math.round((rms - 0.1) * 100 * 10);
        const note = cents > 0 ? 'A4' : 'E2';

        onPitch({ note, cents });
        rafRef.current = requestAnimationFrame(detectPitch);
      };

      detectPitch();
    }

    init();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [onPitch]);
}
