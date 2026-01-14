import { hasuraRequest } from "../config/hasura";

export type CreateNotificationInput = {
  todo_id: string;
  message: string;
  title?: string;
  type?: string;
  due_date?: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  due_date?: string;
};


export class NotificationService {
  constructor(private readonly request = hasuraRequest) {}

  async createManual(
    input: CreateNotificationInput
  ): Promise<Notification> {
    try {
      const {
        todo_id,
        message,
        title = "Todo Notification",
        type = "TODO_EVENT",
        due_date,
      } = input;

      const query = `
        mutation (
          $todo_id: uuid!
          $title: String!
          $message: String!
          $type: String!
          $due_date: timestamptz
        ) {
          insert_notifications_one(
            object: {
              todo_id: $todo_id
              title: $title
              message: $message
              type: $type
              due_date: $due_date
            }
          ) {
            id
            title
            message
            type
            is_read
            created_at
            due_date
          }
        }
      `;

      const data = await this.request(query, {
        todo_id,
        title,
        message,
        type,
        due_date,
      });

      return data.insert_notifications_one;
    } catch (error) {
      console.error("NotificationService.createManual error:", error);
      throw new Error("Failed to create notification");
    }
  }

  async getAll(): Promise<Notification[]> {
    try {
      const query = `
        query {
          notifications(order_by: { created_at: desc }) {
            id
            title
            message
            type
            is_read
            created_at
            due_date
          }
        }
      `;

      const data = await this.request(query);
      return data.notifications;
    } catch (error) {
      console.error("NotificationService.getAll error:", error);
      throw new Error("Failed to fetch notifications");
    }
  }

  async markRead(
    id: string
  ): Promise<Pick<Notification, "id" | "is_read">> {
    try {
      const query = `
        mutation ($id: uuid!) {
          update_notifications_by_pk(
            pk_columns: { id: $id }
            _set: { is_read: true }
          ) {
            id
            is_read
          }
        }
      `;

      const data = await this.request(query, { id });
      return data.update_notifications_by_pk;
    } catch (error) {
      console.error("NotificationService.markRead error:", error);
      throw new Error("Failed to mark notification as read");
    }
  }
}
