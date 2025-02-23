import { Router } from "express";
import greetController from "../controllers/greet";

const router = Router();
router.post("/greet", greetController);

export default router;
