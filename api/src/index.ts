import { Elysia } from 'elysia';
import { router } from 'elysia-router';
import { env } from 'src/lib/env';
import { redisClient } from 'src/lib/redis';
import { authPlugin } from 'src/plugins/auth';
import { corsPlugin } from 'src/plugins/cors';
import { openAPIPlugin } from 'src/plugins/openapi';

const app = new Elysia({
  prefix: '/api',
})
  .decorate('redis', redisClient)
  .use(corsPlugin)
  .use(authPlugin)
  .use(
    router({
      directory: 'src/routes',
    }),
  )
  .use(openAPIPlugin)
  .listen(env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
