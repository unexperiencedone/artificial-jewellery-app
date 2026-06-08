"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

interface BestsellersProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
}

export function Bestsellers({
  products,
  onAddToCart,
  onAddToWishlist,
}: BestsellersProps) {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low/30 overflow-hidden reveal active">
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-headline-lg text-headline-lg">Bestsellers</h2>
          <Link
            href="/shop"
            className="font-label-sm text-label-sm uppercase tracking-widest text-primary border-b border-primary hover:opacity-70 transition-all duration-250 ease-in-out"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              <div className="aspect-[3/4] bg-white overflow-hidden rounded-lg relative">
                <img
                  className="w-full h-full object-cover product-image-zoom"
                  alt={product.name}
                  src={product.imageUrl}
                />
                <button
                  type="button"
                  onClick={() => onAddToWishlist(product.id)}
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-in-out hover:bg-white cart-pulse"
                  aria-label="Add to wishlist"
                >
                  <MaterialIcon name="favorite" className="text-primary" size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(product.id)}
                  className="absolute bottom-0 left-0 w-full py-4 bg-primary text-white font-label-sm text-label-sm uppercase tracking-widest translate-y-full group-hover:translate-y-0 add-to-cart-slide"
                >
                  Add to cart
                </button>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-body-md text-on-surface mb-1">{product.name}</h3>
                <p className="font-label-sm text-primary tracking-widest">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
