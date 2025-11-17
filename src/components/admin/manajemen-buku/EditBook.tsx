import BookForm from "./BookForm";

export default function EditBookPage() {
  const defaultValues = {
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    publisher: "Bentang",
    year: "2006",
    category: "Novel",
    stock: "12",
    synopsis: "Kisah tentang perjuangan 10 anak miskin di Belitung...",
  };

  return (
    <div>
      <BookForm defaultValues={defaultValues} onSubmit={(data) => console.log("Edit Buku:", data)} />
    </div>
  );
}
