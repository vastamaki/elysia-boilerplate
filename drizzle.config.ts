import type { Config } from "drizzle-kit";

export default {
  schema: ["./src/lib/db/schema/**/*.ts"],
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  },
} satisfies Config;
