import ServiceDropDownItem from "./ServiceDropDownItem";

type Button = "Services" | "About" | "Contact"

const getNavButtonFromName = (navButtonName: Button) => {
  switch (navButtonName) {
    case "Services":
        return <ServiceDropDownItem label="SERVICES"/>;
    case "About":
        return <a href="#about" className="flex text-blue-green p-2 mx-2 hover:text-[#FD8432]">ABOUT</a>;
    case "Contact":
        return <a href="#contact" className="flex text-blue-green p-2 mx-2 hover:text-[#FD8432]">CONTACT</a>;
  };
};

interface NavButtonProp {
    navButtonName: Button;
}

const NavBarButton = ({navButtonName}: NavButtonProp) => {
    const navButton = getNavButtonFromName(navButtonName);

    return (
        <li className="list-none">
            {navButton}
        </li>
    );
};

export default NavBarButton;

