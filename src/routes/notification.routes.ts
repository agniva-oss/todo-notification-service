import { Router } from "express";
import {
  getNotifications,
  markRead,
  createNotification,
} from "../controllers/notification.controller";

const router = Router();

router.get("/", getNotifications);
router.post("/", createNotification); // ✅ NEW
router.patch("/:id/read", markRead);

export default router;
