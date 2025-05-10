"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function NavBarWrapper() {
  const pathname = usePathname();
  const adminRoute = pathname.startsWith("/admin");
  const resetPasswordRoute = pathname.startsWith("/resetpassword");
  if (adminRoute || resetPasswordRoute) {
    return null;
  }
  return <NavBar />;
}
