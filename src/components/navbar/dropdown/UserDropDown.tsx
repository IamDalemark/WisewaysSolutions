// the dropdown menu that will popup when you select 'user' in the navbar

import React from "react";
import Link from "next/link";

type MenuItem = {
    label: string;
    href: string;
};

interface Props {
    menuItems : MenuItem[]
};

// const UserDropDown = ({menuItems}: Props) => {
//     return (
//         <div className="rounded-xl bg-[#f3f3f3] min-h-50 w-60 sm:w-60 mt-10 py-3 px-4 absolute drop-shadow-xl
//         overflow-auto -right-[0%] top-[70%]">
            
//             <div className="flex">
//                 <div className="py-3">
//                     <p className="text-3xl font-semibold text-blue-green">Username</p>
//                     <p className="text-lg font-regular text-[#979797]">username@gmail.com</p>
//                     <p className="text-base font-regular text-[#a8a8a8]">(User)</p>
//                 </div>
            
//             </div>

//             {menuItems.map((item) => {
//                 return (
//                     <button className="flex text-base text-[#0D767A] py-2 leading-[1] text-left 
//                     hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
//                         {item.label}
//                     </button>
//                 );
//             })}
//         </div>
//     );
// };

const NonLogUserDropDown = ({menuItems}: Props) => {
    return (
        <div className="rounded-xl bg-[#f3f3f3] min-h-20 w-30 sm:w-40 mt-10 py-3 pl-6 absolute drop-shadow-xl
        overflow-auto -right-[0%] top-[70%]">

            {menuItems.map((item) => {
                return (
                    <Link key={item.label} href={item.href}>
                        <button className="flex text-lg text-[#0D767A] py-2 leading-[1] text-left 
                    hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
                        {item.label}
                    </button>
                    </Link>
                );
            })}
        </div>
    );
};

export default NonLogUserDropDown;