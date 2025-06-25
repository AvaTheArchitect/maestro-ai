export interface KeyModeState {
    key: string;
    mode: string;
    scale: string;
    isKeyLocked: boolean;
    isChordLocked: boolean;
    showFretLabels: boolean;

    setKey: (key: string) => void;
    setMode: (mode: string) => void;
    setScale: (scale: string) => void;
    toggleKeyLock: () => void;
    toggleChordLock: () => void;
    toggleFretLabels: () => void;
}
