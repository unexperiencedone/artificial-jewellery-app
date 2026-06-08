"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { FeaturedCollections } from "./FeaturedCollections";
import { Bestsellers } from "./Bestsellers";
import { BrandStory } from "./BrandStory";
import { Testimonials } from "./Testimonials";
import { InstagramStrip } from "./InstagramStrip";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { AuthPromptModal } from "@/components/ui/AuthPromptModal";
import type { Product } from "./Bestsellers";

interface LandingPageProps {
  products: Product[];
}

export function LandingPage({ products }: LandingPageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [authModal, setAuthModal] = useState<{
    open: boolean;
    action: string;
  }>({ open: false, action: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const requireAuth = useCallback(
    (action: string, callback: () => void) => {
      if (!session) {
        setAuthModal({ open: true, action });
        return;
      }
      callback();
    },
    [session],
  );

  const handleAddToCart = (productId: string) => {
    requireAuth("add items to your cart", async () => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) router.push("/cart");
    });
  };

  const handleAddToWishlist = (productId: string) => {
    requireAuth("save items to your wishlist", async () => {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    });
  };

  return (
    <>
      <Navbar
        onCartClick={() =>
          session ? router.push("/cart") : setAuthModal({ open: true, action: "view your cart" })
        }
        onWishlistClick={() =>
          requireAuth("view your wishlist", () => router.push("/shop"))
        }
      />
      <main className="pt-16">
        <Hero />
        <TrustBar />
        <FeaturedCollections />
        <Bestsellers
          products={products}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
        <BrandStory />
        <Testimonials />
        <InstagramStrip />
        <Newsletter />
      </main>
      <Footer />

      <AuthPromptModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ open: false, action: "" })}
        action={authModal.action}
      />
    </>
  );
}
