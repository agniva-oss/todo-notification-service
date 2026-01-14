import { notificationQueue } from "../queues/notification.queue";
import { SchedulerService } from "./scheduler.service";
import { PreferenceService } from "./preference.service";

export type TodoPayload = {
  id: string;
  title: string;
  user_id: string;
  due_date?: string | null;
};

export class WebhookService {
  constructor(
    private readonly queue = notificationQueue,
    private readonly schedulerService = new SchedulerService(),
    private readonly preferenceService = new PreferenceService()
  ) {}

  async handleTodoCreated(todo: TodoPayload): Promise<void> {
    try {
      await this.queue.add(
        "todo-created",
        {
          todo_id: todo.id,
          message: `New todo created: ${todo.title}`,
          due_date: todo.due_date,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        }
      );

      if (!todo.due_date) return;

      // const prefs = await this.preferenceService.get(todo.user_id);
      const reminderMinutes = 3;

      await this.schedulerService.scheduleReminder({
        todo_id: todo.id,
        due_date: todo.due_date,
        reminderMinutes,
      });
    } catch (error) {
      console.error("WebhookService.handleTodoCreated error:", error);
      throw new Error("Failed to handle todo created webhook");
    }
  }

  async handleTodoUpdated(todo: TodoPayload): Promise<void> {
    try {
      if (todo.due_date) {
        // const prefs = await this.preferenceService.get(todo.user_id);
        const reminderMinutes = 3;

        await this.schedulerService.scheduleReminder({
          todo_id: todo.id,
          due_date: todo.due_date,
          reminderMinutes,
        });
        return;
      }

      const job = await this.queue.getJob(`reminder-${todo.id}`);
      if (job) {
        await job.remove();
      }
    } catch (error) {
      console.error("WebhookService.handleTodoUpdated error:", error);
      throw new Error("Failed to handle todo updated webhook");
    }
  }
}
