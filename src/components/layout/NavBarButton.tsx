import ServiceDropDownItem from "./ServiceDropDownItem";
import ProfileDropDownItem from "./ProfileDropDownItem";

type Button = "Services" | "About" | "Contact" | "User"

const getNavButtonFromName = (navButtonName: Button) => {
  switch (navButtonName) {
    case "Services":
        return <ServiceDropDownItem label="SERVICES"/>;
    case "About":
        return <a href="#about" className="flex text-blue-green p-2 
            hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
                ABOUT
            </a>;
    case "Contact":
        return <a href="#contact" className="flex text-blue-green p-2 
            hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
                CONTACT
            </a>;
    case "User":
        return <ProfileDropDownItem label="USER"/>;
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

