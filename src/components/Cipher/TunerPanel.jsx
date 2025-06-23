'use client';

import React, { useState } from 'react';
import usePitchAnalyzer from '@/hooks/usePitchAnalyzer';

export default function TunerPanel({ visible, onClose }) {
  const [note, setNote] = useState('—');
  const [cents, setCents] = useState(0);
  const [feedback, setFeedback] = useState('Waiting for pitch...');

  usePitchAnalyzer(({ note, cents }) => {
    setNote(note);
    setCents(cents);
    if (Math.abs(cents) < 5) setFeedback('😊 In Tune!');
    else setFeedback(cents > 0 ? '🔻 Slightly Sharp' : '🔺 Slightly Flat');
  });

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white rounded-md shadow-xl max-w-md mx-auto relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">❌</button>
        <h2 className="text-2xl font-bold text-orange-400 mb-4 tracking-wide">🎸 Maestro Tuner</h2>
        <div className="text-6xl font-mono mb-2">{note}</div>
        <div className={`text-lg ${Math.abs(cents) < 5 ? 'text-green-400' : 'text-red-500'}`}>
          {cents === 0 ? 'Perfect pitch' : `${cents > 0 ? '+' : ''}${cents} cents`}
        </div>
        <div className="mt-4 text-sm text-gray-300">{feedback}</div>
      </div>
    </div>
  );
}
