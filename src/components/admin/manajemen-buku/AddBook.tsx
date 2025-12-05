"use client";

import { createBook } from "@/app/api/books/route";
import BookForm from "./BookForm";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddBookPage() {76
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    const result = await createBook(data);

    if (!result.success) {
      toast({
        title: "Gagal",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Berhasil!",
      description: `Buku "${data.judul}" berhasil ditambahkan`,
    });

    router.push("/admin/books");
    router.refresh();
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* BACK BUTTON */}
      <Link
        href="/admin/books"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
          hover:text-[#FFC428] dark:hover:text-[#FFC428] transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Kembali ke Daftar Buku
      </Link>

      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}