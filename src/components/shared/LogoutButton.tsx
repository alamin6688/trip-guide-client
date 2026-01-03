"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  const handleLogout = async () => {
    await logoutUser(); // clears cookie
    onLogout(); // 🔥 updates navbar instantly
  };

  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
