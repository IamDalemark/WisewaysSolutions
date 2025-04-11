"use client";

// the profile button in the navbar
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import UserDropDown from "./UserDropDown";

interface Props {
    label: string;
}

const UserDropDownItem = ({ label }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const menuItems = [{label: "Change Password"}, {label: "Log Out"}];
    
    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };
            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpen]);

    return (
        <div ref={dropdownRef}>
            <button className="flex text-[#0D767A] p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}>
                {label} {isOpen ? <ChevronUp color="#086B70" strokeWidth={3}/> 
                                : <ChevronDown color="#086B70" strokeWidth={3}/>}
            </button>

            {isOpen && <UserDropDown menuItems={menuItems} />}
        </div>
    );
};

export default UserDropDownItem;