// import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface Props {
    section: string;
    label: string;
}

const NonDropDownButton = ({ section, label }: Props) => {
    const baseClass = "flex text-xl lg:text-base text-blue-green p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer";
    
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname === "/") {
            // If already on landing page, manually scroll to section
            const target = document.getElementById(section);
            if (target) {
                const yOffset = -120;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        } else {
        // If from another page, save target section temporarily, then redirect to landing
        sessionStorage.setItem("scrollTarget", section);
        router.push("/");
        }
    };
    
    return (
        <button onClick={handleClick} className={baseClass}>
            {label}
        </button>
    );
};

export default NonDropDownButton;