// the buttons you see to the right of the logo in the navbar

import ServiceDropDownItem from "./dropdown/ServiceDropDownItem";
import NonDropDownButton from "./NonDropDownButton";
import React from "react";


type Button = "Services" | "About" | "Contact" | "Testimonial"

const getNavButtonFromName = (navButtonName: Button) => {
    switch (navButtonName) {
        case "Services":
            return <ServiceDropDownItem label="SERVICES"/>;
        case "About":
            return <NonDropDownButton section="about" offset={-120} label="ABOUT"/>;
        case "Contact":
            return <NonDropDownButton section="contact" offset={-120} label="CONTACT"/>;
        case "Testimonial":
            return <NonDropDownButton section="testimonial" offset={-75} label="TESTIMONIAL"/>;
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

