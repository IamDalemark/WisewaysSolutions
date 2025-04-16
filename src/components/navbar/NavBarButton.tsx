// the buttons you see to the right of the logo in the navbar

import ServiceDropDownItem from "./dropdown/ServiceDropDownItem";
import React from 'react';
import {Link} from 'react-scroll';


type Button = "Services" | "About" | "Contact" | "Testimonial"

const getNavButtonFromName = (navButtonName: Button) => {
    const baseClass = "flex text-base text-blue-green p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer";
    
    switch (navButtonName) {
        case "Services":
            return <ServiceDropDownItem label="SERVICES"/>;
        case "About":
            return <Link 
                to="about"
                spy={true}
                smooth={true} 
                offset={-120} 
                duration={600}
                className={baseClass}>
                    ABOUT
                </Link>;
        case "Contact":
            return <Link 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-120} 
            duration={600}
            className={baseClass}>
                CONTACT
            </Link>;
        case "Testimonial":
            return <Link 
            to="testimonial" 
            spy={true} 
            smooth={true} 
            offset={-75} 
            duration={600}
            className={baseClass}>
                TESTIMONIAL
            </Link>;
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

