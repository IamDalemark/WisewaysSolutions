"use client";

import { useState, useEffect, useRef } from "react";
import { CircleUserRound } from "lucide-react";
import UserLoggedInDropDown from "./UserLoggedInDropDown";
import UserLoggedOutDropDown from "./UserLoggedOutDropDown";
import { LoggedOutMenuItem } from "./UserLoggedOutDropDown";
import { useUser } from "@/components/contexts/UserContext";

interface Props {
  initialOpen: boolean;
}

const UserDropDownItem = ({ initialOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const nonLoggedItems: LoggedOutMenuItem[] = [
    { label: "Log In", context: "openLogInModal" },
    { label: "Sign Up", context: "openSignUpModal" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      <div
        className="flex group h-11 w-11 ml-2 rounded-[2.5rem] hover:scale-105 transition-all cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-11 w-11 rounded-full ">
          <CircleUserRound
            color="#096c71"
            strokeWidth={2}
            size={44}
            className="m-auto group-hover:stroke-[#FD8432]"
          />
        </div>
      </div>

      {isOpen &&
        (user ? (
          <UserLoggedInDropDown user={user} />
        ) : (
          <UserLoggedOutDropDown menuItems={nonLoggedItems} />
        ))}
    </div>
  );
};

export default UserDropDownItem;
