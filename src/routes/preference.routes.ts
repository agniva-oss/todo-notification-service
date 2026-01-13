import { Router } from "express";
import { getPreference } from "../controllers/preference.controller";

const router = Router();
router.get("/:userId", getPreference);

export default router;
