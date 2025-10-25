import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";
import * as authSchema from "src/lib/db/schema/auth";
//import * as schema from "src/lib/db/schema/index";

export const databaseClient = new SQL({
  adapter: "postgres",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeout: 30,
  maxLifetime: 3600,
  connectionTimeout: 10,
});

export const db = drizzle({
  client: databaseClient,
  schema: {
    ...authSchema,
    //...schema,
  },
});
