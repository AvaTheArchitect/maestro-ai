'use client';

import { useKeySwitcherStore } from '@/store/keySwitcherStore';
import { getScaleNotes } from '@/lib/cipher/musicUtils';

export default function KeyCircle() {
    const key = useKeySwitcherStore((s) => s.key);
    const scale = useKeySwitcherStore((s) => s.scale);
    const mode = useKeySwitcherStore((s) => s.mode);
    const showFretLabels = useKeySwitcherStore((s) => s.showFretLabels);

    const scaleNotes = getScaleNotes(key, scale, mode);

    return (
        <div className="flex flex-wrap justify-center items-center gap-3">
            {scaleNotes.map((note) => (
                <div
                    key={note}
                    className="highlight-fret text-sm"
                >
                    {showFretLabels && (
                        <span className="text-sm text-white">{note}</span>
                    )}
                </div>
            ))}
        </div>
    );
}

