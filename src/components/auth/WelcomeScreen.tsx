"use client";

import Link from "next/link";
import { OAuthButtons } from "./OAuthButtons";
import { BRAND_NAME } from "@/lib/constants";
import {
  GUEST_MODE_COOKIE,
  MOBILE_WELCOME_SEEN_COOKIE,
} from "@/lib/constants";

export function WelcomeScreen() {
  function handleSkip() {
    document.cookie = `${GUEST_MODE_COOKIE}=true; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    document.cookie = `${MOBILE_WELCOME_SEEN_COOKIE}=true; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    window.location.href = "/shop";
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-margin-mobile py-12">
      <div className="w-full max-w-md text-center">
        <p className="font-label-sm text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
          Welcome to
        </p>
        <h1 className="font-headline-lg text-display-lg italic text-on-surface mb-4">
          {BRAND_NAME}
        </h1>
        <p className="font-body-lg text-on-surface-variant mb-12">
          Discover handcrafted pearl & crystal jewellery. Sign in for a personalized
          experience, or browse freely.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <Link
            href="/auth/signin?callbackUrl=/shop"
            className="w-full py-4 bg-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register?callbackUrl=/shop"
            className="w-full py-4 border border-primary text-primary rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/5 transition-all"
          >
            Create Account
          </Link>
        </div>

        <OAuthButtons callbackUrl="/shop" />

        <button
          type="button"
          onClick={handleSkip}
          className="mt-10 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline"
        >
          Skip — browse as guest
        </button>
      </div>
    </div>
  );
}
