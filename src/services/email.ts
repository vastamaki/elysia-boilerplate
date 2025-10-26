import { render } from '@react-email/render';
import { Resend } from 'resend';
import ResetPasswordEmail from 'src/emails/reset-password';
import VerifyEmail from 'src/emails/verify-email';
import { env } from 'src/lib/env';

/**
 * Email service for sending various types of emails using Resend
 *
 * The default sender email can be configured via FROM_EMAIL environment variable.
 *
 * Usage examples:
 * ```typescript
 * import { emailService } from 'src/services/email';
 *
 * // Send welcome email
 * await emailService.sendWelcomeEmail('user@example.com', 'John Doe');
 *
 * // Send custom email with custom sender
 * await emailService.sendCustomEmail(
 *   'user@example.com',
 *   'Custom Subject',
 *   '<h1>Custom HTML</h1>',
 *   'custom@yourcompany.com'
 * );
 * ```
 */
class EmailService {
  private resend: Resend;
  private defaultFromEmail: string;

  constructor(apiKey: string, defaultFromEmail: string) {
    this.resend = new Resend(apiKey);
    this.defaultFromEmail = defaultFromEmail;
  }

  private async sendEmail(to: string, subject: string, html: string, from?: string) {
    return await this.resend.emails.send({
      from: from || this.defaultFromEmail,
      to,
      subject,
      html,
    });
  }

  async sendVerificationEmail(to: string, verificationLink: string) {
    const html = await render(VerifyEmail({ verificationLink }));
    return this.sendEmail(to, 'Verify your email', html);
  }

  async sendResetPasswordEmail(to: string, resetLink: string) {
    const html = await render(ResetPasswordEmail({ resetLink }));
    return this.sendEmail(to, 'Reset your password', html);
  }

  async sendCustomEmail(to: string, subject: string, html: string, from?: string) {
    return this.sendEmail(to, subject, html, from);
  }
}

export const emailService = new EmailService(env.RESEND_API_KEY, env.FROM_EMAIL);
