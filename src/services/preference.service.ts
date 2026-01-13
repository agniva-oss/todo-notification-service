import { hasuraRequest } from "../config/hasura";

export const PreferenceService = {
  get: async (user_id: string) => {
    const query = `
      query ($user_id: uuid!) {
        notification_preferences_by_pk(user_id: $user_id) {
          email
          push
        }
      }
    `;
    const data = await hasuraRequest(query, { user_id });
    return data.notification_preferences_by_pk;
  },
};
