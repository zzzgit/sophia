// Simple Ollama API call using fetch (Node.js 18+ or Deno)
// Usage: node ollama.js "你的提示词"

const prompt = process.argv.slice(2).join(" ") || "请计算 12 + 30 的结果是奇数还是偶数？";
const url = "http://localhost:11434/api/generate";

// 定义一个加法函数（供模型调用），返回的结果是奇数还是偶数
function add(a, b) {
  let result = a + b;
  if (result % 2){
    return "奇数";
  } else {
    return "偶数";
  }
}

const payload = {
  model: "gemma3:1b",
  prompt,
  stream: false,
  tools: [
    {
      type: "function",
      function: {
        name: "add",
        description: "Add two numbers and return whether the sum is odd or even.",
        parameters: {
          type: "object",
          properties: {
            a: { type: "number", description: "First number" },
            b: { type: "number", description: "Second number" }
          },
          required: ["a", "b"]
        }
      }
    }
  ]
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
