"use client";


type NavMenuItem = {
    label: string;
};

interface Props {
    isOpen: boolean;
    navMenuItems: NavMenuItem[];
}

const NavMenuDropDown = ({ isOpen, navMenuItems }: Props) => {
    return (
        <div className={`absolute lg:hidden top-24 left-0 w-[74%] sm:w-[64%] pt-3 mx-[13%] sm:mx-[18%] bg-[#F3F3F3] flex flex-col justify-self-center items-center gap-3
            font-semibold text-lg transform transition-transform rounded-2xl drop-shadow-2xl ${isOpen ? "opacity-100" : "opacity-0"}`}
            style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>

            {navMenuItems.map((item) => {
                return (
                    <li key={item.label} className="list-none w-[50%] md:w-[40%] text-center p-3 rounded-2xl
                    hover:text-[#fd8432] hover:scale-105 transition-all cursor-pointer">
                        {item.label}
                    </li>
                );
            })}

            <button className="inline-block md:hidden h-5/8 w-[70%] py-1 mb-6  bg-blue-green text-[#F3F3F3] rounded-2xl leading-[1.25] 
            hover:bg-blue-green-dark hover:text-[#BECECE] hover:scale-103 transition-all cursor-pointer">
            <p>SCHEDULE <br /> APPOINTMENT</p>
            </button>

        </div>
    );
};

export default NavMenuDropDown;