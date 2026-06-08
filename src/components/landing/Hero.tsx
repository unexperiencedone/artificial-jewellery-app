import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function Hero() {
  return (
    <section
      className="min-h-[870px] flex flex-col md:flex-row items-center overflow-hidden reveal active"
      id="hero-section"
    >
      <div className="w-full md:w-[55%] h-[512px] md:h-[870px] relative flex items-center justify-center bg-background">
        <img
          className="w-full h-full object-cover flat-lay-blend transition-transform duration-1000 ease-out"
          alt="Artificial jewellery Hero Image"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZdqhZ7xUezftUnV4yK7OycAzmOrA-OPCd03_44rPt54fSmEx5VYYiXGF6tsz_IkA7uuZG_RbVoicvuDC_RcsgKPokNNYEkdj1zxTilOK2piZ8TfZLWnx_fuwar5FZ9Ct7YgLmVTWbf_Uy1eWEE16yMqGBeLjcKuclwvqNKOqFqLcVZAJihvslk1VLrK4TSkjuv4uMQyoJ4c9-wMGaYRfgZsyitBLMmLUYCKY4l-Gva49I183GQtaDM_YvdE6HyZutwjG4VUZUEik"
        />
      </div>
      <div className="w-full md:w-[45%] h-full flex items-center justify-center relative p-8 md:p-12 lg:p-24">
        <div className="absolute w-[400px] h-[400px] border border-outline-variant rounded-full -z-10 opacity-40" />
        <div className="text-center md:text-left">
          <p className="font-label-sm text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
            New Collection 2025
          </p>
          <h1 className="font-headline-lg text-display-lg italic mb-6">
            Adorned in elegance
          </h1>
          <p className="font-body-lg text-on-surface-variant mb-10 max-w-md mx-auto md:mx-0">
            Handcrafted pearl & crystal jewellery designed for the modern woman
            who values quiet luxury and timeless sophistication.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <Link
              href="/shop"
              className="px-10 py-4 bg-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-all duration-250 ease-in-out shadow-sm"
            >
              Shop the collection
            </Link>
            <Link
              href="/shop"
              className="font-label-sm text-label-sm uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-4 transition-all duration-250 ease-in-out group"
            >
              View lookbook{" "}
              <MaterialIcon name="arrow_forward" className="text-[16px]" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
