
import type { Metadata } from "next";
import React from "react";
import AddBookPage from "@/components/admin/manajemen-buku/AddBook";
import EditBookPage from "@/components/admin/manajemen-buku/EditBook";
import BookForm from "@/components/admin/manajemen-buku/BookForm";
import BookTable from "@/components/admin/manajemen-buku/BookTable";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <BookTable/>
        
      </div>

      <div className="col-span-12 xl:col-span-5">
        <BookForm/>

      </div>

      <div className="col-span-12">
        {/* <AddBookPage/> */}
      </div>
      <div className="col-span-12">
        {/* <EditBookPage/> */}
      </div>
    </div>
  );
}
