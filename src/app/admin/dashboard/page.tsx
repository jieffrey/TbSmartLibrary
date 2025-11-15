    // "use client";

    // import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
    // import { Book, People, Warning, LibraryBooks } from "@mui/icons-material";
    // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

    // export default function Users() {

    // const data = [
    // { name: "Jan", peminjaman: 40, pengembalian: 24 },
    // { name: "Feb", peminjaman: 30, pengembalian: 20 },
    // { name: "Mar", peminjaman: 20, pengembalian: 27 },
    // { name: "Apr", peminjaman: 27, pengembalian: 18 },
    // ];


    // return (
    //     <Box sx={{ p: 4, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
    //     {/* ===== Judul ===== */}
    //     <Typography variant="h4" fontWeight="bold" mb={4}>
    //         Dashboard Admin 📚
    //     </Typography>

    //     {/* ===== Statistik Cards ===== */}
    //     <Grid container spacing={3}>
    //         {/* Total Buku */}
    //         <Grid item xs={12} sm={6} md={3}>
    //         <Card sx={{ background: "#3b82f6", color: "#fff" }}>
    //             <CardContent>
    //             <Box display="flex" alignItems="center" gap={2}>
    //                 <Book fontSize="large" />
    //                 <Box>
    //                 <Typography variant="h6">Total Buku</Typography>
    //                 <Typography variant="h5" fontWeight="bold">
    //                     1,245
    //                 </Typography>
    //                 </Box>
    //             </Box>
    //             </CardContent>
    //         </Card>
    //         </Grid>

    //         {/* Buku Dipinjam */}
    //         <Grid item xs={12} sm={6} md={3}>
    //         <Card sx={{ background: "#10b981", color: "#fff" }}>
    //             <CardContent>
    //             <Box display="flex" alignItems="center" gap={2}>
    //                 <LibraryBooks fontSize="large" />
    //                 <Box>
    //                 <Typography variant="h6">Sedang Dipinjam</Typography>
    //                 <Typography variant="h5" fontWeight="bold">
    //                     328
    //                 </Typography>
    //                 </Box>
    //             </Box>
    //             </CardContent>
    //         </Card>
    //         </Grid>

    //         {/* Total Pengguna */}
    //         <Grid item xs={12} sm={6} md={3}>
    //         <Card sx={{ background: "#6366f1", color: "#fff" }}>
    //             <CardContent>
    //             <Box display="flex" alignItems="center" gap={2}>
    //                 <People fontSize="large" />
    //                 <Box>
    //                 <Typography variant="h6">Total Pengguna</Typography>
    //                 <Typography variant="h5" fontWeight="bold">
    //                     580
    //                 </Typography>
    //                 </Box>
    //             </Box>
    //             </CardContent>
    //         </Card>
    //         </Grid>

    //         {/* Buku Terlambat */}
    //         <Grid item xs={12} sm={6} md={3}>
    //         <Card sx={{ background: "#ef4444", color: "#fff" }}>
    //             <CardContent>
    //             <Box display="flex" alignItems="center" gap={2}>
    //                 <Warning fontSize="large" />
    //                 <Box>
    //                 <Typography variant="h6">Terlambat</Typography>
    //                 <Typography variant="h5" fontWeight="bold">
    //                     14
    //                 </Typography>
    //                 </Box>
    //             </Box>
    //             </CardContent>
    //         </Card>
    //         </Grid>
    //     </Grid>

    //     {/* ===== Grafik ===== */}
    //     <Card sx={{ mt: 5, p: 3 }}>
    //         <Typography variant="h6" mb={3} fontWeight="bold">
    //         Statistik Peminjaman Buku
    //         </Typography>
    //         <ResponsiveContainer width="100%" height={300}>
    //         <BarChart data={data}>
    //             <XAxis dataKey="name" />
    //             <YAxis />
    //             <Tooltip />
    //             <Bar dataKey="peminjaman" fill="#3b82f6" radius={[6, 6, 0, 0]} />
    //             <Bar dataKey="pengembalian" fill="#10b981" radius={[6, 6, 0, 0]} />
    //         </BarChart>
    //         </ResponsiveContainer>
    //     </Card>
    //     </Box>
    // );
    // }
