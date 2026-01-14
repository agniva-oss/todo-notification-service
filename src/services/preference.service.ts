import { hasuraRequest } from "../config/hasura";

export type NotificationPreference = {
  user_id: string;
  email: string | null;
  push: boolean;
  reminder_time: number | null;
  enabled: boolean;
};

export type UpdatePreferenceInput = Partial<
  Pick<NotificationPreference, "email" | "push" | "reminder_time" | "enabled">
>;

export class PreferenceService {
  constructor(private readonly request = hasuraRequest) {}

  async get(user_id: string): Promise<NotificationPreference | null> {
    try {
      const query = `
        query ($user_id: uuid!) {
          notification_preferences_by_pk(user_id: $user_id) {
            user_id
            email
            push
            reminder_time
            enabled
          }
        }
      `;

      const data = await this.request(query, { user_id });
      return data.notification_preferences_by_pk;
    } catch (error) {
      console.error("PreferenceService.get error:", error);
      throw new Error("Failed to fetch notification preferences");
    }
  }

  async update(
    user_id: string,
    updates: UpdatePreferenceInput
  ): Promise<NotificationPreference> {
    try {
      if (!Object.keys(updates).length) {
        throw new Error("No updates provided");
      }

      const setClause = Object.keys(updates)
        .map((key) => `${key}: $${key}`)
        .join(", ");

      const query = `
        mutation (
          $user_id: uuid!
          $email: String
          $push: Boolean
          $reminder_time: Int
          $enabled: Boolean
        ) {
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

      const variables = { user_id, ...updates };

      const data = await this.request(query, variables);
      return data.update_notification_preferences_by_pk;
    } catch (error) {
      console.error("PreferenceService.update error:", error);
      throw new Error("Failed to update notification preferences");
    }
  }
}
