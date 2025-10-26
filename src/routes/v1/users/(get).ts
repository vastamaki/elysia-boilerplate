import { t } from "elysia";
import type { App } from "src/index";
import { db } from "src/lib/db";
import { usersTable } from "src/lib/db/schema/auth";

const cacheKey = "users:list";

export default (app: App) =>
  app.post(
    "",
    async ({ redis }) => {
      const cachedResults = await redis.get(cacheKey);

      if (cachedResults) {
        return JSON.parse(cachedResults);
      }

      const results = await db.select().from(usersTable);
      await redis.set(cacheKey, JSON.stringify(results));

      return results;
    },
    {
      auth: true,
      response: {
        200: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            email: t.String(),
            emailVerified: t.Boolean(),
            image: t.String().Nullable(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          })
        ),
      },
      detail: {
        description: "List all users in the system",
      },
      body: t.Object({
        refreshToken: t.String(),
      }),
    }
  );
