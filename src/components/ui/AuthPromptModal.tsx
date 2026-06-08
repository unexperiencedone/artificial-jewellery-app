"use client";

import Link from "next/link";
import { MaterialIcon } from "./MaterialIcon";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  returnUrl?: string;
}

export function AuthPromptModal({
  isOpen,
  onClose,
  action,
  returnUrl = "/shop",
}: AuthPromptModalProps) {
  if (!isOpen) return null;

  const signInUrl = `/auth/signin?callbackUrl=${encodeURIComponent(returnUrl)}`;
  const registerUrl = `/auth/register?callbackUrl=${encodeURIComponent(returnUrl)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-surface-container-lowest rounded-lg p-8 max-w-md w-full shadow-[0px_10px_40px_rgba(44,42,37,0.15)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Close"
        >
          <MaterialIcon name="close" size={20} />
        </button>

        <div className="text-center mb-8">
          <MaterialIcon
            name="lock"
            className="text-primary mb-4"
            size={40}
          />
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
            Sign in to continue
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Please sign in or create an account to {action}.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={signInUrl}
            className="w-full py-4 bg-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-widest text-center hover:bg-on-primary-fixed-variant transition-all"
          >
            Sign In
          </Link>
          <Link
            href={registerUrl}
            className="w-full py-4 border border-primary text-primary rounded-full font-label-sm text-label-sm uppercase tracking-widest text-center hover:bg-primary/5 transition-all"
          >
            Create Account
          </Link>
        </div>

        <p className="text-center mt-6 font-label-sm text-[11px] text-on-surface-variant">
          You can browse freely — we only ask you to sign in when needed.
        </p>
      </div>
    </div>
  );
}
