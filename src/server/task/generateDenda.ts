// server/task/generateDenda.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function generateLateFees() {
  const supabase = await createServerSupabaseClient();

  // Ambil peminjaman yang sudah lewat batas_kembali dan belum ada denda
  const { data: loans, error } = await supabase
    .from("peminjaman")
    .select("id, user_id, book_id, tanggal_pinjam, batas_kembali")
    .lt("batas_kembali", new Date().toISOString())
    .not("id", "in", supabase.from("denda").select("peminjaman_id"));

  if (error) throw error;

  for (const loan of loans) {
    const today = new Date();
    const dueDate = new Date(loan.batas_kembali);
    const daysLate = Math.max(0, Math.ceil((today.getTime() - dueDate.getTime()) / (1000*60*60*24)));

    if (daysLate <= 0) continue;

    // Kalkulasi jumlah denda kumulatif seperti bunga
    const base = 5000; // misal 5 ribu per hari
    let total = 0;
    for (let i = 1; i <= daysLate; i++) {
      total += i * base;
    }

    await supabase.from("denda").insert({
      peminjaman_id: loan.id,
      user_id: loan.user_id,
      hari_terlambat: daysLate,
      jumlah: total,
      status: "belum bayar",
    });
  }
}
