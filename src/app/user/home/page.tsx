// "use client";

// import { useState, useEffect } from "react";
// import { SearchBar } from "@/components/user/home/searchbar"; 
// import { CategoryList } from "@/components/user/home/kategori";
// import BookCard from "@/components/user/home/card";

// export default function UserHome() {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("Semua");

//   useEffect(() => {
//     fetch("/api/books") // API lu sendiri
//       .then((res) => res.json())
//       .then((data) => setBooks(data));
//   }, []);

//   // FILTER: search by judul aja sesuai permintaan lu
//   const filtered = books.filter((b: any) => {
//     const judulMatch = b.judul?.toLowerCase().includes(search.toLowerCase());
//     const categoryMatch = category === "Semua" || b.kategori === category;
//     return judulMatch && categoryMatch;
//   });

//   return (
//     <div className="p-4">
//       <SearchBar onSearch={(v) => setSearch(v)} />
//       <CategoryList onSelectCategory={(cat) => setCategory(cat)} />

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {filtered.map((book: any) => (
//           <BookCard key={book.id} {...book} />
//         ))}
//       </div>
//     </div>
//   );
// }
