import { notificationQueue } from "../queues/notification.queue";

export const SchedulerService = {
  scheduleReminder: async (todo_id: string, due_date: string, reminderMinutes: number = 30) => {
    const dueDate = new Date(due_date);
    const reminderTime = new Date(dueDate.getTime() - reminderMinutes * 60 * 1000);
    const now = new Date();
    const delay = reminderTime.getTime() - now.getTime();

    if (delay > 0) {
      await notificationQueue.add(
        "reminder",
        {
          todo_id,
          message: `Reminder: Todo is due soon`,
          due_date,
        },
        {
          delay,
          jobId: `reminder-${todo_id}`,
        }
      );
    }
  },
};
