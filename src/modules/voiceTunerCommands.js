// src/modules/voiceTunerCommands.js
export function initTunerVoice(recognition, toggler) {
  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase();
    if (spoken.includes('activate tuner')) toggler(true);
    if (spoken.includes('close tuner')) toggler(false);
    recognition.stop();
  };
}
