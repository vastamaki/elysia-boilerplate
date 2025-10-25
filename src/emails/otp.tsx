import { Tailwind, Section, Text, Hr } from "@react-email/components";

export default function OTPEmail({ otp }: { otp: number }) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen bg-gray-50 font-sans py-12">
        <Section className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <Section className="bg-violet-600 px-8 py-8 text-center">
            <Text className="text-white text-3xl font-bold m-0">✉️</Text>
            <Text className="text-white text-xl font-semibold m-0 mt-3">
              Verify Your Email
            </Text>
          </Section>

          <Section className="px-8 py-10">
            <Text className="text-gray-700 text-base mb-6">Hi there,</Text>
            <Text className="text-gray-600 text-sm leading-relaxed mb-8">
              Enter this verification code to confirm your email address and
              complete your registration.
            </Text>

            <Section className="bg-gray-50 rounded-xl px-6 py-10 text-center mb-8 border-2 border-gray-200">
              <Text className="text-6xl font-bold text-gray-900 m-0 tracking-widest">
                {otp}
              </Text>
              <Text className="text-gray-400 text-sm mt-4 m-0">
                Expires in 10 minutes
              </Text>
            </Section>

            <Section className="bg-blue-50 rounded-lg px-5 py-4 mb-6 border border-blue-100">
              <Text className="text-blue-900 text-sm font-medium m-0 mb-1">
                🔒 Keep this code private
              </Text>
              <Text className="text-blue-700 text-xs m-0 leading-relaxed">
                We'll never ask you to share your verification code with anyone,
                including our support team.
              </Text>
            </Section>

            <Text className="text-gray-500 text-xs leading-relaxed">
              If you didn't request this verification code, you can safely
              ignore this email.
            </Text>
          </Section>

          <Hr className="border-gray-200 m-0" />

          <Section className="px-8 py-6 text-center">
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

OTPEmail.PreviewProps = {
  otp: 123456,
};
