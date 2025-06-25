'use client'

import { useKeySwitcherStore } from '@/store/keySwitcherStore'
import { getChordsForScale } from '@/lib/cipher/chordUtils'

// ✅ Move utility functions OUTSIDE the component
export function generateProgression(chords: string[]) {
    return {
        progression: chords,
        key: 'C',
        tempo: 120,
        timeSignature: '4/4'
    }
}

export function createChordProgression(chordArray: string[]) {
    return generateProgression(chordArray)
}

// ✅ Fixed React component structure
export default function ChordSuggester() {
    const key = useKeySwitcherStore(s => s.key)
    const scale = useKeySwitcherStore(s => s.scale)
    const mode = useKeySwitcherStore(s => s.mode)

    const chordSuggestions = getChordsForScale(key, scale, mode)

    return (
        <div className="chord-suggester mt-6">
            <h2 className="text-lg font-semibold mb-2">Suggested Chords</h2>
            <ul className="grid grid-cols-3 gap-3 text-sm">
                {chordSuggestions.map((chord, i) => (
                    <li
                        key={i}
                        className="bg-purple-900/20 rounded px-3 py-2 text-purple-300 border border-purple-800"
                    >
                        {chord}
                    </li>
                ))}
            </ul>
        </div>
    )
}