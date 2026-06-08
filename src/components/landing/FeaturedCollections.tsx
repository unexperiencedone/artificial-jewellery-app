import Link from "next/link";
import { COLLECTIONS } from "@/lib/constants";

export function FeaturedCollections() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal active">
      <h2 className="font-headline-lg text-headline-lg text-center mb-16">
        Shop by collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={`/shop?collection=${collection.slug}`}
            className="group block overflow-hidden"
          >
            <div className="aspect-square bg-surface-container-low mb-4 overflow-hidden rounded-lg">
              <img
                className="w-full h-full object-cover product-image-zoom"
                alt={collection.name}
                src={collection.image}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface border-b border-transparent group-hover:border-primary group-hover:text-primary transition-all duration-250 ease-in-out py-1">
                {collection.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
