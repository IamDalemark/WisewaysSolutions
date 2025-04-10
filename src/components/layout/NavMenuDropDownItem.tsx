"use client";

import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import NavMenuDropDown from "./NavMenuDropDown";

const NavMenuDropDownItem = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navMenuItems = [{ label: "SERVICES" }, { label: "ABOUT" }, { label: "CONTACT" }, { label: "USER" }];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div ref={dropdownRef} className="md:w-2/10 my-auto px-[10%] sm:px-[5%] lg:hidden justify-center">
            <Menu color="#086B70" size={35} strokeWidth={2.5} 
            className="justify-self-center hover:stroke-[#FD8432] hover:scale-110 transition-all"
            onClick={() => setIsMenuOpen(prev => !prev)}/>

            <NavMenuDropDown navMenuItems={navMenuItems} isOpen={isMenuOpen}/>
        </div>
    );
};

export default NavMenuDropDownItem;