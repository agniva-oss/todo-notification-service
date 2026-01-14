import { notificationQueue } from "../queues/notification.queue";

export type ScheduleReminderInput = {
  todo_id: string;
  due_date: string;
  reminderMinutes?: number;
};

export class SchedulerService {
  constructor(
    private readonly queue = notificationQueue
  ) {}

  async scheduleReminder({
    todo_id,
    due_date,
    reminderMinutes = 3,
  }: ScheduleReminderInput): Promise<void> {
    try {
      const dueDate = new Date(due_date);
      const reminderTime = new Date(
        dueDate.getTime() - reminderMinutes * 60 * 1000
      );
      const now = new Date();
      const delay = reminderTime.getTime() - now.getTime();

      if (delay <= 0) {
        return;
      }

      await this.queue.add(
        "reminder",
        {
          todo_id,
          message: "Reminder: Todo is due soon",
          due_date,
        },
        {
          delay,
          jobId: `reminder-${todo_id}`,
          removeOnComplete: true,
          removeOnFail: true,
        }
      );
    } catch (error) {
      console.error("SchedulerService.scheduleReminder error:", error);
      throw new Error("Failed to schedule reminder");
    }
  }
}
