"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../context/SidebarContext";

import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: { name: string; href: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: <CalenderIcon />,
    name: "Manajemen Buku",
    href: "/admin/dashboard/books",
  },
  {
    icon: <UserCircleIcon />,
    name: "Manajemen Pengguna",
    href: "/admin/dashboard/users",
  },

  {
    name: "Peminjaman",
    icon: <ListIcon />,
    subItems: [
      { name: "Peminjaman Aktif", href: "/admin/dashboard/loans/active" },
      { name: "Peminjaman Terlambat", href: "/admin/dashboard/loans/overdue" },
      { name: "Pengembalian", href: "/admin/dashboard/loans/return" },
    ],
  },

  {
    name: "Denda",
    icon: <TableIcon />,
    href: "/admin/dashboard/fines",
  },
  {
    name: "Laporan",
    icon: <PageIcon />,
    href: "/admin/dashboard/reports",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = (index: number, menuType: "main") => {
    setOpenSubmenu((prev) =>
      prev && prev.index === index && prev.type === menuType
        ? null
        : { type: menuType, index }
    );
  };

  // hitung tinggi dropdown biar smooth
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const renderMenuItems = (items: NavItem[], type: "main") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            /** -------------------------
             *  SUBMENU (tetap button)
             * ------------------------*/
            <button
              onClick={() => handleSubmenuToggle(index, type)}
              className={`menu-item group ${
                openSubmenu?.index === index && openSubmenu?.type === type
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.index === index && openSubmenu?.type === type
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}

              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.index === index ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.href && (
              /** -------------------------------------------------------
               *  🔧 PERUBAHAN DI SINI — WRAP DENGAN <Link>
               *  agar pindah halaman instan tanpa delay
               * ------------------------------------------------------*/
              <Link
                href={nav.href}
                className={`menu-item group ${
                  isActive(nav.href)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.href)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {/* SUBMENU DROPDOWN */}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => (subMenuRefs.current[`${type}-${index}`] = el)}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === type &&
                  openSubmenu?.index === index
                    ? `${subMenuHeight[`${type}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((sub) => (
                  <li key={sub.name}>
                    {/** -------------------------
                     *  🔧 PERUBAHAN DI SINI
                     *  SUBMENU dibungkus <Link>
                     * ------------------------*/}
                    <Link
                      href={sub.href}
                      className={`menu-dropdown-item ${
                        isActive(sub.href)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {sub.name}

                      <span className="flex items-center gap-1 ml-auto">
                        {sub.new && (
                          <span className="menu-dropdown-badge">new</span>
                        )}
                        {sub.pro && (
                          <span className="menu-dropdown-badge">pro</span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 border-r border-gray-200 z-50
      ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LOGO */}
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/admin-icons.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/admin-icons.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/iconss.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      {/* MENU */}
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <h2
              className={`mb-4 text-xs uppercase text-gray-400 ${
                !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
              }`}
            >
              {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
            </h2>

            {renderMenuItems(navItems, "main")}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
