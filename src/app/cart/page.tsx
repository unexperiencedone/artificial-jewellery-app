"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/cart");
      return;
    }
    if (status !== "authenticated") return;

    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, [status, router]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  async function removeItem(itemId: string) {
    const res = await fetch(`/api/cart?itemId=${itemId}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-on-surface-variant">Loading cart...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <h1 className="font-headline-lg text-headline-lg mb-12">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <MaterialIcon
                name="shopping_bag"
                className="text-outline-variant mb-6"
                size={48}
              />
              <p className="font-body-lg text-on-surface-variant mb-8">
                Your cart is empty
              </p>
              <Link
                href="/shop"
                className="px-10 py-4 bg-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 bg-surface-container-low p-6 rounded-lg"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-body-md text-on-surface mb-1">
                        {item.product.name}
                      </h3>
                      <p className="font-label-sm text-primary tracking-widest mb-4">
                        ₹{item.product.price.toLocaleString("en-IN")} × {item.quantity}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-label-sm text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="font-body-md text-on-surface">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-surface-container p-8 rounded-lg h-fit">
                <h2 className="font-headline-md text-headline-md mb-6">Order Summary</h2>
                <div className="flex justify-between mb-4 font-body-md">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between mb-4 font-body-md">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span>{total >= 999 ? "Free" : "₹99"}</span>
                </div>
                <div className="border-t border-outline-variant pt-4 flex justify-between font-headline-md mb-8">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{(total + (total >= 999 ? 0 : 99)).toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full py-4 bg-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
