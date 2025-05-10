import React from "react";
import { useModal } from "@/components/contexts/ModalContext";

export type LoggedInMenuItem = {
    label: string;
    context: "openLogInModal" | "openSignUpModal";
};

interface Props {
    menuItems : LoggedInMenuItem[];
};


const UserLoggedInDropDown = ({menuItems}: Props) => {
    const { openLogInModal, openSignUpModal } = useModal();
    
    const contextMap = {
        openLogInModal,
        openSignUpModal,
        };
    
    return (
        <div className="rounded-xl bg-[#f3f3f3] min-h-50 w-60 sm:w-60 mt-10 py-3 px-4 absolute drop-shadow-xl
        overflow-auto -right-[0%] top-[70%]">
            
            <div className="flex">
                <div className="py-3">
                    <p className="text-3xl font-semibold text-blue-green">Username</p>
                    <p className="text-lg font-regular text-[#979797]">username@gmail.com</p>
                    <p className="text-base font-regular text-[#a8a8a8]">(User)</p>
                </div>
            
            </div>

            {menuItems.map((item) => {
                return (
                    <button key={item.label} onClick={() => contextMap[item.context]()} 
                    className="flex text-base text-[#0D767A] py-2 leading-[1] text-left 
                    hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default UserLoggedInDropDown;