import { hasuraRequest } from "../config/hasura";

export const PreferenceService = {
  get: async (user_id: string) => {
    const query = `
      query ($user_id: uuid!) {
        notification_preferences_by_pk(user_id: $user_id) {
          email
          push
          reminder_time
          enabled
        }
      }
    `;
    const data = await hasuraRequest(query, { user_id });
    return data.notification_preferences_by_pk;
  },

  update: async (user_id: string, updates: any) => {
    const setClause = Object.keys(updates).map(key => `${key}: $${key}`).join(', ');
    const variables = { user_id, ...updates };
    const query = `
      mutation ($user_id: uuid!, $email: String, $push: Boolean, $reminder_time: Int, $enabled: Boolean) {
        update_notification_preferences_by_pk(
          pk_columns: { user_id: $user_id }
          _set: { ${setClause} }
        ) {
          user_id
          email
          push
          reminder_time
          enabled
        }
      }
    `;
    const data = await hasuraRequest(query, variables);
    return data.update_notification_preferences_by_pk;
  },
};
