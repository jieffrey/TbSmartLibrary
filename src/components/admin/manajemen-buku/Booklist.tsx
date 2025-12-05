// "use client";

// import Book
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";

// type BookListProps = {
//   books: Book[];
// };

// export default function BookList({ books }: BookListProps) {
//   if (books.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500 text-lg">Belum ada buku</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {books.map((book) => (
//         <Card 
//           key={book.id} 
//           className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
//         >
//           {/* GAMBAR BUKU */}
//           <div className="relative h-48 w-full bg-gray-100">
//             {book.image_url ? (
//               <Image
//                 src={book.image_url}
//                 alt={book.judul}
//                 fill
//                 className="object-cover rounded-t-lg"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-400">
//                 <span>No Image</span>
//               </div>
//             )}
//           </div>

//           <CardHeader className="pb-3">
//             <CardTitle className="line-clamp-2 text-lg">
//               {book.judul}
//             </CardTitle>
//             <p className="text-sm text-gray-600">
//               {book.penulis || "Penulis tidak diketahui"}
//             </p>
//           </CardHeader>

//           <CardContent>
//             <div className="space-y-2">
//               {/* KATEGORI */}
//               {book.kategori && (
//                 <Badge variant="secondary" className="text-xs">
//                   {book.kategori}
//                 </Badge>
//               )}

//               {/* INFO BUKU */}
//               <div className="text-sm text-gray-600 space-y-1">
//                 {book.penerbit && (
//                   <p className="truncate">
//                     <span className="font-medium">Penerbit:</span> {book.penerbit}
//                   </p>
//                 )}
//                 {book.tahun_terbit && (
//                   <p>
//                     <span className="font-medium">Tahun:</span> {book.tahun_terbit}
//                   </p>
//                 )}
                
//                 {/* STOK */}
//                 <p className="font-semibold pt-2">
//                   Stok: 
//                   <span className={
//                     book.stok > 5 
//                       ? "text-green-600" 
//                       : book.stok > 0 
//                       ? "text-yellow-600" 
//                       : "text-red-600"
//                   }>
//                     {" "}{book.stok}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }