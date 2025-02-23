import type { RequestHandler } from "express";
import ai from "../utils/ai";

const ayurvedaController: RequestHandler = async (req, res) => {
  if (!req.body.symptoms || !req.body.symptoms.length) {
    res.status(400).json({ error: "Missing/Invalid symptoms" });
  } else {
    const ayurvedaPrompt = ai.prompt("ayurveda");
    const response = await ayurvedaPrompt({
      symptoms: req.body.symptoms.toString(),
    });
    res.json(JSON.parse(response.text));
  }
};

export default ayurvedaController;
