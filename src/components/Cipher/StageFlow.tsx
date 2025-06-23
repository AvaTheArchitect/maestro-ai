'use client';
import React, { useState } from 'react';
import TunerPanel from './TunerPanel';
import VisualFeedHUD from './VisualFeedHUD';
import TunerDial from './TunerDial';
import useAccessibilityToggles from '@/hooks/useAccessibilityToggles';
import { handleVoiceAccessibilityCommand } from '@/modules/voiceAccessibilityMap';

export default function StageFlow() {
  const [showInspector, setShowInspector] = useState(true);
  const [tunerFreq, setTunerFreq] = useState(440);
  const [tunerCents, setTunerCents] = useState(0);
  const toggles = useAccessibilityToggles();

  function mockVoiceInput(cmd: string) {
    handleVoiceAccessibilityCommand(cmd, toggles);
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button onClick={() => setShowInspector(!showInspector)} className="bg-purple-700 text-white px-3 py-1 rounded">
          Toggle Inspector
        </button>
        <button onClick={() => mockVoiceInput("toggle contrast")} className="bg-indigo-600 text-white px-3 py-1 rounded">
          Voice: Contrast
        </button>
        <button onClick={() => mockVoiceInput("voice confirm")} className="bg-indigo-600 text-white px-3 py-1 rounded">
          Voice: Confirm
        </button>
      </div>

      <TunerPanel onFreqUpdate={(f, c) => { setTunerFreq(f); setTunerCents(c); }} />
      <TunerDial freq={tunerFreq} cents={tunerCents} />

      {showInspector && (
        <VisualFeedHUD bounds={{ top: 120, left: 160, width: 100, height: 40 }} label="Simon's AI HUD" />
      )}
    </div>
  );
}
