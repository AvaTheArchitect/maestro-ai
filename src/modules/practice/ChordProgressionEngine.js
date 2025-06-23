// src/modules/practice/ChordProgressionEngine.js
export function generateChordTimeline(chords, bpm, bars = 4) {
  const beatDurationMs = 60000 / bpm;
  const chordDuration = beatDurationMs * 4; // 1 bar = 4 beats
  return chords.map((chord, i) => ({
    chord,
    startTime: i * chordDuration,
    endTime: (i + 1) * chordDuration,
  }));
}
