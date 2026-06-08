"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { BRAND_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Collections", href: "/shop" },
  { label: "Boutique", href: "/shop" },
  { label: "High Jewelry", href: "/shop" },
  { label: "Our Story", href: "/#story" },
  { label: "Journal", href: "/shop" },
];

interface NavbarProps {
  onCartClick?: () => void;
  onWishlistClick?: () => void;
}

export function Navbar({ onCartClick, onWishlistClick }: NavbarProps) {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop bg-background border-b border-outline-variant transition-all duration-250 ease-in-out ${
        scrolled
          ? "h-14 shadow-[0px_10px_40px_rgba(44,42,37,0.05)]"
          : "h-16"
      }`}
    >
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-headline-md text-headline-md italic text-primary"
        >
          {BRAND_NAME}
        </Link>
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-label-sm text-label-sm uppercase tracking-widest transition-colors duration-250 ease-in-out ${
                i === 0
                  ? "text-primary border-b border-primary"
                  : "text-on-surface-variant hover:text-primary nav-link-draw"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:block">
          {session ? (
            <Link
              href="/shop"
              className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
            >
              {session.user?.name ?? "Account"}
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-250 ease-in-out"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="material-symbols-outlined text-primary hover:opacity-70 cart-pulse"
            aria-label="Search"
          >
            <MaterialIcon name="search" />
          </button>
          <button
            type="button"
            onClick={onWishlistClick}
            className="material-symbols-outlined text-primary hover:opacity-70 cart-pulse"
            aria-label="Wishlist"
          >
            <MaterialIcon name="favorite" />
          </button>
          <button
            type="button"
            onClick={onCartClick}
            className="material-symbols-outlined text-primary hover:opacity-70 cart-pulse"
            aria-label="Cart"
          >
            <MaterialIcon name="shopping_bag" />
          </button>
        </div>
      </div>
    </nav>
  );
}
