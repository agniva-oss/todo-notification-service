import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { NotificationService } from "../services/notification.service";

new Worker(
  "notifications",
  async (job) => {
    const { todo_id, message } = job.data;
    await NotificationService.createManual(todo_id, message);
  },
  { connection: redis }
);
