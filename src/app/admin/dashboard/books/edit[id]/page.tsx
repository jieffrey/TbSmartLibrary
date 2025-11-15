// "use client";
// import { useState, useEffect } from "react";
// import { Button, TextField, Switch, FormControlLabel } from "@mui/material";
// import { useRouter, useParams } from "next/navigation";

// export default function EditBookPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     stock: 1,
//     available: true,
//   });

//   useEffect(() => {
//     // Dummy fetch example
//     setBook({
//       title: "Laskar Pelangi",
//       author: "Andrea Hirata",
//       stock: 3,
//       available: true,
//     });
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setBook({ ...book, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Buku "${book.title}" berhasil diperbarui!`);
//     router.push("/books");
//   };

//   return (
//     <section className="p-6">
//       <h1 className="text-2xl font-semibold mb-5">Edit Buku</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-lg"
//       >
//         <TextField
//           label="Judul Buku"
//           name="title"
//           fullWidth
//           required
//           value={book.title}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Penulis"
//           name="author"
//           fullWidth
//           required
//           value={book.author}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Jumlah Stok"
//           name="stock"
//           type="number"
//           fullWidth
//           required
//           value={book.stock}
//           onChange={handleChange}
//         />
//         <FormControlLabel
//           control={
//             <Switch
//               checked={book.available}
//               onChange={handleChange}
//               name="available"
//             />
//           }
//           label="Tersedia"
//         />
//         <div className="flex justify-end gap-3 pt-3">
//           <Button variant="outlined" onClick={() => router.push("/books")}>
//             Batal
//           </Button>
//           <Button variant="contained" color="primary" type="submit">
//             Simpan Perubahan
//           </Button>
//         </div>
//       </form>
//     </section>
//   );
// }
