// import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    section: string;
    label: string;
}

const NonDropDownButton = ({ section, label }: Props) => {
    const baseClass = "flex text-xl lg:text-base text-blue-green p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer";
    
    const router = useRouter();
    const handleClick = () => {
        router.push(section);
    };
    
    return (
        <button onClick={handleClick} className={baseClass}>
            {label}
        </button>
    );
};

export default NonDropDownButton;