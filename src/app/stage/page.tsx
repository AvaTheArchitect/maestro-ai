'use client';

import StageFlow from '@/components/Cipher/StageFlow';

export default function StagePage() {
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-4xl font-bold text-purple-500">🎙️ Stage Mode</h1>
            <StageFlow />
        </div>
    );
}
