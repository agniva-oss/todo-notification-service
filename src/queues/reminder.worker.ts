import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { NotificationService } from "../services/notification.service";

new Worker(
  "notifications",
  async (job) => {
    try {
      const { todo_id, message } = job.data;
      await NotificationService.createManual(todo_id, message);
    } catch (error) {
      console.error('Error processing notification job:', error);
      throw error;
    }
  },
  { connection: redis }
);
