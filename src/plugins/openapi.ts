import { fromTypes, openapi } from '@elysiajs/openapi';
import type { Path } from 'better-auth';
import { Elysia } from 'elysia';
import { auth } from 'src/lib/auth';
import { env } from 'src/lib/env';

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => {
  _schema ??= auth.api.generateOpenAPISchema();

  return _schema;
};

export const OpenAPI = {
  getPaths: (prefix = '/api/auth') =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path] as Path;

        for (const method of Object.keys(paths[path] as Path)) {
          const operation = reference[key][method as 'get' | 'post'];

          if (operation) {
            operation.tags = ['Auth'];
          }
        }
      }

      return reference;
    }) as Promise<never>,
  components: getSchema().then(({ components }) => components),
} as const;

export const openAPIPlugin = new Elysia().use(
  openapi({
    path: 'docs',
    enabled: env.NODE_ENV !== 'production',
    references: fromTypes(),
    documentation: {
      // @ts-expect-error
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    },
  }),
);
