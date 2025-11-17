"use client";
import { Button } from "@/components/ui/button";

export default function ProfileActions() {
  return (
    <div className="flex gap-3 mt-6">
      <Button>Edit Profile</Button>
      <Button variant="secondary">Ganti Password</Button>
      <Button variant="destructive">Logout</Button>
    </div>
  );
}
