import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GUEST_MODE_COOKIE,
  MOBILE_WELCOME_SEEN_COOKIE,
} from "@/lib/constants";

const MOBILE_UA =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function isMobileDevice(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  return MOBILE_UA.test(ua);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/auth") ||
    pathname === "/welcome" ||
    pathname === "/shop" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isMobile = isMobileDevice(request);
  const guestMode = request.cookies.get(GUEST_MODE_COOKIE)?.value === "true";
  const welcomeSeen =
    request.cookies.get(MOBILE_WELCOME_SEEN_COOKIE)?.value === "true";

  if (isMobile && pathname === "/" && !guestMode && !welcomeSeen) {
    const url = request.nextUrl.clone();
    url.pathname = "/welcome";
    return NextResponse.redirect(url);
  }

  if (!isMobile && pathname === "/welcome") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
