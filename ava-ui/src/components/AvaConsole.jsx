import { useState } from "react";
import useVoiceCommand from "@/hooks/useVoiceCommand";


export default function AvaConsole() {
  const [logs, setLogs] = useState([]);
  const [cmd, setCmd] = useState("");

  const runAction = async (endpoint, payload = {}) => {
    setLogs((prev) => [...prev, `🔁 [${endpoint}]`, "…"]);
    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLogs((prev) => [
      ...prev.slice(0, -1),
      `➤ [${endpoint}]`,
      ...data.output.split("\n"),
    ]);
  };

  useVoiceCommand((spoken) => {
    setCmd(spoken);
    runAction("run", { command: spoken });
  });

  return (
    <div className="max-w-xl mx-auto bg-gray-800 text-green-300 font-mono p-4 rounded-xl shadow-lg">
      <div className="overflow-y-auto h-64 mb-4">
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          placeholder="Type or speak a command..."
          className="flex-grow bg-gray-900 px-3 py-2 rounded"
          onKeyDown={(e) => e.key === "Enter" && runAction("run", { command: cmd })}
        />
        <button
          onClick={() => runAction("run", { command: cmd })}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Run
        </button>
      </div>
    </div>
  );
}
