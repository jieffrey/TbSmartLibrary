"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/user/home/searchbar"; 
import { CategoryList } from "@/components/user/home/kategori";
import BookCard from "@/components/user/landingpage/catalog/BookCard";

export default function UserHome() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("HASIL API:", data);

        if (Array.isArray(data)) {
          setBooks(data);
        } else if (Array.isArray(data?.data)) {
          setBooks(data.data);
        } else {
          setBooks([]);
        }
      });
  }, []);

  const filtered = Array.isArray(books)
    ? books.filter((b) => {
        const judulMatch = b.judul?.toLowerCase().includes(search.toLowerCase());
        const categoryMatch = category === "Semua" || b.kategori === category;
        return judulMatch && categoryMatch;
      })
    : [];

  return (
    <div className="p-4">
      <SearchBar onSearch={(v) => setSearch(v)} />
      <CategoryList onSelectCategory={(cat) => setCategory(cat)} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}
