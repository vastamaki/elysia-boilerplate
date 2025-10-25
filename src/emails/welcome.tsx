import { Tailwind, Section, Text, Hr } from "@react-email/components";

export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen bg-gray-50 font-sans py-12">
        <Section className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <Section className="bg-green-600 px-8 py-8 text-center">
            <Text className="text-white text-3xl font-bold m-0">🎉</Text>
            <Text className="text-white text-xl font-semibold m-0 mt-3">
              Welcome to Our Platform!
            </Text>
          </Section>

          <Section className="px-8 py-10">
            <Text className="text-gray-700 text-base mb-6">Hi {name},</Text>
            <Text className="text-gray-600 text-sm leading-relaxed mb-8">
              Welcome to our platform! We're excited to have you on board. Your
              account has been successfully created and you're all set to
              explore.
            </Text>

            <Section className="bg-green-50 rounded-lg px-5 py-4 mb-6 border border-green-100">
              <Text className="text-green-900 text-sm font-medium m-0 mb-1">
                🚀 Get Started
              </Text>
              <Text className="text-green-700 text-xs m-0 leading-relaxed">
                Log in to your account and start discovering all the features we
                have to offer.
              </Text>
            </Section>

            <Text className="text-gray-500 text-xs leading-relaxed">
              If you have any questions, feel free to reach out to our support
              team.
            </Text>
          </Section>

          <Hr className="border-gray-200 m-0" />

          <Section className="px-8 py-6 text-center">
            <Text className="text-gray-600 text-sm font-medium mb-1">
              Happy exploring!
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

WelcomeEmail.PreviewProps = {
  name: "John Doe",
};
