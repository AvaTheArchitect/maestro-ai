// src/modules/practice/PracticeGenerator.jsx
import React, { useEffect, useState } from 'react';
import { PlayerTransport } from './PlayerTransport';
import { generateChordTimeline } from './ChordProgressionEngine';
import VisualPracticeHUD from './VisualPracticeHUD';

const chords = ['Em', 'C', 'D', 'G'];
const bpm = 100;

{activeTool === 'tuner' && (
  <ToolPanel title="Tuner">
    <TunerDial onClose={() => setActiveTool('none')} />
  </ToolPanel>
)}

export default function PracticeGenerator() {
  const [currentChord, setCurrentChord] = useState(null);

  useEffect(() => {
    const timeline = generateChordTimeline(chords, bpm);
    let chordIndex = 0;

    const transport = new PlayerTransport((timestamp) => {
      setCurrentChord(timeline[chordIndex]?.chord);
      chordIndex = (chordIndex + 1) % timeline.length;
    }, bpm);

    transport.start();
    return () => transport.stop();
  }, []);

  return <VisualPracticeHUD bpm={bpm} currentChord={currentChord} />;
}
