"use client";

import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Info } from "@mui/icons-material";

export default function ReturnsPage() {
  // ===== Dummy Data Pengembalian =====
  const [rows, setRows] = useState([
    {
      id: 1,
      borrower: "Andi Saputra",
      book: "Belajar React.js",
      borrowDate: "2025-01-05",
      returnDate: "2025-01-12",
      status: "Tepat Waktu",
    },
    {
      id: 2,
      borrower: "Budi Santoso",
      book: "Dasar Pemrograman",
      borrowDate: "2025-01-02",
      returnDate: "2025-01-15",
      status: "Terlambat",
    },
    {
      id: 3,
      borrower: "Citra Dewi",
      book: "Psikologi Warna",
      borrowDate: "2025-01-01",
      returnDate: "2025-01-07",
      status: "Tepat Waktu",
    },
    {
      id: 4,
      borrower: "Dewi Kusuma",
      book: "Algoritma & Struktur Data",
      borrowDate: "2024-12-28",
      returnDate: "2025-01-10",
      status: "Terlambat",
    },
  ]);

  // ===== Handler Delete =====
  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  // ===== Columns DataGrid =====
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "borrower", headerName: "Nama Peminjam", flex: 1 },
    { field: "book", headerName: "Judul Buku", flex: 1 },
    { field: "borrowDate", headerName: "Tanggal Pinjam", width: 130 },
    { field: "returnDate", headerName: "Tanggal Kembali", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Terlambat" ? "error" : "success"}
          variant="filled"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() =>
              alert("Detail pengembalian untuk: " + params.row.borrower)
            }
          >
            <Info />
          </IconButton>

          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Data Pengembalian Buku 🔁
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Riwayat Pengembalian
          </Typography>

          <Box sx={{ height: 450 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              sx={{
                borderRadius: 2,
                background: "#fff",
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => alert("Export laporan pengembalian")}
          >
            Export Laporan
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
