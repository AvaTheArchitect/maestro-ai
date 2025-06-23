import { useState, useEffect, useRef } from "react";
import useVoiceCommand from "@/hooks/useVoiceCommand";
import FileExplorer from "./FileExplorer";
import dynamic from "next/dynamic";

// Dynamically import CodeMirror only on client side
const CodeEditor = dynamic(() => import("./CodeMirrorEditor"), { 
  ssr: false,
  loading: () => <div className="p-4 bg-gray-900 text-white">Loading 
CodeMirror...</div>
});

export default function AvaConsole() {
  const [logs, setLogs] = useState([]);
  const [cmd, setCmd] = useState("");
  const [code, setCode] = useState("// Ava Console is working.");
  const [selectedFile, setSelectedFile] = useState("src/components/AvaConsole.js");
  const [saveTimer, setSaveTimer] = useState(null);

  const runAction = async (endpoint, payload = {}) => {
    setLogs((prev) => [...prev, `[${endpoint}] ...`]);
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLogs((prev) => [...prev.slice(0, -1), `[${endpoint}]`, 
...data.output.split("\n")]);
    } catch (error) {
      setLogs((prev) => [...prev.slice(0, -1), `[${endpoint}] Error: 
${error.message}`]);
    }
  };

  useVoiceCommand((spoken) => {
    setCmd(spoken);
    runAction("run", { command: spoken });
  });

  const onCodeChange = (val) => {
    setCode(val);
    clearTimeout(saveTimer);
    setSaveTimer(
      setTimeout(() => {
        runAction("update-code", {
          content: val,
          path: selectedFile,
          message: `Auto-saving ${selectedFile}`,
          branch: "main",
        });
      }, 1500)
    );
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <FileExplorer onSelect={(path) => {
        setSelectedFile(path);
        setLogs((prev) => [...prev, `Selected: ${path}`]);
      }} />

      <div className="flex-1 p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Ava Console - CodeMirror 
Mode</h1>

        <div className="mb-4">
          <CodeEditor value={code} onChange={onCodeChange} />
        </div>

        <div className="flex space-x-2 mb-4">
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Type a command..."
            className="flex-grow px-3 py-2 bg-gray-800 text-white 
rounded border border-gray-600"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && cmd.trim()) {
                runAction("run", { command: cmd });
                setCmd("");
              }
            }}
          />
          <button
            onClick={() => {
              if (cmd.trim()) {
                runAction("run", { command: cmd });
                setCmd("");
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded 
hover:bg-blue-700"
          >
            Run
          </button>
        </div>

        <button
          onClick={() =>
            runAction("update-code", {
              content: code,
              path: selectedFile,
              message: `Manual save of ${selectedFile}`,
              branch: "main",
            })
          }
          className="mb-4 px-4 py-2 bg-yellow-600 text-black rounded 
hover:bg-yellow-700"
        >
          Save to GitHub
        </button>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Console Output</h3>
          <pre className="bg-black text-green-400 p-2 rounded h-64 
overflow-auto text-sm">
            {logs.join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
}
