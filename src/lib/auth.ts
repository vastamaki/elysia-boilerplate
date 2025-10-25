import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "src/lib/db";
import { openAPI } from "better-auth/plugins";
import { Resend } from "resend";
import { render } from "@react-email/render";
import OTPEmail from "src/emails/otp";
import WelcomeEmail from "src/emails/welcome";
import ResetPasswordEmail from "src/emails/reset-password";
import VerifyEmail from "src/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI({
      path: "/api/auth",
    }),
  ],
  disabledPaths: ["/auth/api/get-session"],
  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: any;
      url: string;
    }) => {
      const html = await render(VerifyEmail({ verificationLink: url }));
      await resend.emails.send({
        from: "noreply@yourcompany.com",
        to: user.email,
        subject: "Verify your email",
        html,
      });
    },
  },
  passwordReset: {
    sendResetPasswordEmail: async ({
      user,
      url,
    }: {
      user: any;
      url: string;
    }) => {
      const html = await render(ResetPasswordEmail({ resetLink: url }));
      await resend.emails.send({
        from: "noreply@yourcompany.com",
        to: user.email,
        subject: "Reset your password",
        html,
      });
    },
  },
});
