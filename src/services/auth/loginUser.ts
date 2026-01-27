/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { setCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  let redirectPath: string | null = null;

  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (zodValidator(payload, loginValidationZodSchema).success === false) {
      return zodValidator(payload, loginValidationZodSchema);
    }

    const validatedPayload = zodValidator(
      payload,
      loginValidationZodSchema
    ).data;

    // Validate Environment Variables
    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error("❌ CRITICAL: access_token_secret is not defined in environment variables");
      throw new Error("Server configuration error: Token secret missing");
    }

    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // Try to parse error message from backend
      try {
        const errorResult = await res.json();
        console.error("Login failed from backend:", errorResult);
        throw new Error(errorResult.message || `Backend error: ${res.status}`);
      } catch (jsonError) {
        console.error("Login failed with non-JSON response:", res.status, res.statusText);
        throw new Error(`Login failed: ${res.status} ${res.statusText}`);
      }
    }

    const result = await res.json();

    // Safe handling of Set-Cookie headers for various Node environments
    let setCookieHeaders: string[] = [];
    if (typeof res.headers.getSetCookie === 'function') {
      setCookieHeaders = res.headers.getSetCookie();
    } else {
      // Fallback for environments where getSetCookie might be missing or different
      const headerVal = res.headers.get('Set-Cookie');
      if (headerVal) {
        // This is a naive split for simple cases, but getSetCookie is preferred
        setCookieHeaders = [headerVal];
      }
    }

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      console.error("❌ Login response missing Set-Cookie headers");
      throw new Error("No Set-Cookie header found in backend response");
    }

    if (!accessTokenObject) {
      console.error("❌ Access token missing in cookies");
      throw new Error("Access tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      console.error("❌ Refresh token missing in cookies");
      throw new Error("Refresh tokens not found in cookies");
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token format");
    }

    const userRole: UserRole = verifiedToken.role;

    if (!result.success) {
      throw new Error(result.message || "Login success=false in response");
    }

    if (redirectTo && result.data.needPasswordChange) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirectPath = `/reset-password?redirect=${requestedPath}`;
      } else {
        redirectPath = "/reset-password";
      }
    } else if (result.data.needPasswordChange) {
      redirectPath = "/reset-password";
    } else if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirectPath = `${requestedPath}?loggedIn=true`;
      } else {
        redirectPath = `${getDefaultDashboardRoute(userRole)}?loggedIn=true`;
      }
    } else {
      redirectPath = `${getDefaultDashboardRoute(userRole)}?loggedIn=true`;
    }
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    // Check if it's a redirect error (important for Next.js)
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    return {
      success: false,
      message: `${process.env.NODE_ENV === "development"
          ? error.message
          : "Login Failed. You might have entered incorrect email or password, or there is a system issue."
        }`,
    };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }
};
