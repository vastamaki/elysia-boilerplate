import { t } from 'elysia';
import type { App } from 'src/index';
import { db } from 'src/lib/db';
import { users } from 'src/lib/db/schema/auth';

const cacheKey = 'users:list';

export default (app: App) =>
  app.get(
    '',
    async ({ redis }) => {
      const cachedResults = await redis.get(cacheKey);

      if (cachedResults) {
        return JSON.parse(cachedResults);
      }

      const results = await db.select().from(users);
      await redis.set(cacheKey, JSON.stringify(results));

      return results;
    },
    {
      auth: true,
      requiredRole: 'admin',
      response: {
        200: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            email: t.String(),
            emailVerified: t.Boolean(),
            image: t.Nullable(t.String()),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          }),
        ),
      },
      detail: {
        description: 'List all users in the system',
        tags: ['Users'],
      },
      body: t.Object({
        refreshToken: t.String(),
      }),
    },
  );
