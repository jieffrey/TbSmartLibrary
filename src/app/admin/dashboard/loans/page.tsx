import LoanTable from "@/components/admin/peminjaman/LoanTable";
import ActiveLoans from "./active/page";
import OverdueLoans from "./overdue/page";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard | TailAdmin",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Page() {
  return (
    
    <div className="">
      <LoanTable/>
    </div>
  );
}
