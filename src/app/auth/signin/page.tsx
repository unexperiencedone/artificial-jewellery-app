import { Suspense } from "react";
import { SignInForm } from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile py-12">
      <Suspense fallback={<div className="text-on-surface-variant">Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
