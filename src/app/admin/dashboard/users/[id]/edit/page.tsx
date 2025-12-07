// app/admin/dashboard/users/[id]/edit/page.tsx
import UserForm from "@/components/admin/manajemen-user/UsersForm";
import { getUserById } from "@/app/api/users/route";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditUserPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditUserPage(props: EditUserPageProps) {
  const params = await props.params;
  const result = await getUserById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* BREADCRUMB */}
      <Link
        href="/admin/dashboard/users"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
          hover:text-[#FFC428] transition-colors mb-6 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Daftar User
      </Link>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          ✏️ Edit User
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Perbarui informasi user: <span className="font-semibold">{result.data.nama || result.data.email}</span>
        </p>
      </div>

      {/* FORM */}
      <UserForm user={result.data} />
    </div>
  );
}