import ToolPanel from '@/components/Cipher/ToolPanel'

export default function JamZone() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
            <div className="p-6">
                <h1 className="text-4xl font-bold text-white mb-8">Jam Track Zone</h1>
                {/* Your jam logic or loop player goes here */}
            </div>
            <ToolPanel showTools={['metronome', 'tuner', 'key-change', 'print']} />
        </div>
    )
}