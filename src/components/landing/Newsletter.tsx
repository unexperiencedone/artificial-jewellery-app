"use client";

import { FormEvent, useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-stack-lg bg-inverse-surface flex items-center justify-center text-center px-margin-mobile md:px-margin-desktop reveal active">
      <div className="max-w-xl w-full">
        <h2 className="font-headline-lg text-headline-lg text-white mb-4">
          Be the first to know
        </h2>
        <p className="font-body-md text-surface-container mb-10">
          Sign up for early access to new collections, secret sales, and jewelry
          care tips from our experts.
        </p>
        {submitted ? (
          <p className="font-body-md text-primary-fixed">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              className="flex-grow bg-transparent border border-primary text-white px-8 py-4 rounded-full font-label-sm focus:ring-1 focus:ring-primary outline-none transition-all duration-250 ease-in-out placeholder:text-outline-variant"
              placeholder="Your email address"
              type="email"
              required
            />
            <button
              className="bg-primary text-white px-10 py-4 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-all duration-250 ease-in-out"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
