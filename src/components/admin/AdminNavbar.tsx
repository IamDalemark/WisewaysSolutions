"use client";

import { Button } from "@/components/ui/button";

const AdminNavbar = () => {
  return (
    <header className="fixed top-0 left-[255px] right-0 z-50 bg-blue-green-dark text-white h-16 flex items-center justify-between px-6 shadow-md">
      <h1 className="text-2xl font-semibold">DASHBOARD</h1>
      <Button
        variant="outline"
        className="border-white text-blue-green-dark hover:bg-white hover:text-blue-green-dark"
        onClick={() => {
          console.log("Logout clicked");
        }}
      >
        Logout
      </Button>
    </header>
  );
};

export default AdminNavbar;