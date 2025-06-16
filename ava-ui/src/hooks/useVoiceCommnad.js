export default function handler(req, res) {
  if (req.method === 'POST') {
    const { command } = req.body;
    if (command.toLowerCase().includes("system check")) {
      return res.status(200).json({ output: ["✅ System check complete", "All systems operational, Captain."] });
    } else {
      return res.status(200).json({ output: [`🤖 Received: "${command}"`, "But I don’t have a handler for that yet."] });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}