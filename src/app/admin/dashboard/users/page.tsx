import type { Metadata } from "next";
import UserTable from "@/components/admin/manajemen-user/UserTable";

export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard | TailAdmin",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Page() {
  return (
    <div className="">
      <UserTable />
    </div>
  );
}
