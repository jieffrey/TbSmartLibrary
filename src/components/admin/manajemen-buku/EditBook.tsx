"use client";

import { useEffect, useState } from "react";
import { getBookById, updateBook } from "@/app/api/books/route"
import BookForm from "./BookForm";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
export default function EditBookPage({ params }: { params: { id: string } }) {
const router = useRouter();
const { toast } = useToast();
const [book, setBook] = useState<any>(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
const fetchBook = async () => {
const result = await getBookById(parseInt(params.id));
if (result.success) {
setBook(result.data);
} else {
toast({
title: "Error",
description: result.error,
variant: "destructive",
});
router.push("/admin/books");
}
setLoading(false);
};
fetchBook();
}, [params.id]);
const handleSubmit = async (data: any) => {
const result = await updateBook(parseInt(params.id), data);
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
  description: `Buku "${data.judul}" berhasil diupdate`,
});

router.push("/admin/books");
router.refresh();
};
if (loading) {
return (
<div className="flex items-center justify-center min-h-[400px]">
<Loader2 className="size-8 animate-spin text-[#FFC428]" />
</div>
);
}
return (
<div className="p-6 md:p-8 max-w-4xl mx-auto">
<Link
     href="/admin/books"
     className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
       hover:text-[#FFC428] dark:hover:text-[#FFC428] transition-colors mb-6"
   >
<ArrowLeft size={20} />
Kembali ke Daftar Buku
</Link>
  <BookForm 
    defaultValues={book} 
    onSubmit={handleSubmit} 
    isEdit 
  />
</div>
);
}