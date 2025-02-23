import { Router } from "express";
import ayurvedaController from "../controllers/ayurveda";

const router = Router();

router.post("/ayurveda", ayurvedaController);

export default router;
