
'use client'

import { useKeySwitcherStore } from '@/store/keySwitcherStore'
import { getScaleNotes } from '@/lib/cipher/musicUtils'

export default function JamEngine() {
    const key = useKeySwitcherStore(s => s.key)
    const scale = useKeySwitcherStore(s => s.scale)
    const mode = useKeySwitcherStore(s => s.mode)

    const scaleNotes = getScaleNotes(key, scale, mode)

    return (
        <div className="jam-engine-container">
            <h2 className="text-lg font-bold mb-4">Jam Mode</h2>
            <div className="flex gap-4 flex-wrap">
                {scaleNotes.map((note) => (
                    <div key={note} className="highlight-fret text-sm">
                        <span className="text-white">{note}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}