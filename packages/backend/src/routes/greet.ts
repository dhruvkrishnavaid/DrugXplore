import { Router } from "express";
import greetController from "../controllers/greet";

const router = Router();
router.get("/greet", greetController);

export default router;
