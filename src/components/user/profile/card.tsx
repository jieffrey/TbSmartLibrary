"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <Card className="border dark:border-gray-700">
      <CardContent className="p-6 flex items-center gap-6">
        <Image
          src="/profile-placeholder.png"
          width={90}
          height={90}
          alt="Profile"
          className="rounded-full border dark:border-gray-600"
        />

        <div>
          <h2 className="text-xl font-semibold">Kalsah Alkautsar</h2>
          <p className="text-gray-600 dark:text-gray-400">kalsah@example.com</p>
          <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
            Member sejak 2023
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
