import { notificationQueue } from "../queues/notification.queue";
import { SchedulerService } from "./scheduler.service";
import { PreferenceService } from "./preference.service";

export const WebhookService = {
  handleTodoCreated: async (todo: any) => {
    await notificationQueue.add("todo-created", {
      todo_id: todo.id,
      message: `New todo created: ${todo.title}`,
      due_date: todo.due_date,
    });
    if (todo.due_date) {
      const prefs = await PreferenceService.get(todo.user_id);
      const reminderMinutes = prefs?.reminder_time || 3;
      await SchedulerService.scheduleReminder(todo.id, todo.due_date, reminderMinutes);
    }
  },

  handleTodoUpdated: async (todo: any) => {
    if (todo.due_date) {
      const prefs = await PreferenceService.get(todo.user_id);
      const reminderMinutes = prefs?.reminder_time || 3;
      await SchedulerService.scheduleReminder(todo.id, todo.due_date, reminderMinutes);
    } else {
      const job = await notificationQueue.getJob(`reminder-${todo.id}`);
      if (job) {
        await job.remove();
      }
    }
  },
};
