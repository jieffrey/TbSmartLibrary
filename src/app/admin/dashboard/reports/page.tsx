// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Grid,
//   Chip,
// } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

// export default function ReturnReports() {
//   // ===== Dummy Data =====
//   const dataDummy = [
//     {
//       id: 1,
//       borrower: "Andi Saputra",
//       book: "Belajar React.js",
//       borrowDate: "2025-01-05",
//       returnDate: "2025-01-12",
//       status: "Tepat Waktu",
//     },
//     {
//       id: 2,
//       borrower: "Budi Santoso",
//       book: "Dasar Pemrograman",
//       borrowDate: "2025-01-02",
//       returnDate: "2025-01-15",
//       status: "Terlambat",
//     },
//     {
//       id: 3,
//       borrower: "Citra Dewi",
//       book: "Psikologi Warna",
//       borrowDate: "2025-01-01",
//       returnDate: "2025-01-07",
//       status: "Tepat Waktu",
//     },
//     {
//       id: 4,
//       borrower: "Dewi Kusuma",
//       book: "Algoritma & Struktur Data",
//       borrowDate: "2024-12-28",
//       returnDate: "2025-01-10",
//       status: "Terlambat",
//     },
//   ];

//   // ===== Filters =====
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // ===== Filter Logic =====
//   const filteredData = dataDummy.filter((item) => {
//     const itemDate = new Date(item.returnDate);
//     const start = startDate ? new Date(startDate) : null;
//     const end = endDate ? new Date(endDate) : null;

//     return (
//       (!start || itemDate >= start) &&
//       (!end || itemDate <= end) &&
//       (statusFilter === "all" || item.status === statusFilter)
//     );
//   });

//   // ===== Columns =====
//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 60 },
//     { field: "borrower", headerName: "Nama Peminjam", flex: 1 },
//     { field: "book", headerName: "Judul Buku", flex: 1 },
//     { field: "borrowDate", headerName: "Tanggal Pinjam", width: 140 },
//     { field: "returnDate", headerName: "Tanggal Kembali", width: 140 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color={params.value === "Terlambat" ? "error" : "success"}
//         />
//       ),
//     },
//   ];

//   // ===== PDF Export Placeholder =====
//   const exportPDF = () => {
//     alert("📄 Export PDF masih dummy. Mau gue buatin versi PDF asli?");
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         Laporan Pengembalian Buku 📄
//       </Typography>

//       {/* ===== Filter Section ===== */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" fontWeight="bold" mb={2}>
//             Filter Laporan
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Tanggal Awal"
//                 InputLabelProps={{ shrink: true }}
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Tanggal Akhir"
//                 InputLabelProps={{ shrink: true }}
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Status"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <MenuItem value="all">Semua</MenuItem>
//                 <MenuItem value="Tepat Waktu">Tepat Waktu</MenuItem>
//                 <MenuItem value="Terlambat">Terlambat</MenuItem>
//               </TextField>
//             </Grid>
//           </Grid>

//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<PictureAsPdfIcon />}
//             sx={{ mt: 3 }}
//             onClick={exportPDF}
//           >
//             Export PDF
//           </Button>
//         </CardContent>
//       </Card>

//       {/* ===== Data Table ===== */}
//       <Card>
//         <CardContent>
//           <Typography variant="h6" fontWeight="bold" mb={2}>
//             Hasil Laporan
//           </Typography>

//           <Box sx={{ height: 450 }}>
//             <DataGrid
//               rows={filteredData}
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
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
