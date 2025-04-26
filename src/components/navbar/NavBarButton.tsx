// the buttons you see to the right of the logo in the navbar

import ServiceDropDownItem from "./dropdown/ServiceDropDownItem";
import NonDropDownButton from "./NonDropDownButton";
import React from "react";


type Button = "Services" | "About" | "Contact" | "Testimonial"

const getNavButtonFromName = (navButtonName: Button) => {
    switch (navButtonName) {
        case "Services":
            return <ServiceDropDownItem label="SERVICES" initialOpen={false}/>;
        case "About":
            return <NonDropDownButton section="about" label="ABOUT"/>;
        case "Contact":
            return <NonDropDownButton section="contact" label="CONTACT"/>;
        case "Testimonial":
            return <NonDropDownButton section="testimonial" label="TESTIMONIAL"/>;
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

