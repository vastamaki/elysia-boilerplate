import { SQL } from 'bun';
import { drizzle } from 'drizzle-orm/bun-sql';
import * as schema from 'src/lib/db/schema';
import { env } from 'src/lib/env';

export const databaseClient = new SQL({
  adapter: 'postgres',
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  max: 10,
  idleTimeout: 30,
  maxLifetime: 3600,
  connectionTimeout: 10,
});

export const db = drizzle({
  client: databaseClient,
  schema,
});
