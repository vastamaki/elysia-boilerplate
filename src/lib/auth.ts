import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "src/lib/db";
import { openAPI, admin, customSession } from "better-auth/plugins";
import { emailService } from "src/services/email";
import type { UserRole } from "src/lib/db/schema/auth";

const options = {
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await emailService.sendResetPasswordEmail(user.email, url);
    },
  },
  plugins: [
    admin({
      adminRoles: ["admin"],
      defaultRole: "user",
    }),
    openAPI({
      path: "/api/auth",
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
