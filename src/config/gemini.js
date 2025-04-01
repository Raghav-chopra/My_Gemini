import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs"; // For Node.js built-in modules, use 'fs/promises' for async operations
import mime from "mime-types";

const apiKey = "AIzaSyCtUXylwIjM800eYnVPSNR5fyiwgsb5JKk"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const candidates = result.response.candidates;

  for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++) {
    for (let partIndex = 0; partIndex < candidates[candidateIndex].content.parts.length; partIndex++) {
      const part = candidates[candidateIndex].content.parts[partIndex];
      if (part.inlineData) {
        try {
          const filename = `output_${candidateIndex}_${partIndex}.${mime.extension(part.inlineData.mimeType)}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  console.log(result.response.text());
  return result.response.text();
}

export default run;
