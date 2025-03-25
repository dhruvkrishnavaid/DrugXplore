import { Router } from "express";
import error from "../controllers/error";

const router = Router();
router.use(error);

export default router;
