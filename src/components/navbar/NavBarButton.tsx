// the buttons you see to the right of the logo in the navbar

import ServiceDropDownItem from "./dropdown/ServiceDropDownItem";
// import Link from "next/link";

type Button = "Services" | "About" | "Contact"

const getNavButtonFromName = (navButtonName: Button) => {
  switch (navButtonName) {
    case "Services":
        return <ServiceDropDownItem label="SERVICES"/>;
    case "About":
        return <a href="#about" className="flex text-blue-green p-2 
            hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
                ABOUT
            </a>;
        // <Link key="ABOUT" href="">
        //     <button className="flex text-[#0D767A] pl-2 py-2 leading-[1.25] text-sm lg:text-base text-left hover:text-[#FD8432]
        //     w-full hover:scale-103 transition-all cursor-pointer">
        //         ABOUT
        //     </button>
        // </Link>;
    case "Contact":
        return <a href="#contact" className="flex text-blue-green p-2 
            hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
                CONTACT
            </a>;
  };
};

interface NavButtonProp {
    navButtonName: Button;
}

const NavBarButton = ({navButtonName}: NavButtonProp) => {
    const navButton = getNavButtonFromName(navButtonName);

    return (
        <li className="list-none mx-1">
            {navButton}
        </li>
    );
};

export default NavBarButton;

