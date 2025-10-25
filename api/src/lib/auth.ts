import { type BetterAuthOptions, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, customSession, openAPI } from 'better-auth/plugins';
import { db } from 'src/lib/db';
import * as schema from 'src/lib/db/schema';
import type { UserRole } from 'src/lib/db/schema/auth';
import { emailService } from 'src/services/email';

const options = {
  basePath: '/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema: schema.authSchema,
  }),
  trustedOrigins: [process.env.APP_URL || 'http://localhost:5173'],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await emailService.sendResetPasswordEmail(user.email, url);
    },
  },
  plugins: [
    admin({
      adminRoles: ['admin'],
      defaultRole: 'user',
    }),
    openAPI({
      path: '/api/auth',
    }),
  ],
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await emailService.sendVerificationEmail(user.email, url);
    },
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      return {
        user: {
          ...user,
          role: user.role as UserRole,
        },
        session,
      };
    }, options),
  ],
});
