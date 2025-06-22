import React, { useState } from 'react';
import PracticePanel from './PracticePanel';
import VisionPanel from './VisionPanel';

export default function CipherConsole() {
  const [tab, setTab] = useState('practice');

  return (
    <div className="w-full p-4">
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setTab('practice')} className="btn">Practice Mode</button>
        <button onClick={() => setTab('vision')} className="btn">Visual Analyzer</button>
      </div>
      {tab === 'practice' && <PracticePanel />}
      {tab === 'vision' && <VisionPanel />}
    </div>
  );
}
