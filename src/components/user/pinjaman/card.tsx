"use client";

import { useEffect, useState } from "react";

export default function UserLoans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("/api/books/aktif")
      .then((res) => res.json())
      .then((data) => setLoans(data));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Peminjaman Aktif</h2>

      {loans.map((l) => (
        <div key={l.id} className="p-4 border mt-3">
          <p>Buku: {l.judul}</p>
          <p>Status: {l.status}</p>
          <p>Batas: {l.batas_kembali}</p>
        </div>
      ))}
    </div>
  );
}
