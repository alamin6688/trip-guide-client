import { getCookie } from "@/services/auth/tokenHandlers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const accessToken = await getCookie("accessToken");

        return NextResponse.json({
            isAuthenticated: !!accessToken,
        });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({
            isAuthenticated: false,
        });
    }
}
