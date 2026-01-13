import axios from "axios";
import { env } from "./env";

export async function hasuraRequest(
  query: string,
  variables?: Record<string, any>
) {
  const res = await axios.post(
    env.HASURA_ENDPOINT,
    { query, variables },
    {
      headers: {
        "x-hasura-admin-secret": env.HASURA_ADMIN_SECRET,
        "Content-Type": "application/json",
      },
    }
  );

  if (res.data.errors) {
    throw new Error(JSON.stringify(res.data.errors));
  }

  return res.data.data;
}
