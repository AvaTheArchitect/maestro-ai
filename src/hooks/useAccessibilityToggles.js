import { useState, useEffect } from 'react';

export default function useAccessibilityToggles() {
  const [voiceConfirm, setVoiceConfirm] = useState(true);
  const [contrastBoost, setContrastBoost] = useState(false);
  const [audioHints, setAudioHints] = useState(false);

  useEffect(() => {
    if (contrastBoost) {
      document.body.classList.add('contrast-boost');
    } else {
      document.body.classList.remove('contrast-boost');
    }
  }, [contrastBoost]);

  return {
    voiceConfirm,
    toggleVoice: () => setVoiceConfirm(v => !v),
    contrastBoost,
    toggleContrast: () => setContrastBoost(v => !v),
    audioHints,
    toggleAudioHints: () => setAudioHints(v => !v),
  };
}
