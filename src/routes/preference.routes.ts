import { Router } from "express";
import { getPreference, updatePreference } from "../controllers/preference.controller";

const router = Router();
router.get("/:id/preferences", getPreference);
router.put("/:id/preferences", updatePreference);

export default router;
