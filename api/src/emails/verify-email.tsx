import { Button, Hr, Section, Tailwind, Text } from "@react-email/components";

export default function VerifyEmail({
  verificationLink,
}: {
  verificationLink: string;
}) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen bg-gray-50 font-sans py-8">
        <Section className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <Section className="bg-violet-600 px-6 py-6 text-center">
            <Text className="text-white text-2xl font-bold m-0">✅</Text>
            <Text className="text-white text-lg font-semibold m-0 mt-3">
              Verify Your Email
            </Text>
          </Section>

          <Section className="px-6 py-8">
            <Text className="text-gray-700 text-base mb-6">Hi there,</Text>
            <Text className="text-gray-600 text-sm leading-relaxed mb-8">
              Please verify your email address to complete your registration and
              start using our platform.
            </Text>

            <Section className="text-center mb-8">
              <Button
                href={verificationLink}
                className="bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold text-sm"
              >
                Verify Email
              </Button>
            </Section>

            <Section className="bg-blue-50 rounded-lg px-4 py-3 mb-6 border border-blue-100">
              <Text className="text-blue-900 text-sm font-medium m-0 mb-1">
                🔒 Secure verification
              </Text>
              <Text className="text-blue-700 text-xs m-0 leading-relaxed">
                This link is secure and will expire in 24 hours. We'll never ask
                you to share your verification link.
              </Text>
            </Section>

            <Text className="text-gray-500 text-xs leading-relaxed">
              If the button doesn't work, copy and paste this link into your
              browser: {verificationLink}
            </Text>
          </Section>

          <Hr className="border-gray-200 m-0" />

          <Section className="px-6 py-4 text-center">
            <Text className="text-gray-600 text-sm font-medium mb-1">
              Thanks for joining us!
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

VerifyEmail.PreviewProps = {
  verificationLink: "https://yourapp.com/verify-email?token=xyz789",
};
