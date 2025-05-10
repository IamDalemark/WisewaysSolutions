"use client";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoCloseSidebar } from "@/hooks/useAutoCloseSidebar";

export default function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen, ref } = useAutoCloseSidebar(false);

  return (
    <SidebarProvider>
      <div className="relative w-full">
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dark overlay */}
              <motion.div
                key="overlay"
                className="fixed inset-0 z-40 bg-[#00000049]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              {/* Sidebar panel */}
              <motion.div
                key="sidebar"
                ref={ref}
                className="fixed top-0 left-0 h-full w-[250px] z-50 bg-white shadow-xl"
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <AdminSidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="min-h-screen">
          <AdminNavbar toggleSidebar={() => setIsOpen(prev => !prev)} />
          <main className="mt-16 px-0 sm:px-10 md:px-15 transition-all">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
