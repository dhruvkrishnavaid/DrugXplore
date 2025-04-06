import type { RequestHandler } from "express";
import ai from "../utils/ai";

const greetController: RequestHandler = async (req, res) => {
  const greetPrompt = ai.prompt("greet");
  const response = await greetPrompt();
  res.json(JSON.parse(response.text));
};

export default greetController;
