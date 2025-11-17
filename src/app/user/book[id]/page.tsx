import BookCover from "@/components/user/detail/bookcover";
import BookInfo from "@/components/user/detail/bookinfo";
import BookActions from "@/components/user/detail/bookaction";
import BookMeta from "@/components/user/detail/bookmeta";
import BookReviews from "@/components/user/detail/bookreview";

export default function BookDetailPage() {
  // contoh sementara → nanti ganti dari API
  const book = {
    title: "Atomic Habits",
    author: "James Clear",
    rating: "4.9",
    cover: "/books/atomic.jpg",
    category: "Pengembangan Diri",
    pages: 360,
    year: 2018,
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">

      <div className="flex flex-col md:flex-row gap-10">
        <BookCover src={book.cover} />

        <div className="flex-1">
          <BookInfo title={book.title} author={book.author} rating={book.rating} />

          <BookActions />

          <BookMeta category={book.category} pages={book.pages} year={book.year} />
        </div>
      </div>

      <BookReviews />
    </div>
  );
}
