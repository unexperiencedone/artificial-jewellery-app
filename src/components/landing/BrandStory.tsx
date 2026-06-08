import Link from "next/link";

export function BrandStory() {
  const points = [
    "Every piece is hand-curated by our master craftsmen in our small studio, ensuring that no two pieces are exactly alike.",
    "We ethically source our pearls and gemstones, prioritizing sustainable practices that honor the earth and the hands that work it.",
    "Lumière is built on the philosophy of 'Quiet Luxury' – jewelry that doesn't need to shout to be heard.",
  ];

  return (
    <section
      id="story"
      className="py-stack-lg flex flex-col lg:flex-row max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop items-center gap-20 reveal active"
    >
      <div className="w-full lg:w-1/2">
        <img
          className="w-full h-[600px] object-cover rounded-lg"
          alt="Skilled artisan hand-assembling a pearl necklace"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvB9NaHV4Pgdu7Yu73KryBHfV18r1QuZE2c2NpsEraE88m1wzgROxCl1_SL6bW9CeR-u5aZfI9f9XrPme94ON4A4OuoQSi7YqbLP2PeA92PXGEc7nla_4oTcm-jCOBLEnknS4X1EpEFAuXVlnvMjevhByCFNvAQmgaJUedlnvbr8vW1TL7ql1u0N3SSLGGAjZaF75fTIb5EU0M6i7lzjZy0ps1-Lz_ZQMh6CfzkUS_C0744dpI_dibZbPSj4RogPnBl7u1pH8UcyA"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-6 block">
          Our story
        </span>
        <h2 className="font-headline-lg text-headline-lg mb-8">
          Made with intention, worn with love
        </h2>
        <div className="space-y-6 mb-12">
          {points.map((point) => (
            <div key={point.slice(0, 30)} className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <p className="font-body-lg text-on-surface-variant">{point}</p>
            </div>
          ))}
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 font-label-sm text-label-sm uppercase tracking-widest text-primary hover:gap-5 transition-all duration-250 ease-in-out"
        >
          Meet the artisans →
        </Link>
      </div>
    </section>
  );
}
