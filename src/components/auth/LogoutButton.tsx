"use client";

import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(); // ← Server action handle redirect otomatis
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