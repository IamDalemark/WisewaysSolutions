"use client";

// the dropdown menu that will popup when you select hamburger menu in the navbar
import NavBarButton from "../NavBarButton";

type NavMenuItem = {
    label: string;
};

interface Props {
    isOpen: boolean;
    navMenuItems: NavMenuItem[];
}

const NavMenuDropDown = ({ isOpen }: Props) => {
    return (
        <div className={`absolute lg:hidden top-24 left-0 w-[90%] sm:w-[60%] md:w-[50%] pt-3 pb-6 mx-[5%] sm:ml-[40%] md:ml-[50%] 
            bg-[#F3F3F3] flex flex-col items-center gap-7 font-medium transform transition-transform rounded-2xl shadow-2xl 
            ${isOpen ? "opacity-100" : "opacity-0"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>

                <NavBarButton navButtonName="Services"/>
                <NavBarButton navButtonName="About"/>
                <NavBarButton navButtonName="Contact"/>

            <button className="inline-block md:hidden h-5/8 w-[75%] sm:w-[70%] py-1 bg-blue-green text-[#F3F3F3] rounded-2xl leading-[1.25] 
            hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer">
            <p>SCHEDULE <br /> APPOINTMENT</p>
            </button>

        </div>
    );
};

export default NavMenuDropDown;