import { notificationQueue } from "../queues/notification.queue";

export const WebhookService = {
  handleTodoCreated: async (todo: any) => {
    await notificationQueue.add("todo-created", {
      todo_id: todo.id,
      message: `New todo created: ${todo.title}`,
    });
  },
};
