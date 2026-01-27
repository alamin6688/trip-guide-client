"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const LoginSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const isLoggedIn = searchParams.get("loggedIn") === "true";

    if (isLoggedIn && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("You have been logged in successfully!");

      // Refresh auth state to update navbar
      refreshAuth();

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("loggedIn");
      router.replace(newUrl.toString());
    }

    // Reset flag when loggedIn param is removed
    if (!isLoggedIn) {
      hasShownToast.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  return null;
};

export default LoginSuccessToast;
