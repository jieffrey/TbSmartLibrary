"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
      setNavbarOpen(false);
    }
  };

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScroll]);

  const isHomepage = pathname === "/";

  // 🔥 Tambahan fungsi scroll halus
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setNavbarOpen(false); // tutup menu mobile kalau dipakai di mobile
    }
  };

  return (
    <header
      className={`fixed h-24 py-1 z-50 w-full transition-all duration-300 px-4 lg:px-0 ${
        sticky ? "top-3" : "top-0"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between rounded-full transition-all duration-300 ease-in-out ${
          sticky
            ? "max-w-5xl bg-[var(--color-primary)] shadow-lg px-6 py-3"
            : "max-w-7xl bg-transparent px-12 py-4"
        }`}
      >
        {/* === LEFT: LOGO === */}
        <Link 
        onClick={() => scrollToSection("/")}
        href="/">
          <Image
            src="/images/logo/logotb1.svg"
            alt="Smart Eduverse Library Logo"
            width={150}
            height={68}
            unoptimized
            priority
            className="select-none"
          />
        </Link>

        {/* === CENTER: NAVIGATION LINKS === */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("catalog")}
            className={`text-base font-medium transition-colors ${
              isHomepage && !sticky ? "text-white" : "text-black"
            } hover:text-[var(--color-primary-dark)]`}
          >
            Katalog Buku
          </button>

          <button
            onClick={() => scrollToSection("tentang")}
            className={`text-base font-medium transition-colors ${
              isHomepage && !sticky ? "text-white" : "text-black"
            } hover:text-[var(--color-primary-dark)]`}
          >
            Tentang
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className={`text-base font-medium transition-colors ${
              isHomepage && !sticky ? "text-white" : "text-black"
            } hover:text-[var(--color-primary-dark)]`}
          >
            Kontak
          </button>

          <Link
            href="/full-width-pages/auth/signin"
            className={`text-base font-medium transition-colors ${
              isHomepage && !sticky ? "text-white" : "text-black"
            } hover:text-[var(--color-primary-dark)]`}
          >
            Masuk
          </Link>
        </div>

        {/* === RIGHT: MENU BUTTON (Mobile) === */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className={`flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold border transition-all duration-300 ${
            sticky
              ? "bg-white text-black hover:bg-gray-100 border-transparent"
              : "bg-[var(--color-primary)] text-black hover:bg-white hover:text-[var(--color-primary)] border-transparent"
          }`}
        >
          <Icon icon="ph:list" width={24} height={24} />
          <span className="hidden sm:block">Menu</span>
        </button>
      </nav>

      {/* Overlay */}
      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
      )}

      {/* Sidebar Menu */}
      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-black text-white shadow-lg px-10 py-10 transition-transform duration-300 ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        } z-50 overflow-auto`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Header */}
          <div className="flex justify-start mb-6">
            <button
              onClick={() => setNavbarOpen(false)}
              className="bg-[var(--color-primary)] p-3 rounded-full"
            >
              <Icon icon="ph:x-bold" width={24} height={24} className="text-black" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col items-start gap-6">
            <button onClick={() => scrollToSection("catalog")} className="hover:text-[var(--color-primary)]">Katalog Buku</button>
            <button onClick={() => scrollToSection("tentang")} className="hover:text-[var(--color-primary)]">Tentang</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-[var(--color-primary)]">Kontak</button>
            <Link href="/login" className="hover:text-[var(--color-primary)]">Masuk</Link>
          </nav>

          {/* Footer */}
          <div className="flex flex-col gap-1 mt-16 text-white">
            <p className="text-base font-normal text-white/40">Contact</p>
            <Link href="#" className="text-base font-medium hover:text-[var(--color-primary)]">
              kalsahalkautsar@gmail.com
            </Link>
            <Link href="#" className="text-base font-medium hover:text-[var(--color-primary)]">
              +62 87839615005
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
