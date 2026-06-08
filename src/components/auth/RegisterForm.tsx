"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OAuthButtons } from "./OAuthButtons";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/shop";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <Link href="/" className="font-headline-md text-headline-md italic text-primary">
          Lumière
        </Link>
        <h1 className="font-headline-lg text-headline-lg mt-6 mb-2">Create account</h1>
        <p className="font-body-md text-on-surface-variant">Join the Lumière family</p>
      </div>

      <OAuthButtons callbackUrl={callbackUrl} />

      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-outline-variant" />
        <span className="font-label-sm text-[11px] uppercase tracking-widest text-on-surface-variant">
          or
        </span>
        <div className="flex-1 h-px bg-outline-variant" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="text-error text-sm text-center bg-error-container px-4 py-2 rounded-lg">
            {error}
          </p>
        )}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-6 py-4 border border-outline-variant rounded-full font-body-md focus:ring-1 focus:ring-primary outline-none bg-surface-container-low"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-6 py-4 border border-outline-variant rounded-full font-body-md focus:ring-1 focus:ring-primary outline-none bg-surface-container-low"
        />
        <input
          type="password"
          placeholder="Password (min 8 chars, upper, lower, number)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full px-6 py-4 border border-outline-variant rounded-full font-body-md focus:ring-1 focus:ring-primary outline-none bg-surface-container-low"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-all disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-8 font-body-md text-on-surface-variant">
        Already have an account?{" "}
        <Link
          href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
