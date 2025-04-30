"use client";

// the dropdown menu that will popup when you select hamburger menu in the navbar
import NavBarButton from "../NavBarButton";
import AppointmentButton from "../AppointmentButton";

interface Props {
    isMenuOpen: boolean;
}

const NavMenuDropDown = ({ isMenuOpen }: Props) => {
    return (
        <div className={`absolute lg:hidden top-24 left-0 sm:left-10 md:left-25 h-95 md:h-80 w-[90%] sm:w-[50%] md:w-[35%] pt-6 md:pt-6 pb-6 mx-[5%] sm:ml-[40%] md:ml-[50%] 
            bg-[#F3F3F3] flex flex-col items-center gap-6 md:gap-6 font-medium transform transition-transform rounded-2xl shadow-2xl 
            ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>

            <NavBarButton navButtonName="Services"/>
            <NavBarButton navButtonName="About"/>
            <NavBarButton navButtonName="Contact"/>
            <NavBarButton navButtonName="Testimonial"/>
            <div className="flex md:hidden">
                <AppointmentButton/>
            </div>

        </div>
    );
};

export default NavMenuDropDown;