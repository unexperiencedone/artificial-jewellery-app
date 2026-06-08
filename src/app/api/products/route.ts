import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { secureApi } from "@/lib/api-handler";

export const GET = secureApi(async (request) => {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");
  const bestseller = searchParams.get("bestseller");

  const products = await prisma.product.findMany({
    where: {
      ...(collection ? { collection } : {}),
      ...(bestseller === "true" ? { bestseller: true } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      imageUrl: true,
      collection: true,
      bestseller: true,
    },
  });

  return NextResponse.json({ products });
});
