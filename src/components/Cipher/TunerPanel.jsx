'use client';

import React, { useState } from 'react';

export default function TunerPanel() {
  const [note, setNote] = useState('—');
  const [cents, setCents] = useState(0);
  const [feedback, setFeedback] = useState('Waiting for pitch...');

  return (
    <div className="p-6 bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white rounded-md shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-orange-400 mb-4 tracking-wide">🎸 Maestro Tuner</h2>
      <div className="text-6xl font-mono mb-2">{note}</div>
      <div className={`text-lg ${Math.abs(cents) < 5 ? 'text-green-400' : 'text-red-500'}`}>
        {cents === 0 ? 'Perfect pitch' : `${cents > 0 ? '+' : ''}${cents} cents`}
      </div>
      <div className="mt-4 text-sm text-gray-300">{feedback}</div>
    </div>
  );
}
