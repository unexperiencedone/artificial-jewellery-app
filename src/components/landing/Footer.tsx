import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { BRAND_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-surface-container-highest reveal active">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="font-headline-md text-headline-md italic text-on-surface"
          >
            {BRAND_NAME}
          </Link>
          <p className="font-body-md text-on-surface-variant max-w-[240px]">
            Timeless artistry in pearl and crystal, handcrafted for the modern
            soul.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
              aria-label="Website"
            >
              <MaterialIcon name="public" />
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
              aria-label="Instagram"
            >
              <MaterialIcon name="photo_camera" />
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
              aria-label="Video"
            >
              <MaterialIcon name="video_library" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-8">
            Shop
          </h4>
          <ul className="flex flex-col gap-4">
            {["Collections", "Boutique", "Bestsellers", "Gifts"].map((item) => (
              <li key={item}>
                <Link
                  href="/shop"
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-8">
            About
          </h4>
          <ul className="flex flex-col gap-4">
            {["Our Story", "Sourcing", "Stores", "Journal"].map((item) => (
              <li key={item}>
                <Link
                  href="/#story"
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-8">
            Care
          </h4>
          <ul className="flex flex-col gap-4">
            {["Shipping", "Returns", "Privacy Policy", "Contact Us"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
                  >
                    {item}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop py-8 border-t border-outline-variant/30 flex justify-center max-w-container-max mx-auto">
        <p className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">
          © 2024 {BRAND_NAME} Joaillerie. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
