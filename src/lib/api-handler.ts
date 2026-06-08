import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { checkRateLimit, getClientIp, type RateLimitTier } from "@/lib/rate-limit";
import type { Role } from "@/generated/prisma/client";

type ApiHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> },
) => Promise<NextResponse>;

interface SecureApiOptions {
  rateLimitTier?: RateLimitTier;
  requireAuth?: boolean;
  requireRole?: Role;
}

export function secureApi(
  handler: ApiHandler,
  options: SecureApiOptions = {},
): ApiHandler {
  const {
    rateLimitTier = "general",
    requireAuth = false,
    requireRole,
  } = options;

  return async (request, context) => {
    const ip = getClientIp(request);
    const url = new URL(request.url);
    const rateLimit = await checkRateLimit(ip, rateLimitTier, url.pathname);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter ?? 60),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    if (requireAuth || requireRole) {
      const session = await auth();
      if (!session?.user) {
        return NextResponse.json(
          { error: "Authentication required", code: "AUTH_REQUIRED" },
          { status: 401 },
        );
      }

      if (requireRole && session.user.role !== requireRole) {
        return NextResponse.json(
          { error: "Insufficient permissions", code: "FORBIDDEN" },
          { status: 403 },
        );
      }
    }

    const response = await handler(request, context);
    response.headers.set(
      "X-RateLimit-Remaining",
      String(rateLimit.remaining),
    );
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return response;
  };
}

export function jsonError(message: string, status = 400, code?: string) {
  return NextResponse.json({ error: message, code }, { status });
}
