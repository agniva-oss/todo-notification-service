import { hasuraRequest } from "../config/hasura";

export const NotificationService = {
  createManual: async (
  todo_id: string,
  message: string,
  type: string = "TODO_EVENT",
  title: string = "Todo Notification",
  due_date?: string,
) => {
  const query = `
    mutation ($todo_id: uuid!, $title: String!, $message: String!, $type: String!, $due_date: timestamptz) {
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
        message
        title
        type
        is_read
        created_at
        due_date
      }
    }
  `;

  const data = await hasuraRequest(query, {
    todo_id,
    title,
    message,
    type,
    due_date
  });

  return data.insert_notifications_one;
},


  getAll: async () => {
    const query = `
      query {
        notifications(order_by: { created_at: desc }) {
          id
          message
          is_read
          created_at
        }
      }
    `;
    const data = await hasuraRequest(query);
    return data.notifications;
  },

  markRead: async (id: string) => {
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
    return hasuraRequest(query, { id });
  },
};
