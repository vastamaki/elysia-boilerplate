import { Elysia } from "elysia";
import { fromTypes, openapi } from "@elysiajs/openapi";
import { auth } from "src/lib/auth";

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const OpenAPI = {
  getPaths: (prefix = "/api/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path]!;

        for (const method of Object.keys(paths[path]!)) {
          const operation = (reference[key] as any)[method];

          operation.tags = ["Auth"];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

export const openAPIPlugin = new Elysia().use(
  openapi({
    path: "docs",
    enabled: process.env.NODE_ENV !== "production",
    references: fromTypes(),
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    },
  })
);
