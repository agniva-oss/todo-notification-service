import "dotenv/config";

export const env = {
  PORT: process.env.PORT || "4000",
  REDIS_URL: process.env.REDIS_URL!,
  HASURA_ENDPOINT: process.env.HASURA_ENDPOINT!,
  HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET!
};


if (!env.REDIS_URL || !env.HASURA_ENDPOINT || !env.HASURA_ADMIN_SECRET) {
  throw new Error("Missing required env variables");
}