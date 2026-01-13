import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { NotificationService } from "../services/notification.service";

new Worker(
  "notifications",
  async (job) => {
    try {
      const { todo_id, message, due_date } = job.data;
      console.log(job , 'job data in worker');
      const type = job.name === "reminder" ? "REMINDER" : "TODO_EVENT";
      await NotificationService.createManual(todo_id, message, type, "Todo Notification", due_date);
      console.log(`Notification sent for todo: ${todo_id}`);
    } catch (error) {
      console.error('Error processing notification job:', error);
      throw error;
    }
  },
  { connection: redis }
);
