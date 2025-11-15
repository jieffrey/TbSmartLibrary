// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import Link from "next/link";

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   available: number;
//   total: number;
// }

// export default function BooksPage() {
//   const [books, setBooks] = useState<Book[]>([
//     { id: 1, title: "Atomic Habits", author: "James Clear", available: 3, total: 5 },
//     { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", available: 0, total: 2 },
//     { id: 3, title: "Deep Work", author: "Cal Newport", available: 2, total: 4 },
//   ]);

//   const handleDelete = (id: number) => {
//     setBooks(books.filter((book) => book.id !== id));
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">Books List</h1>
//         <Link href="/books/new">
//           <Button className="flex items-center gap-2">
//             <Plus size={18} /> Add Book
//           </Button>
//         </Link>
//       </div>

//       <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4">Title</th>
//               <th className="p-4">Author</th>
//               <th className="p-4">Available</th>
//               <th className="p-4">Status</th>
//               <th className="p-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.id} className="border-t hover:bg-gray-50">
//                 <td className="p-4">{book.title}</td>
//                 <td className="p-4">{book.author}</td>
//                 <td className="p-4">{book.available} / {book.total}</td>
//                 <td className="p-4">
//                   {book.available > 0 ? (
//                     <span className="text-green-600 font-medium">Available</span>
//                   ) : (
//                     <span className="text-red-600 font-medium">Unavailable</span>
//                   )}
//                 </td>
//                 <td className="p-4 text-right flex justify-end gap-2">
//                   <Link href={`/books/edit?id=${book.id}`}>
//                     <Button variant="outline" size="sm">
//                       <Pencil size={16} />
//                     </Button>
//                   </Link>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDelete(book.id)}
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
