'use client'
import { Bell, User } from "lucide-react";

export function Header() {
return (
<header className="flex items-center justify-between mb-6">
<h1 className="text-2xl font-bold text-[#294B29] dark:text-[#D2E3C8]">
TB Smart Library
</h1>
<div className="flex items-center gap-4">
<Bell className="w-6 h-6 text-[#294B29] dark:text-white" />
<User className="w-7 h-7 text-[#294B29] dark:text-white cursor-pointer" />
</div>
</header>
);
}
