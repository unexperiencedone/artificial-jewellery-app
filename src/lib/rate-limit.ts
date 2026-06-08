import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
import { prisma } from "@/lib/prisma";

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "60000", 10);
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? "100", 10);
const authMaxRequests = parseInt(process.env.RATE_LIMIT_AUTH_MAX ?? "10", 10);

const generalLimiter = new RateLimiterMemory({
  points: maxRequests,
  duration: Math.ceil(windowMs / 1000),
});

const authLimiter = new RateLimiterMemory({
  points: authMaxRequests,
  duration: Math.ceil(windowMs / 1000),
});

const strictLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export type RateLimitTier = "general" | "auth" | "strict";

function getLimiter(tier: RateLimitTier) {
  switch (tier) {
    case "auth":
      return authLimiter;
    case "strict":
      return strictLimiter;
    default:
      return generalLimiter;
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfter?: number;
}

export async function checkRateLimit(
  key: string,
  tier: RateLimitTier = "general",
  endpoint = "unknown",
): Promise<RateLimitResult> {
  const limiter = getLimiter(tier);

  try {
    const result = await limiter.consume(key);
    return { success: true, remaining: result.remainingPoints };
  } catch (error) {
    const rateLimitError = error as RateLimiterRes;
    const retryAfter = Math.ceil(rateLimitError.msBeforeNext / 1000);

    await prisma.rateLimitLog
      .create({
        data: { ip: key, endpoint, blocked: true },
      })
      .catch(() => {});

    return { success: false, remaining: 0, retryAfter };
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
