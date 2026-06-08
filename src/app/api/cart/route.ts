import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cartItemSchema } from "@/lib/validation";
import { secureApi, jsonError } from "@/lib/api-handler";

export const GET = secureApi(
  async () => {
    const session = await auth();
    if (!session?.user?.id) {
      return jsonError("Authentication required", 401, "AUTH_REQUIRED");
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, price: true, imageUrl: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ items: cart?.items ?? [] });
  },
  { requireAuth: true },
);

export const POST = secureApi(
  async (request) => {
    const session = await auth();
    if (!session?.user?.id) {
      return jsonError("Authentication required", 401, "AUTH_REQUIRED");
    }

    const body = await request.json();
    const parsed = cartItemSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const product = await prisma.product.findUnique({
      where: { id: parsed.data.productId },
    });

    if (!product) {
      return jsonError("Product not found", 404);
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    }

    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: parsed.data.productId,
        },
      },
      update: { quantity: { increment: parsed.data.quantity } },
      create: {
        cartId: cart.id,
        productId: parsed.data.productId,
        quantity: parsed.data.quantity,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  },
  { requireAuth: true },
);

export const DELETE = secureApi(
  async (request) => {
    const session = await auth();
    if (!session?.user?.id) {
      return jsonError("Authentication required", 401, "AUTH_REQUIRED");
    }

    const itemId = new URL(request.url).searchParams.get("itemId");
    if (!itemId) {
      return jsonError("Item ID required");
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      return jsonError("Cart not found", 404);
    }

    await prisma.cartItem.deleteMany({
      where: { id: itemId, cartId: cart.id },
    });

    return NextResponse.json({ success: true });
  },
  { requireAuth: true },
);
