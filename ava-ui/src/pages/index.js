import AvaConsole from "@/components/AvaConsole";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🎸 Welcome to Maestro.AI</h1>
      <AvaConsole />
    </main>
  );
}
import AvaAssistant from "@/components/Ava/Assistant";

export default function Home() {
  const handleCommand = (spoken) => {
    console.log("🧠 Routing command:", spoken);
    // Add routing here (e.g., show dashboard, start tuner, etc.)
  };

  return (
    <div>
      {/* Existing components like AvaConsole here */}
      <AvaAssistant onCommand={handleCommand} />
    </div>
  );
}
