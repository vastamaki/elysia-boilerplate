import Elysia from 'elysia';
import { auth } from 'src/lib/auth';
import type { UserRole } from 'src/lib/db/schema/auth';

export const authPlugin = new Elysia({ name: 'better-auth' }).mount(auth.handler).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return status(401);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
  requiredRole: (role: UserRole) => ({
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return status(401);

      if (session.user.role !== role) return status(403);

      return {
        user: session.user,
        session: session.session,
      };
    },
  }),
});
