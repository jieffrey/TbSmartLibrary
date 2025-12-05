"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  const toggleApplicationMenu = () => setApplicationMenuOpen(!isApplicationMenuOpen);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className="sticky top-0 flex w-full 
  bg-[#fff8e7] border-[#FFE7B3]
  dark:bg-[#1A1A1A] dark:border-[#333333]
  z-50 lg:border-b transition-colors duration-300"
    >
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">

          {/* ⬇️ Updated Toggle Button ⬇️ */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-xl border lg:w-11 lg:h-11 
                       text-[--color-dark] 
                       border-[--color-primary] 
                       bg-[--color-primary]
                       hover:bg-[--color-foreground] hover:text-[--color-dark]
                       dark:bg-[--color-dark] dark:text-[--color-primary] dark:border-[--color-primary]
                       transition-colors duration-200 z-50"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                />
              </svg>
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 1C1 0.585786 1.33579 0.25 1.75 0.25H18.25C18.6642 0.25 19 0.585786 19 1C19 1.41421 18.6642 1.75 18.25 1.75H1.75C1.33579 1.75 1 1.41421 1 1ZM1 13C1 12.5858 1.33579 12.25 1.75 12.25H18.25C18.6642 12.25 19 12.5858 19 13C19 13.4142 18.6642 13.75 18.25 13.75H1.75C1.33579 13.75 1 13.4142 1 13ZM1.75 6.25C1.33579 6.25 1 6.58579 1 7C1 7.41421 1.33579 7.75 1.75 7.75H11C11.4142 7.75 11.75 7.41421 11.75 7C11.75 6.58579 11.4142 6.25 11 6.25H1.75Z"
                />
              </svg>
            )}
          </button>
          {/* ⬆️ END Updated Toggle Button */}

          <Link href="/" className="lg:hidden">
            <Image width={154} height={32} src="/images/logo/logotb1.svg" alt="Logo" />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 rounded-lg lg:hidden"
            style={{ color: "var(--color-dark)" }}
          >
            ⋮
          </button>
        </div>

        <div
          className={`${isApplicationMenuOpen ? "flex" : "hidden"} items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0`}
        >
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <NotificationDropdown />
          </div>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
