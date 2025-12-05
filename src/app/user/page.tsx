"use client";

import { useState } from "react";
import { Search, Bell, User, QrCode } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryList } from "@/components/user/home/kategori";
import { QRPickupCard } from "@/components/user/home/qris";
import { PopularBooks } from "@/components/user/home/popularbook";
import BookCatalog from '@/components/user/home/katalog';
import { SearchBar } from "@/components/user/home/searchbar";
// import { GreetingCard } from "@/components/user/home/greetingcar";
// import { Header } from "@/components/user/home/header";

export default function UserHome() {
const [searchQuery, setSearchQuery] = useState("");


return (
<div className="min-h-screen px-4 py-6 md:px-8 dark:bg-gray-900">
{/* <Header /> */}
<SearchBar onSearch={setSearchQuery} />
{/* <GreetingCard /> */}
{/* <QRPickupCard show={true} /> */}
<CategoryList />
<PopularBooks />
<BookCatalog searchQuery={searchQuery} />
</div>
);
}