import { hasuraRequest } from "../config/hasura";

export const NotificationService = {
  createManual: async (
  todo_id: string,
  message: string,
  type: string = "TODO_EVENT"
) => {
  const query = `
    mutation ($todo_id: uuid!, $message: String!, $type: String!) {
      insert_notifications_one(
        object: {
          todo_id: $todo_id
          message: $message
          type: $type
        }
      ) {
        id
        message
        type
        is_read
        created_at
      }
    }
  `;

  const data = await hasuraRequest(query, {
    todo_id,
    message,
    type
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
