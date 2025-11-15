// "use client";

// import { useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// export default function UsersPage() {
//   // ===== Dummy Data =====
//   const [rows, setRows] = useState([
//     { id: 1, name: "Andi Saputra", email: "andi@mail.com", role: "User" },
//     { id: 2, name: "Budi Santoso", email: "budi@mail.com", role: "Admin" },
//     { id: 3, name: "Citra Dewi", email: "citra@mail.com", role: "User" },
//     { id: 4, name: "Dewi Kusuma", email: "dewi@mail.com", role: "User" },
//   ]);

//   // ===== Delete Handler =====
//   const handleDelete = (id: number) => {
//     setRows((prev) => prev.filter((row) => row.id !== id));
//   };

//   // ===== DataGrid Columns =====
//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "Nama", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "role", headerName: "Role", width: 120 },
//     {
//       field: "actions",
//       headerName: "Aksi",
//       width: 150,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton color="primary" onClick={() => alert("Edit user: " + params.row.name)}>
//             <Edit />
//           </IconButton>

//           <IconButton
//             color="error"
//             onClick={() => handleDelete(params.row.id)}
//           >
//             <Delete />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         Manajemen Pengguna 👥
//       </Typography>

//       <Card>
//         <CardContent>
//           <Typography variant="h6" fontWeight="bold" mb={2}>
//             Daftar Pengguna
//           </Typography>

//           <Box sx={{ height: 450 }}>
//             <DataGrid
//               rows={rows}
//               columns={columns}
//               pageSizeOptions={[5, 10]}
//               initialState={{
//                 pagination: { paginationModel: { pageSize: 5 } },
//               }}
//               sx={{
//                 borderRadius: 2,
//                 background: "#fff",
//               }}
//             />
//           </Box>

//           <Button
//             variant="contained"
//             sx={{ mt: 3 }}
//             onClick={() => alert("Tambah user baru")}
//           >
//             Tambah User
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
