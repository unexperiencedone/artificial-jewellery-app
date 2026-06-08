import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile py-12">
      <Suspense fallback={<div className="text-on-surface-variant">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
