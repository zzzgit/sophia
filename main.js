import { GoogleGenAI } from "@google/genai";
import { load } from "@std/dotenv";

await load({ export: true });

const apiKey =
  Deno.env.get("GOOGLE_GENAI_API_KEY") ??
  Deno.env.get("GEMINI_API_KEY") ??
  Deno.env.get("GOOGLE_API_KEY");

if (!apiKey) {
  throw new Error(
    "Missing API key. Set GOOGLE_GENAI_API_KEY (or GEMINI_API_KEY / GOOGLE_API_KEY) in your environment or .env file.",
  );
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();