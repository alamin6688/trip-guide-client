"use client";

/**
 * Client-side auth check using a route handler
 * This avoids calling server actions from client components
 */
export async function checkAuthStatus(): Promise<boolean> {
    try {
        const response = await fetch("/api/auth/check", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.isAuthenticated || false;
    } catch (error) {
        console.error("Auth check failed:", error);
        return false;
    }
}
