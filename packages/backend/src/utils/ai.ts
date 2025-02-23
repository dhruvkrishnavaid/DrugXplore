import googleAI from "@genkit-ai/googleai";
import { genkit } from "genkit";

const ai = genkit({
  plugins: [googleAI()],
  promptDir: "src/prompts",
});

export default ai;
