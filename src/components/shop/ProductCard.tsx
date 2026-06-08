"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  collection?: string | null;
}

interface ProductCardProps {
  product: ShopProduct;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col">
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
  );
}
