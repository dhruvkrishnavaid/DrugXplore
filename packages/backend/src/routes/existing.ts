import { Router } from "express";
import existingController from "../controllers/existing";

const router = Router();
router.post("/existing", existingController);

export default router;
