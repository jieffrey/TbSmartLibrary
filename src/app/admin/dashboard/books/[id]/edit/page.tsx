import BookForm from "@/components/admin/manajemen-buku/BookForm";
import { da } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditBookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBookPage(props: EditBookPageProps) {
  const params = await props.params;

  // Base URL untuk server-side fetch
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/books/${params.id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  console.log("===========", data)

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* BREADCRUMB */}
      <Link
        href="/admin/dashboard/books"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
          hover:text-[#FFC428] transition-colors mb-6 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Daftar Buku
      </Link>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          ✏️ Edit Buku
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Perbarui informasi buku:{" "}
          <span className="font-semibold">{data.judul}</span>
        </p>
      </div>

      {/* FORM */}
      <BookForm mode="edit" book={data} />
    </div>
  );
}
