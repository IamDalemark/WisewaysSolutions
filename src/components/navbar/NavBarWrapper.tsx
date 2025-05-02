"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

const hiddenPaths = ["/admin"];

export default function NavBarWrapper() {
    const pathname = usePathname();
    const adminRoute = pathname.startsWith("/admin")
    if (adminRoute) {
        return null
    };
    return <NavBar/>;
}
