import { Elysia } from "elysia";
import { authPlugin } from "src/plugins/auth";
import { corsPlugin } from "src/plugins/cors";
import { openAPIPlugin } from "src/plugins/openapi";
import { router } from "elysia-router";
import { env } from "src/lib/env";

const app = new Elysia({
  prefix: "/api",
})
  .use(corsPlugin)
  .use(authPlugin)
  .use(openAPIPlugin)
  .use(
    router({
      directory: "src/routes",
    })
  )
  .listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
