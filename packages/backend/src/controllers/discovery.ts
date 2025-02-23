import type { RequestHandler } from "express";
import ai from "../utils/ai";

const discoveryController: RequestHandler = async (req, res) => {
  const discoveryPrompt = ai.prompt("discovery");
  const response = await discoveryPrompt({
    medicine_name: req.body.medicine_name,
    active_compounds: req.body.active_compounds?.toString(),
    target_disease: req.body.target_disease,
    desired_extraction_method: req.body.desired_extraction_method,
    regions_of_interest: req.body.regions_of_interest?.toString(),
  });
  res.json(JSON.parse(response.text));
};

export default discoveryController;
