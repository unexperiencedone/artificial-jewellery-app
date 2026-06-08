import { MaterialIcon } from "@/components/ui/MaterialIcon";

const TRUST_ITEMS = [
  { icon: "local_shipping", text: "Free shipping above ₹999" },
  { icon: "assignment_return", text: "Easy 7-day returns" },
  { icon: "verified", text: "Hallmark certified" },
  { icon: "redeem", text: "Gift wrapping available" },
] as const;

export function TrustBar() {
  return (
    <section className="h-12 bg-surface-container-low flex items-center border-y border-outline-variant/30 reveal active">
      <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.text} className="flex items-center justify-center gap-2">
            <MaterialIcon name={item.icon} className="text-primary" size={18} />
            <span className="font-label-sm text-[11px] text-on-secondary-container uppercase tracking-tighter">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
