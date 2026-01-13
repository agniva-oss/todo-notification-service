import { Router } from "express";
import { todoWebhook } from "../controllers/webhook.controller";

const router = Router();
router.post("/todo", todoWebhook);

export default router;
