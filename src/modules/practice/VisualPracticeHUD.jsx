// src/modules/practice/VisualPracticeHUD.jsx
import React from 'react';

export default function VisualPracticeHUD({ bpm, currentChord }) {
  return (
    <div className="fixed bottom-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded shadow">
      <div className="text-lg font-bold">BPM: {bpm}</div>
      <div className="text-xl mt-2">Now Playing: {currentChord || '...'}</div>
    </div>
  );
}
