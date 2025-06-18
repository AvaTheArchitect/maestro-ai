import { useState } from "react";
import useVoiceCommand from "@/hooks/useVoiceCommand";

export default function AvaConsole() {
  const [logs, setLogs] = useState([]);
  const [cmd, setCmd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const runAction = async (endpoint, payload = {}) => {
    setIsLoading(true);
    setLogs((prev) => [...prev, `🔁 [${endpoint}] Starting...`, "…"]);
    
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      setLogs((prev) => [
        ...prev.slice(0, -1),
        `➤ [${endpoint}] Success`,
        ...data.output.split("\n"),
      ]);
    } catch (error) {
      setLogs((prev) => [
        ...prev.slice(0, -1),
        `❌ [${endpoint}] Error: ${error.message}`,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🧠 New Cipher-specific function
  const runCipherAction = async (command) => {
    setIsLoading(true);
    setLogs((prev) => [...prev, `🧠 [cipher] Processing with AI...`, "…"]);
    
    try {
      const res = await fetch("/api/cipher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command, context: "ava-console" }),
      });
      
      const data = await res.json();
      
      setLogs((prev) => [
        ...prev.slice(0, -1),
        `🧠 [cipher] AI Response:`,
        ...data.output.split("\n"),
      ]);
    } catch (error) {
      setLogs((prev) => [
        ...prev.slice(0, -1),
        `❌ [cipher] AI Error: ${error.message}`,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced command handler
  const handleCommand = (command) => {
    if (!command.trim()) return;
    
    // Check if command should go to Cipher (AI processing)
    const cipherKeywords = ['analyze', 'explain', 'what', 'how', 'why', 'ai', 'help'];
    const shouldUseCipher = cipherKeywords.some(keyword => 
      command.toLowerCase().includes(keyword)
    );
    
    if (shouldUseCipher) {
      runCipherAction(command);
    } else {
      runAction("run", { command });
    }
    
    setCmd(""); // Clear input after execution
  };

  useVoiceCommand((spoken) => {
    setCmd(spoken);
    handleCommand(spoken);
  });

  return (
    <div className="max-w-xl mx-auto bg-gray-800 text-green-300 font-mono p-4 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-green-400 font-bold">🤖 Ava Console</h3>
        <div className="flex space-x-2">
          <span className="text-xs text-gray-400">
            {isLoading ? "🔄 Processing..." : "✅ Ready"}
          </span>
        </div>
      </div>
      
      {/* Console Output */}
      <div className="overflow-y-auto h-64 mb-4 bg-gray-900 p-2 rounded border-2 border-gray-700">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-sm">
            💡 Type commands or say "analyze this" to use AI processing
          </div>
        ) : (
          logs.map((line, i) => (
            <div key={i} className="mb-1">
              {line}
            </div>
          ))
        )}
      </div>
      
      {/* Input Controls */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Type or speak a command..."
            className="flex-grow bg-gray-900 px-3 py-2 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleCommand(cmd)}
            disabled={isLoading}
          />
          <button
            onClick={() => handleCommand(cmd)}
            disabled={isLoading || !cmd.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
          >
            {isLoading ? "⏳" : "Run"}
          </button>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => runCipherAction("Analyze current system status")}
            disabled={isLoading}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded text-xs transition-colors"
          >
            🧠 Ask AI
          </button>
          <button
            onClick={() => runAction("status")}
            disabled={isLoading}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-xs transition-colors"
          >
            📊 Status
          </button>
          <button
            onClick={() => setLogs([])}
            disabled={isLoading}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded text-xs transition-colors"
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}