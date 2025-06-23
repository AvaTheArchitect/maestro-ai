import React, { useState } from 'react';
import TunerPanel from '@/components/Cipher/TunerPanel';
import { initTunerVoice } from '@/modules/voiceTunerCommands';

export default function CipherConsole() {
  const [tunerVisible, setTunerVisible] = useState(false);

  const startVoice = () => {
    const recognition = new window.SpeechRecognition();
    initTunerVoice(recognition, setTunerVisible);
    recognition.start();
  };

  return (
    <>
      <button onClick={() => setTunerVisible(true)}>🎵 Activate Tuner</button>
      <button onClick={startVoice}>🗣 Start Voice Command</button>
      <TunerPanel visible={tunerVisible} onClose={() => setTunerVisible(false)} />
    </>
  );
}
