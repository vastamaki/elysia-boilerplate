import {
  AuthLoading,
  RedirectToSignIn,
  SignedIn,
} from "@daveyplate/better-auth-ui";
import DashboardLayout from "~/layouts/dashboard-layout";

export default function ProtectedLayout() {
  return (
    <>
      <AuthLoading>
        <div>
          <h1>Loading your dashboard...</h1>
        </div>
      </AuthLoading>
      <RedirectToSignIn />
      <SignedIn>
        <DashboardLayout />
      </SignedIn>
    </>
  );
}
