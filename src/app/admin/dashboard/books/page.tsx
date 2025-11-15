// "use client";
// import { useState } from "react";
// import { Button } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Link from "next/link";

// const initialBooks = [
//   { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", stock: 4, available: true },
//   { id: 2, title: "Negeri 5 Menara", author: "Ahmad Fuadi", stock: 0, available: false },
//   { id: 3, title: "Bumi Manusia", author: "Pramoedya A. Toer", stock: 2, available: true },
// ];

// export default function BooksPage() {
//   const [rows, setRows] = useState(initialBooks);

//   const handleDelete = (id: number) => {
//     setRows(rows.filter((row) => row.id !== id));
//   };

//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 80 },
//     { field: "title", headerName: "Judul Buku", flex: 1 },
//     { field: "author", headerName: "Penulis", flex: 1 },
//     {
//       field: "stock",
//       headerName: "Stok",
//       width: 100,
//       renderCell: (params) => (
//         <span className={params.value === 0 ? "text-red-500" : "text-green-600"}>
//           {params.value}
//         </span>
//       ),
//     },
//     {
//       field: "available",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params) => (
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-semibold ${
//             params.value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
//           }`}
//         >
//           {params.value ? "Tersedia" : "Tidak Tersedia"}
//         </span>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Aksi",
//       width: 220,
//       renderCell: (params) => (
//         <div className="flex gap-2">
//           <Link href={`/books/edit/${params.row.id}`}>
//             <Button variant="outlined" size="small">
//               Edit
//             </Button>
//           </Link>
//           <Button
//             variant="contained"
//             color="error"
//             size="small"
//             onClick={() => handleDelete(params.row.id)}
//           >
//             Hapus
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section className="p-6">
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-semibold text-gray-800">Daftar Buku</h1>
//         <Link href="/books/add">
//           <Button variant="contained" color="primary">
//             + Tambah Buku
//           </Button>
//         </Link>
//       </div>
//       <div className="bg-white shadow-md rounded-xl p-4">
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           autoHeight
//           pageSizeOptions={[5, 10]}
//           initialState={{
//             pagination: { paginationModel: { pageSize: 5, page: 0 } },
//           }}
//         />
//       </div>
//     </section>
//   );
// }
