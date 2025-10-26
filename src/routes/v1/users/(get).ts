import { t } from "elysia";
import type { App } from "src/index";
import { db } from "src/lib/db";
import { users } from "src/lib/db/schema/auth";

export default (app: App) =>
  app.post(
    "",
    async () => {
      const results = await db.select().from(users);

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
