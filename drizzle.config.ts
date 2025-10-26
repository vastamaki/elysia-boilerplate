import type { Config } from "drizzle-kit";
import { env } from "src/lib/env";

export default {
  schema: ["./src/lib/db/schema/**/*.ts"],
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.DB_PORT,
    ssl: env.NODE_ENV === "production" ? true : false,
  },
} satisfies Config;
