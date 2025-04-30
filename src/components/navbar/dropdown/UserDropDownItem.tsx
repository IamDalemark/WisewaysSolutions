"use client";
 
 import { useState, useEffect, useRef } from "react";
 import { CircleUserRound } from "lucide-react";
//  import UserDropDown from "./UserDropDown";
 import NonLogUserDropDown from "./UserDropDown";
 
 interface Props {
    initialOpen: boolean;
}
 
 const UserDropDownItem = ({initialOpen}: Props) => {
     const [isOpen, setIsOpen] = useState(initialOpen);
     const dropdownRef = useRef<HTMLDivElement>(null);
 
    //  const menuItems = [{label: "Change Password"}, {label: "Log Out"}];
     const nonLoggedItems = [{label: "Log In", href: "/auth/user/UserLoginModal"}, 
        {label: "Sign Up", href: "/auth/user/UserSignUpModal"}];
 
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
         <div ref={dropdownRef} className="flex justify-items-end items-center">
            <div className="flex group h-11 w-11 ml-2 rounded-[2.5rem] hover:scale-105 transition-all"
             onClick={() => setIsOpen(!isOpen)}>
                <div className="h-11 w-11 rounded-full ">
                     <CircleUserRound color="#096c71" strokeWidth={2} size={44} className="m-auto group-hover:stroke-[#FD8432]"/>
                 </div>
            </div>
            
            {isOpen && <NonLogUserDropDown menuItems={nonLoggedItems}/>}
            {/* {isOpen && <UserDropDown menuItems={menuItems}/>} */}
         </div>
     );
 };

export default UserDropDownItem;
 