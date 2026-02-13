import { GoogleGenAI } from "@google/genai";
import { load } from "@std/dotenv";

await load({ export: true });

const apiKey =  Deno.env.get("GOOGLE_GENAI_API_KEY") 

if (!apiKey) {
  throw new Error(
    "Missing API key. Set GOOGLE_GENAI_API_KEY (or GEMINI_API_KEY / GOOGLE_API_KEY) in your environment or .env file.",
  );
}

const ai = new GoogleGenAI({apiKey});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: "What is temperature in LLM?",
  });
  console.log(222, response.text);
}

await main();