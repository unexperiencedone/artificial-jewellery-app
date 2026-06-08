import { NextResponse } from "next/server";
import { secureApi } from "@/lib/api-handler";

export const GET = secureApi(async () => {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
