"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const LogoutSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const isLoggedOut = searchParams.get("loggedOut") === "true";

    if (isLoggedOut && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("You have been logged out successfully!");

      // Refresh auth state to update navbar
      refreshAuth();

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("loggedOut");
      router.replace(newUrl.toString());
    }

    // Reset flag when loggedOut param is removed
    if (!isLoggedOut) {
      hasShownToast.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  return null;
};

export default LogoutSuccessToast;
