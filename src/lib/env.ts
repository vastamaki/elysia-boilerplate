import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().default(5432),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
});

export async function parseENV() {
  try {
    schema.parse(Bun.env);
  } catch (err) {
    console.error("Invalid environment variables:", err);
    process.exit(1);
  }
}

declare module "bun" {
  interface Env extends z.TypeOf<typeof schema> {}
}
