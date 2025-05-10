// the dropdown menu that will popup when you select 'user' in the navbar

import React from "react";
import { useModal } from "@/components/contexts/ModalContext";

export type LoggedOutMenuItem = {
  label: string;
  context: "openLogInModal" | "openSignUpModal";
};

interface Props {
  menuItems: LoggedOutMenuItem[];
}

const UserLoggedOutDropDown = ({ menuItems }: Props) => {
  const { openLogInModal, openSignUpModal } = useModal();

  const contextMap = {
    openLogInModal,
    openSignUpModal,
  };

  return (
    <div
      className="rounded-xl bg-[#f3f3f3] min-h-20 w-30 sm:w-40 mt-10 py-5 pl-5 absolute drop-shadow-xl
        overflow-auto -right-[0%] top-[70%] space-y-4"
    >
      {menuItems.map((item) => {
        return (
          <button
            key={item.label}
            onClick={() => contextMap[item.context]()}
            className="w-[80%] leading-[1] flex text-lg text-[#0D767A] hover:text-[#FD8432] 
                        hover:scale-105 transition-all cursor-pointer"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default UserLoggedOutDropDown;
