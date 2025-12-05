"use client";

export default function BookMeta({ category, pages, year }: any) {
  const box =
    "p-4 rounded-xl bg-muted/70 dark:bg-zinc-800 border border-zinc-200/30 dark:border-zinc-700";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className={box}>
        <p className="text-xs text-muted-foreground">Kategori</p>
        <p className="font-semibold text-lg mt-1 dark:text-white">{category}</p>
      </div>

      <div className={box}>
        <p className="text-xs text-muted-foreground">Halaman</p>
        <p className="font-semibold text-lg mt-1 dark:text-white">{pages}</p>
      </div>

      <div className={box}>
        <p className="text-xs text-muted-foreground">Tahun Terbit</p>
        <p className="font-semibold text-lg mt-1 dark:text-white">{year}</p>
      </div>
    </div>
  );
}
