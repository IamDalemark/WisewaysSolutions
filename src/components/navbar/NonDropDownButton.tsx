import {Link} from "react-scroll";

interface Props {
    section: string;
    offset: number;
    label: string;
}

const NonDropDownButton = ({ section, offset, label }: Props) => {
    const baseClass = "flex text-xl lg:text-base text-blue-green p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer";
    return (
        <Link 
            to={section}
            spy={true}
            smooth={true} 
            offset={offset} 
            duration={600}
            className={baseClass}>
            {label}
        </Link>
    );
};

export default NonDropDownButton;