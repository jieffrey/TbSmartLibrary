"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { deleteUser } from "@/app/api/users/route";
import { Trash2, Loader2 } from "lucide-react";

type DeleteUserButtonProps = {
  userId: string;
  userName: string;
};

export default function DeleteUserButton({ userId, userName }: DeleteUserButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus user "${userName}"?\n\nTindakan ini tidak bisa dibatalkan!`)) {
      return;
    }

    setDeleting(true);

    try {
      const result = await deleteUser(userId);

      if (!result.success) {
        toast({
          title: "Gagal",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: `User "${userName}" berhasil dihapus`,
      });

      router.push("/admin/dashboard/users");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan tidak terduga",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="px-4 py-2.5 rounded-xl border-2 border-red-500 text-red-600 dark:text-red-400 font-semibold
        hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 flex items-center gap-2"
    >
      {deleting ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Menghapus...
        </>
      ) : (
        <>
          <Trash2 size={18} />
          Hapus
        </>
      )}
    </button>
  );
}