/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const response = await serverFetch.get("/auth/me", {
      next: {
        tags: ["user-info"],
        revalidate: 180,
      },
    });

    const result = await response.json();

    if (result.success) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as JwtPayload;

      userInfo = {
        name: verifiedToken.name || "Unknown User",
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }

    userInfo = {
      id:
        result.data.tourist?.id ||
        result.data.guide?.id ||
        result.data.admin?.id ||
        "",
      name:
        result.data.tourist?.name ||
        result.data.guide?.name ||
        result.data.admin?.name ||
        "Unknown User",
      email:
        result.data.tourist?.email ||
        result.data.guide?.email ||
        result.data.admin?.email ||
        "",
      role: result.data.admin
        ? "ADMIN"
        : result.data.guide
          ? "GUIDE"
          : "TOURIST",
      touristId: result.data.tourist?.id || null, // <-- this is key
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "TOURIST",
    };
  }
};
