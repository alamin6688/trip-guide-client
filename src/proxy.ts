import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
import { getUserInfo } from "./services/auth/getUserInfo";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";
import { getNewAccessToken } from "./services/auth/auth.service";

const REFRESH_PARAM = "refreshToken";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  /* ------------------------------------------------
   * 0️⃣ Skip ALL refresh logic on auth routes
   * ------------------------------------------------ */
  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  /* ------------------------------------------------
   * 1️⃣ Handle refresh redirect cleanup
   * ------------------------------------------------ */
  if (request.nextUrl.searchParams.has(REFRESH_PARAM)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete(REFRESH_PARAM);
    return NextResponse.redirect(url);
  }
  /* ------------------------------------------------
   * 2️⃣ Try refreshing token (silent)
   * ------------------------------------------------ */
  const tokenRefreshResult = await getNewAccessToken();
  if (tokenRefreshResult?.tokenRefreshed) {
    const url = request.nextUrl.clone();
    url.searchParams.set(REFRESH_PARAM, "true");
    const response = NextResponse.redirect(url);

    if (tokenRefreshResult.accessToken && tokenRefreshResult.accessTokenOptions) {
      response.cookies.set(
        "accessToken",
        tokenRefreshResult.accessToken,
        tokenRefreshResult.accessTokenOptions
      );
    }

    if (
      tokenRefreshResult.refreshToken &&
      tokenRefreshResult.refreshTokenOptions
    ) {
      response.cookies.set(
        "refreshToken",
        tokenRefreshResult.refreshToken,
        tokenRefreshResult.refreshTokenOptions
      );
    }
    return response;
  }

  /* ------------------------------------------------
   * 3️⃣ Read & verify access token
   * ------------------------------------------------ */
  const accessToken = (await getCookie("accessToken")) || null;
  let userRole: UserRole | null = null;

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as JwtPayload;

      userRole = decoded.role as UserRole;
    } catch {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const routerOwner = getRouteOwner(pathname);

  /* ------------------------------------------------
   * 4️⃣ Public routes
   * ------------------------------------------------ */
  if (routerOwner === null) {
    return NextResponse.next();
  }

  /* ------------------------------------------------
   * 5️⃣ Not logged in → redirect to login
   * ------------------------------------------------ */
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /* ------------------------------------------------
   * 6️⃣ Force password reset
   * ------------------------------------------------ */
  const userInfo = await getUserInfo();

  if (userInfo.needPasswordChange) {
    if (pathname !== "/reset-password") {
      const resetUrl = new URL("/reset-password", request.url);
      resetUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(resetUrl);
    }
    return NextResponse.next();
  }

  if (!userInfo.needPasswordChange && pathname === "/reset-password") {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole!), request.url),
    );
  }
  /* ------------------------------------------------
   * 7️⃣ Common protected routes
   * ------------------------------------------------ */
  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  /* ------------------------------------------------
   * 8️⃣ Role-based protected routes
   * ------------------------------------------------ */
  if (routerOwner !== userRole) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole!), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
