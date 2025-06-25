import { useKeySwitcherStore } from '@/store/keySwitcherStore';
import { getScaleNotes } from '@/lib/cipher/musicUtils';

const key = useKeySwitcherStore((s) => s.key);
const scale = useKeySwitcherStore((s) => s.scale);
const mode = useKeySwitcherStore((s) => s.mode);
const showFretLabels = useKeySwitcherStore((s) => s.showFretLabels);

{
    showFretLabels && (
        <span className="text-xs text-gray-300">{fret.note}</span>
    )
}

const showFretLabels = useKeySwitcherStore((s) => s.showFretLabels);
const scaleNotes = getScaleNotes(key, scale, mode);
// getScaleNotes('C', 'Diatonic', 'Mixolydian') → ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'C']


{
    scaleNotes.includes(fret.note) && (
        <div className="highlight-fret text-sm">
            {showFretLabels && <span className="text-white">{note}</span>}
        </div>
            .highlight - fret {
        background - color: #7c3aed; /* purple-600 */
        color: white;
        border - radius: 9999px;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align - items: center;
        justify - content: center;
    }
    )
}

