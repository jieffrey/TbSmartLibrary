"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true);
    try {
      localStorage.clear()
      sessionStorage.clear()
      setTimeout(() => {
        router.push("/full-width-pages/auth/signin")
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="destructive"
      className="flex items-center gap-2"
    >
      <LogOut size={18} />
      {loading ? "Logging out..." : "Keluar"}
    </Button>
  );
}