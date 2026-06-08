import { INSTAGRAM_IMAGES } from "@/lib/constants";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function InstagramStrip() {
  return (
    <section className="py-stack-lg reveal active">
      <h2 className="font-label-sm text-label-sm uppercase tracking-[0.4em] text-center mb-12">
        As seen on Instagram
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {INSTAGRAM_IMAGES.map((src, i) => (
          <div key={i} className="aspect-square relative group cursor-pointer">
            <img className="w-full h-full object-cover" alt="" src={src} />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-in-out flex items-center justify-center">
              <MaterialIcon name="photo_camera" className="text-white" size={32} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
