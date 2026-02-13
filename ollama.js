// Simple Ollama API call using fetch (Node.js 18+ or Deno)
// Usage: node ollama.js "你的提示词"

const prompt = process.argv.slice(2).join(" ") || "你好";
const url = "http://localhost:11434/api/generate";

const payload = {
  model: "gemma3:1b",
  prompt,
  stream: false
};

async function run() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    console.log(data.response);
  } catch (err) {
    console.error("Ollama API 调用失败:", err.message);
    process.exitCode = 1;
  }
}

run();
