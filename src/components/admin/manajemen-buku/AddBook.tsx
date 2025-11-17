import BookForm from "./BookForm";

export default function AddBookPage() {
  return (
    <div>
      <BookForm onSubmit={(data) => console.log("Tambah Buku:", data)} />
    </div>
  );
}
