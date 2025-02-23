import { Router } from "express";
import discoveryController from "../controllers/discovery";

const router = Router();
router.post("/discovery", discoveryController);

export default router;
