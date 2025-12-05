"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

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

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setNavbarOpen(false);
    }
  };

  return (
    <header
      className={`fixed h-24 py-1 z-50 w-full transition-all duration-300 px-4 lg:px-0 ${
        sticky ? "top-3" : "top-0"
      }`}
    >
      <nav
        className={`
          mx-auto flex items-center justify-between rounded-full transition-all duration-300 ease-in-out 
          ${sticky
            ? "max-w-5xl bg-[var(--color-primary)] dark:bg-[#0a1a2a] shadow-lg px-6 py-3"
            : "max-w-7xl bg-transparent dark:bg-transparent px-12 py-4"
          }
        `}
      >
        {/* === LEFT: LOGO === */}
        <Link onClick={() => scrollToSection("/")} href="/">
          <Image
            src="/images/logo/logotb1.svg"
            alt="Smart Eduverse Library Logo"
            width={150}
            height={68}
            unoptimized
            priority
            className="select-none dark:invert-[0.05]"
          />
        </Link>

        {/* === CENTER NAV LINKS === */}
        <div className="hidden md:flex items-center gap-8">
          {["catalog", "tentang", "contact"].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className={`
                text-base font-medium transition-colors
                ${
                  isHomepage && !sticky
                    ? "text-black dark:text-white"
                    : "text-black dark:text-white"
                }
                hover:text-[var(--color-primary-dark)]
              `}
            >
              {sec === "catalog" ? "Katalog Buku" : sec === "tentang" ? "Tentang" : "Kontak"}
            </button>
          ))}

          <Link
            href="/full-width-pages/auth/signin"
            className={`
              text-base font-medium transition-colors 
              ${
                isHomepage && !sticky
                  ? "text-black dark:text-white"
                  : "text-black dark:text-white"
              }
              hover:text-[var(--color-primary-dark)]
            `}
          >
            Masuk
          </Link>
        </div>
        {/* Theme Toggle */}
                <div className="fixed bottom-6 right-6 z-50">
                  <ThemeTogglerTwo />
                </div>

        {/* === RIGHT MOBILE MENU BUTTON === */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className={`
            flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold border 
            transition-all duration-300
            ${
              sticky
                ? "bg-white text-black dark:bg-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                : "bg-[var(--color-primary)] text-black hover:bg-white dark:bg-[#1c2a3a] dark:text-white dark:hover:bg-gray-700"
            }
          `}
        >
          <Icon icon="ph:list" width={24} height={24} />
          <span className="hidden sm:block">Menu</span>
        </button>
        </nav>

        {/* Overlay */}
        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-40" />
        )}

        {/* === SIDE MENU === */}
        <div
          ref={sideMenuRef}
          className={`
            fixed top-0 right-0 h-full w-full max-w-sm 
            bg-white text-black                  /* ⭐ Light Mode lebih bersih */
            dark:bg-[#0d1b2a] dark:text-gray-100 /* ⭐ Dark Mode lebih gelap agar kontras */
            shadow-lg px-10 py-10
            transition-transform duration-300
            ${navbarOpen ? "translate-x-0" : "translate-x-full"}
            z-50 overflow-auto
          `}
        >
          <div className="flex flex-col h-full justify-between">

            {/* Close Button */}
            <div className="flex justify-start mb-6">
              <button
                onClick={() => setNavbarOpen(false)}
                className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Icon icon="ph:x-bold" width={24} height={24} className="text-black dark:text-white" />
              </button>
            </div>

            {/* NAVIGATION LIST */}
            <nav className="flex flex-col items-start gap-6">

              {["catalog", "tentang", "contact"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className="
                    text-lg font-medium
                    hover:underline hover:underline-offset-4     /* ⭐ hover aman tidak hilang */
                    dark:hover:text-[var(--color-primary)]
                  "
                >
                  {sec === "catalog" ? "Katalog Buku" : sec === "tentang" ? "Tentang" : "Kontak"}
                </button>
              ))}

              <Link
                href="/login"
                className="
                  text-lg font-medium
                  hover:underline hover:underline-offset-4       /* ⭐ konsisten */
                  dark:hover:text-[var(--color-primary)]
                "
              >
                Masuk
              </Link>
            </nav>

            {/* CONTACT SECTION */}
            <div className="flex flex-col gap-1 mt-16 text-gray-700 dark:text-gray-300">
              <p className="text-base font-normal text-gray-500 dark:text-gray-500">
                Contact
              </p>

              <Link
                href="#"
                className="text-base font-medium hover:text-[var(--color-primary)] hover:underline"
              >
                kalsahalkautsar@gmail.com
              </Link>

              <Link
                href="#"
                className="text-base font-medium hover:text-[var(--color-primary)] hover:underline"
              >
                +62 87839615005
              </Link>
            </div>

          </div>
        </div>
    </header>
  );
};

export default Navbar;
