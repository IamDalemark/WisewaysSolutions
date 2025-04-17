"use client";
 
 import { useState, useEffect, useRef } from "react";
 import { CircleUserRound } from "lucide-react";
 import UserDropDown from "./UserDropDown";
 
 
 const UserDropDownItem = () => {
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
         <div ref={dropdownRef} className="flex justify-items-end">
            <div className="flex group h-11 w-11 ml-2 rounded-[2.5rem] hover:scale-105 transition-all"
             onClick={() => setIsOpen(!isOpen)}>
                <div className="h-11 w-11 rounded-full ">
                     <CircleUserRound color="#096c71" strokeWidth={2} size={44} className="m-auto group-hover:stroke-[#FD8432]"/>
                 </div>
            </div>
            
            {isOpen && <UserDropDown menuItems={menuItems}/>}
             {/* <button className="flex text-[#0D767A] p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer"
             onClick={() => setIsOpen(!isOpen)}>
                 {label} {isOpen ? <ChevronUp color="#086B70" strokeWidth={3}/> 
                                 : <ChevronDown color="#086B70" strokeWidth={3}/>}
             </button>
 
             {isOpen && <UserDropDown menuItems={menuItems} />} */}
         </div>
     );
 };

export default UserDropDownItem;
 