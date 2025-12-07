"use client";

import HistoryList from "@/components/user/history/list";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function loadHistory() {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error("No session found");
        return;
      }

      const { data, error } = await supabase
        .from("peminjaman")
        .select(`
          *,
          books:book_id (
            id,
            judul,
            penulis,
            image_url
          )
        `)
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading history:", error);
      } else {
        console.log("History loaded:", data);
        setHistory(data || []);
      }
    }

    loadHistory();
  }, []);

  function openDetail(item: any) {
    alert("Detail transaksi: " + item.books.judul);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Riwayat Peminjaman
      </h1>

      {history.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg mt-20">
          Belum ada riwayat peminjaman.
        </div>
      ) : (
        <HistoryList items={history} onDetail={openDetail} />
      )}
    </div>
  );
}
