"use client";

// the hamburger menu at the right side of the navbar
import { Menu } from "lucide-react";
import NavMenuDropDown from "./NavMenuDropDown";
import { useAutoCloseDropdown } from "@/hooks/useAutoCloseDropDown";

interface Props {
    initialOpen: boolean;
}

const NavMenuDropDownItem = ({ initialOpen = false }: Props) => {
    const { isOpen, setIsOpen, ref } = useAutoCloseDropdown(initialOpen);

    return (
        <div ref={ref} className="w-15 md:w-[15%] my-auto px-[10%] sm:px-[2%] lg:hidden justify-center cursor-pointer">
            <Menu color="#086B70" size={35} strokeWidth={2.5} 
            className="justify-self-center hover:stroke-[#FD8432] hover:scale-110 transition-all"
            onClick={() => setIsOpen(prev => !prev)}/>

            <NavMenuDropDown isMenuOpen={isOpen}/>
        </div>
    );
};

export default NavMenuDropDownItem;