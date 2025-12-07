"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, QrCode, BookmarkCheck } from "lucide-react";
import BorrowModal from "./BorrowModal";
import QRModal from "./QRModal";
import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function BookActions(data: any) {
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [qrOpen, setQROpen] = useState(false);
  const [session, setSession] = useState(null);
  const [qrData, setQRData] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const [scanSuccess, setScanSuccess] = useState(false);

function handleScanSuccess() {
  setScanSuccess(true);
  setIsOpen(true);
}

  useEffect(() => {
    const supabase = createBrowserSupabase();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // Check if book is in wishlist
      if (session) {
        checkWishlistStatus(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (session) {
        checkWishlistStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [data.id]);

  async function checkWishlistStatus(userId: string) {
  try {
    const supabase = createBrowserSupabase();
    const { data: wishlist, error } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", userId)
      .eq("book_id", data.id)
      .maybeSingle(); // ← GANTI .single() jadi .maybeSingle()

    if (error) {
      console.error("Wishlist check error:", error);
      setIsInWishlist(false);
      return;
    }

    setIsInWishlist(!!wishlist);
  } catch (error) {
    console.error("Wishlist check error:", error);
    setIsInWishlist(false);
  }
}

  async function handleWishlistToggle() {
    if (!session) {
      alert("Anda harus login terlebih dahulu");
      return;
    }

    setIsWishlistLoading(true);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await fetch('/api/wishlist/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ book_id: data.id }),
        });

        const result = await response.json();

        if (response.ok) {
          setIsInWishlist(false);
          alert("Buku dihapus dari wishlist");
        } else {
          alert(`Error: ${result.error}`);
        }
      } else {
        // Add to wishlist
        const response = await fetch('/api/wishlist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ book_id: data.id }),
        });

        const result = await response.json();

        if (response.ok) {
          setIsInWishlist(true);
          alert("Buku ditambahkan ke wishlist");
        } else {
          alert(`Error: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      alert('Terjadi kesalahan');
    } finally {
      setIsWishlistLoading(false);
    }
  }

  async function handleBorrowConfirm(info) {
    try {
      const returnDate = new Date(info.returnDate);
      const formattedDate = returnDate.toISOString().split('T')[0];
      
      const requestData = {
        user_id: session?.user?.id,
        book_id: data.id,
        batas_kembali: formattedDate,
      };
      
      if (!requestData.user_id || !requestData.book_id || !requestData.batas_kembali) {
        alert('Data tidak lengkap');
        return;
      }

      const response = await fetch('/api/peminjaman/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        
        setQRData({
          title: info.book.judul,
          author: info.book.penulis,
          image: info.book.image_url,
          batas_kembali: formattedDate,
          borrowed_at: new Date(),
          borrow_id: result.data.id,
        });

        setQROpen(true);
      } else {
        const errorData = await response.json();
        alert(`Gagal membuat peminjaman: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Network/Parse Error:', error);
      alert('Terjadi kesalahan saat memproses peminjaman');
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-3 mt-6">
        <div className="p-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700 rounded-xl">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
            Anda harus login terlebih dahulu untuk meminjam buku
          </p>
          <Button
            onClick={() => redirect('/full-width-pages/auth/signin')}
            className="bg-blue-600 text-white rounded-xl h-11"
          >
            Login Sekarang
          </Button>
        </div>
      </div>
    );
  }

  

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 mt-6">
        {/* PINJAM */}
        <Button
          onClick={() => setBorrowOpen(true)}
          className="bg-blue-600 text-white rounded-xl h-11"
        >
          <BookOpen className="mr-2" /> Pinjam
        </Button>

        {/* WISHLIST */}
        <Button 
          variant="outline" 
          className="rounded-xl h-11"
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
        >
          {isInWishlist ? (
            <>
              <BookmarkCheck className="mr-2" /> Di Wishlist
            </>
          ) : (
            <>
              <Bookmark className="mr-2" /> Wishlist
            </>
          )}
        </Button>

        {/* QR BUTTON */}
        <Button
          variant="outline"
          className="rounded-xl h-11"
          disabled={!qrData}
          onClick={() => setQROpen(true)}
        >
          <QrCode className="mr-2" /> QR
        </Button>
      </div>

      {/* MODAL PINJAM */}
      <BorrowModal
        open={borrowOpen}
        setOpen={setBorrowOpen}
        book={{
          title: data.judul,
          author: data.penulis,
          image: data.image_url,
          category: data.kategori,
          stock: data.stok,
        }}
        onConfirm={handleBorrowConfirm}
      />

      {/* MODAL QR */}
      {/* <QRModal
        isOpen={qrOpen}
        onClose={() => setQROpen(false)}
        type="borrow"
        userId={session?.user?.id}
        bookId={data.id}
        batasKembali={qrData?.batas_kembali}
      /> */}

      <QRModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  type="borrow"
  userId={session?.user?.id}
  bookId={data.id}
  batasKembali={qrData?.batas_kembali }
  scanSuccess={scanSuccess}
/>

{/* 
       <QrBerhasil
        bookId={data.id}
        open={openQR}
        onClose={() => setOpenQR(false)}
      /> */}
    </>
  );
}