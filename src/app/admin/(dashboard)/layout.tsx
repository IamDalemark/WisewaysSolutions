import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";

const inter = Inter({ subsets: ["latin"] });
const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wiseways Solutions",
  description: "Your Virtual Assistance Provider",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} ${interTight.className}`}>
      <AdminDashboardShell>{children}</AdminDashboardShell>
    </div>
  );
}
