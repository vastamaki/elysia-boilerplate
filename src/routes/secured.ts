import type { App } from "src/index";
import { version } from "../../package.json";

export default (app: App) =>
  app.get(
    "",
    () => ({
      status: "ok",
      version,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }),
    {
      auth: true,
    }
  );
