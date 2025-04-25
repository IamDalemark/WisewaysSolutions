"use client";

// the hamburger menu at the right side of the navbar

import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import NavMenuDropDown from "./NavMenuDropDown";

interface Props {
    initialOpen: boolean;
}

const NavMenuDropDownItem = ({initialOpen = false }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(initialOpen);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div ref={dropdownRef} className="md:w-2/10 my-auto px-[10%] sm:px-[5%] lg:hidden justify-center cursor-pointer">
            <Menu color="#086B70" size={35} strokeWidth={2.5} 
            className="justify-self-center hover:stroke-[#FD8432] hover:scale-110 transition-all"
            onClick={() => setIsMenuOpen(prev => !prev)}/>

            <NavMenuDropDown isOpen={isMenuOpen}/>
        </div>
    );
};

export default NavMenuDropDownItem;