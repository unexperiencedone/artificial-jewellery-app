import { LandingPage } from "@/components/landing/LandingPage";
import { prisma } from "@/lib/prisma";

// Fetch products at request time — not during `next build`.
// Build servers (e.g. Vercel) cannot reach Supabase direct DB connections.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { bestseller: true },
    take: 4,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      imageUrl: true,
      slug: true,
    },
  });

  return <LandingPage products={products} />;
}
