import { Router } from "express";
import notificationRoutes from "./notification.routes";
import preferenceRoutes from "./preference.routes";
import webhookRoutes from "./webhook.routes";

const router = Router();

router.use("/notifications", notificationRoutes);
router.use("/users", preferenceRoutes);
router.use("/webhooks", webhookRoutes);

export default router;
