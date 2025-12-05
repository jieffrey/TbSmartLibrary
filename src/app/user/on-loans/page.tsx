import BorrowedList from "@/components/user/pinjaman/list";

export default function BorrowedPage() {
  // Contoh data → nanti ganti dari Supabase
  // const borrowedBooks = [
  //   {
  //     title: "Atomic Habits",
  //     author: "James Clear",
  //     borrowedDate: "10 Nov 2025",
  //     dueDate: "17 Nov 2025"
  //   },
  //   {
  //     title: "The Psychology of Money",
  //     author: "Morgan Housel",
  //     borrowedDate: "01 Nov 2025",
  //     dueDate: "08 Nov 2025" // ini telat
  //   },
  // ];

  return (
    <div className="max-w-5xl mx-auto p-5 md:p-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Buku yang Sedang Dipinjam
      </h1>

      <BorrowedList/>
    </div>
  );
}
