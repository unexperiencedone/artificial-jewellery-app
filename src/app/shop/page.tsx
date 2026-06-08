"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ProductCard, type ShopProduct } from "@/components/shop/ProductCard";
import { AuthPromptModal } from "@/components/ui/AuthPromptModal";
import { COLLECTIONS } from "@/lib/constants";

function ShopContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const collection = searchParams.get("collection");
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<{
    open: boolean;
    action: string;
  }>({ open: false, action: "" });

  useEffect(() => {
    const params = new URLSearchParams();
    if (collection) params.set("collection", collection);
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => setProducts(data.products ?? []))
      .finally(() => setLoading(false));
  }, [collection]);

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

  const activeCollection = COLLECTIONS.find((c) => c.slug === collection);

  return (
    <>
      <Navbar
        onCartClick={() =>
          session
            ? router.push("/cart")
            : setAuthModal({ open: true, action: "view your cart" })
        }
        onWishlistClick={() =>
          requireAuth("view your wishlist", () => {})
        }
      />
      <main className="pt-16 min-h-screen">
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <p className="font-label-sm text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
              Boutique
            </p>
            <h1 className="font-headline-lg text-headline-lg italic mb-4">
              {activeCollection?.name ?? "All Collections"}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link
                href="/shop"
                className={`font-label-sm text-label-sm uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
                  !collection
                    ? "bg-primary text-white"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                All
              </Link>
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?collection=${c.slug}`}
                  className={`font-label-sm text-label-sm uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
                    collection === c.slug
                      ? "bg-primary text-white"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-center text-on-surface-variant font-body-md">
              Loading collections...
            </p>
          ) : products.length === 0 ? (
            <p className="text-center text-on-surface-variant font-body-md">
              No products found. Run{" "}
              <code className="text-primary">npm run db:seed</code> to populate.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      <AuthPromptModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ open: false, action: "" })}
        action={authModal.action}
        returnUrl="/shop"
      />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopContent />
    </Suspense>
  );
}
