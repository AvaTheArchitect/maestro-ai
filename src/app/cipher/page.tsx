// src/app/cipher/page.tsx

'use client';

import CipherConsole from '@/components/Cipher/CipherConsole';
import PracticePanel from '@/components/Cipher/PracticePanel';
import VisionPanel from '@/components/Cipher/VisionPanel';

export default function CipherPage() {
    return (
        <div className="p-6 space-y-10">
            <h1 className="text-3xl font-bold text-orange-500">🎸 Cipher Console</h1>
            <CipherConsole />
            <PracticePanel />
            <VisionPanel />
        </div>
    );
}
