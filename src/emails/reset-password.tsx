import { Tailwind, Section, Text, Hr, Button } from "@react-email/components";

export default function ResetPasswordEmail({
  resetLink,
}: {
  resetLink: string;
}) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen bg-gray-50 font-sans py-12">
        <Section className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <Section className="bg-red-600 px-8 py-8 text-center">
            <Text className="text-white text-3xl font-bold m-0">🔑</Text>
            <Text className="text-white text-xl font-semibold m-0 mt-3">
              Reset Your Password
            </Text>
          </Section>

          <Section className="px-8 py-10">
            <Text className="text-gray-700 text-base mb-6">Hi there,</Text>
            <Text className="text-gray-600 text-sm leading-relaxed mb-8">
              We received a request to reset your password. Click the button
              below to create a new password.
            </Text>

            <Section className="text-center mb-8">
              <Button
                href={resetLink}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
              >
                Reset Password
              </Button>
            </Section>

            <Section className="bg-yellow-50 rounded-lg px-5 py-4 mb-6 border border-yellow-100">
              <Text className="text-yellow-900 text-sm font-medium m-0 mb-1">
                ⏰ Link expires in 1 hour
              </Text>
              <Text className="text-yellow-700 text-xs m-0 leading-relaxed">
                For security reasons, this link will expire in 1 hour. If you
                didn't request this, please ignore this email.
              </Text>
            </Section>

            <Text className="text-gray-500 text-xs leading-relaxed">
              If the button doesn't work, copy and paste this link into your
              browser: {resetLink}
            </Text>
          </Section>

          <Hr className="border-gray-200 m-0" />

          <Section className="px-8 py-6 text-center">
            <Text className="text-gray-600 text-sm font-medium mb-1">
              Need help?
            </Text>
            <Text className="text-gray-400 text-xs m-0">
              © 2025 Your Company • support@yourcompany.com
            </Text>
          </Section>
        </Section>
      </Section>
    </Tailwind>
  );
}

ResetPasswordEmail.PreviewProps = {
  resetLink: "https://yourapp.com/reset-password?token=abc123",
};
