'use client'
import { Search } from "lucide-react";

export function SearchBar({ onSearch }) {
return (
<div className="relative mb-6">
<Search className="absolute left-3 top-3 text-gray-400" />
<input
type="text"
placeholder="Cari buku..."
className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-white/[0.03] dark:text-white"
onChange={(e) => onSearch(e.target.value)}
/>
</div>
);
}