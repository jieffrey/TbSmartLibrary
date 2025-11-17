"use client";

export default function BookMeta({ category, pages, year }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="p-4 bg-muted dark:bg-zinc-800 rounded-lg">
        <p className="text-muted-foreground">Kategori</p>
        <p className="font-semibold dark:text-white">{category}</p>
      </div>

      <div className="p-4 bg-muted dark:bg-zinc-800 rounded-lg">
        <p className="text-muted-foreground">Halaman</p>
        <p className="font-semibold dark:text-white">{pages}</p>
      </div>

      <div className="p-4 bg-muted dark:bg-zinc-800 rounded-lg">
        <p className="text-muted-foreground">Tahun Terbit</p>
        <p className="font-semibold dark:text-white">{year}</p>
      </div>
    </div>
  );
}
