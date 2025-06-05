"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

const AdminNavbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-blue-green-dark text-white h-16 flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center gap-4">
        <MenuIcon
          className="w-6 h-6 hover:text-[#FD8432] hover:scale-110 transition-all cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-2xl font-semibold">DASHBOARD</h1>
      </div>
      <Button
        variant="outline"
        data-testid="logout-button"
        className="border-white text-blue-green-dark hover:bg-white hover:text-[#FD8432] 
        hover:scale-105 transition-all cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </header>
  );
};

export default AdminNavbar;
