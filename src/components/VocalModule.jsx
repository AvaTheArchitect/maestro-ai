// src/components/VocalModule.jsx

import React, { useState } from 'react';

const VocalModule = () => {
  const [pitch, setPitch] = useState(null);
  const [tempo, setTempo] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleAnalyze = () => {
    // 🔊 Placeholder for future AI model scoring logic
    const pitchScore = Math.random() * 100;
    const tempoScore = Math.random() * 100;

    setPitch(pitchScore.toFixed(1));
    setTempo(tempoScore.toFixed(1));

    if (pitchScore > 95 && tempoScore > 95) {
      setFeedback("⚡ Thunder Tracked! You cracked glass and nailed tempo like Sebastian Bach!");
    } else if (pitchScore > 85) {
      setFeedback("🎯 Great pitch! Stay locked on rhythm.");
    } else {
      setFeedback("🎤 Let’s tune it up — try again with breath support and posture tips.");
    }
  };

  return (
    <div className="p-6 bg-black text-white rounded-2xl shadow-xl space-y-4">
      <h2 className="text-2xl font-bold text-orange-400">🎤 Vocal AI Practice Module</h2>
      <button
        onClick={handleAnalyze}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full text-white font-semibold"
      >
        Analyze Vocal Take
      </button>
      {pitch && (
        <div className="space-y-2">
          <p>Pitch Accuracy: <strong>{pitch}%</strong></p>
          <p>Tempo Sync: <strong>{tempo}%</strong></p>
          <p className="italic text-green-400">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default VocalModule;