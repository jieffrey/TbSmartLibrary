import BookCover from "@/components/user/detail/bookcover";
import BookInfo from "@/components/user/detail/bookinfo";
import BookActions from "@/components/user/detail/bookaction";
import BookMeta from "@/components/user/detail/bookmeta";

export default async function BookDetailPage({ params }: any) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    cache: "no-store",
  });

  const book = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-12">
        <BookCover src={book.image_url} />

        <div className="flex-1 space-y-6">
          <BookInfo
            title={book.judul}
            author={book.penulis}
            rating={book.rating || "4.8"}
          />

          <BookActions bookId={id} />

          <BookMeta
            category={book.kategori}
            pages={book.halaman || 300}
            year={book.tahun_terbit}
          />
        </div>
      </div>
    </div>
  );
}
