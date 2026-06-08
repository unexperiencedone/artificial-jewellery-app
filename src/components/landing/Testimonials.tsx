import { MaterialIcon } from "@/components/ui/MaterialIcon";

const TESTIMONIALS = [
  {
    quote:
      "The craftsmanship is unparalleled. My pearl necklace feels like a modern heirloom that I'll cherish forever.",
    author: "Ananya Sharma",
  },
  {
    quote:
      "Lumière has the most exquisite minimalist designs. They are perfect for daily wear yet feel so special.",
    author: "Rhea Kapoor",
  },
  {
    quote:
      "I'm impressed by the beautiful packaging and fast shipping. A truly premium shopping experience.",
    author: "Natasha Vohra",
  },
] as const;

export function Testimonials() {
  return (
    <section className="py-stack-lg bg-surface-container reveal active">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-center mb-16">
          What our customers say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="bg-white p-10 rounded-lg shadow-[0px_10px_40px_rgba(44,42,37,0.05)] flex flex-col items-center text-center"
            >
              <div className="flex gap-1 mb-6 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MaterialIcon key={i} name="star" filled size={20} />
                ))}
              </div>
              <p className="font-headline-md italic mb-8">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-label-sm uppercase tracking-widest text-on-surface-variant">
                — {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
