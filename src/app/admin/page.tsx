import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/shop");
  }

  const [userCount, productCount, orderCount, blockedRequests] =
    await Promise.all([
      prisma.user.count({ where: { role: "USER" } }),
      prisma.product.count(),
      prisma.order.count(),
      prisma.rateLimitLog.count({ where: { blocked: true } }),
    ]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-outline-variant px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
        <Link href="/" className="font-headline-md text-headline-md italic text-primary">
          Lumière Admin
        </Link>
        <Link
          href="/shop"
          className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary"
        >
          View Store
        </Link>
      </nav>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <h1 className="font-headline-lg text-headline-lg mb-12">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {[
            { label: "Users", value: userCount },
            { label: "Products", value: productCount },
            { label: "Orders", value: orderCount },
            { label: "Blocked Requests", value: blockedRequests },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-low p-8 rounded-lg text-center"
            >
              <p className="font-display-lg text-display-lg text-primary mb-2">
                {stat.value}
              </p>
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-body-md text-on-surface-variant">
          Admin accounts can only be created via{" "}
          <code className="text-primary">npm run db:seed</code>. User registration
          remains open to the public.
        </p>
      </main>
    </div>
  );
}
