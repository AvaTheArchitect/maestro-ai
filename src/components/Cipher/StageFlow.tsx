'use client';
import React, { useState } from 'react';
import TunerPanel from './TunerPanel';
import VisualFeedbackPanel from './VisualFeedbackPanel';
import TunerDial from './TunerDial';
import useAccessibilityToggles from '@/hooks/useAccessibilityToggles';
import { handleVoiceAccessibilityCommand } from '@/modules/voiceAccessibilityMap';
import { runSimonPrime } from '@/modules/SimonPrimeEngine';
import AutoLoopPanel from './AutoLoopPanel';
import OverlayTrail from './OverlayTrail';

export default function StageFlow() {
  const [showInspector, setShowInspector] = useState(true);
  const [tunerFreq, setTunerFreq] = useState(440);
  const [tunerCents, setTunerCents] = useState(0);
  const toggles = useAccessibilityToggles();
  const [simonMode, setSimonMode] = useState(false);

  useEffect(() => {
    if (simonMode) {
      runSimonPrime();
    }
  }, [simonMode]);

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
        <button onClick={() => setSimonMode(!simonMode)} className="bg-orange-600 text-white p-2 rounded">
          Toggle Simon Mode
        </button>
        <button
          onClick={() => setSimonMode(!simonMode)}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded shadow"
        >
          {simonMode ? '🛑 Stop Simon Mode' : '🚀 Activate Simon Prime Mode'}
        </button>
      </div>
      {simonMode && (
        <>
          <OverlayTrail
            duration={800}
            maxTrails={12}
            trailColor="rgba(255, 255, 255, 0.25)"
            decayRate={0.92}
          />
          <AutoLoopPanel />
        </>
      )}



      <TunerPanel onFreqUpdate={(f, c) => { setTunerFreq(f); setTunerCents(c); }} />
      <TunerDial freq={tunerFreq} cents={tunerCents} />

      {showInspector && (
        <VisualFeedHUD bounds={{ top: 120, left: 160, width: 100, height: 40 }} label="Simon's AI HUD" />
      )}
      {showInspector && (
        <VisualFeedHUD bounds={{ top: 120, left: 160, width: 100, height: 40 }} label="Simon's Eye" />
      )}

      <AutoLoopPanel active={simonMode} />

    </div>
  );
}
