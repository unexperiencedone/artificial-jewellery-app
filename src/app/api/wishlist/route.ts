import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { wishlistSchema } from "@/lib/validation";
import { secureApi, jsonError } from "@/lib/api-handler";

export const POST = secureApi(
  async (request) => {
    const session = await auth();
    if (!session?.user?.id) {
      return jsonError("Authentication required", 401, "AUTH_REQUIRED");
    }

    const body = await request.json();
    const parsed = wishlistSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const product = await prisma.product.findUnique({
      where: { id: parsed.data.productId },
    });

    if (!product) {
      return jsonError("Product not found", 404);
    }

    await prisma.wishlistItem.upsert({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: parsed.data.productId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        productId: parsed.data.productId,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  },
  { requireAuth: true },
);
