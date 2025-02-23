import type { RequestHandler } from "express";
import ai from "../utils/ai";

const existingController: RequestHandler = async (req, res) => {
  const existingPrompt = ai.prompt("existing");
  const response = await existingPrompt({
    symptoms: req.body.symptoms?.toString(),
    medicines: req.body.medicines?.toString(),
  });
  res.json(JSON.parse(response.text));
};

export default existingController;
