import Link from "next/link";

const AppointmentButton = () => {
    return (
        <Link href="/booking" className="h-15 md:h-[95%] w-50 py-2 mx-2 bg-blue-green text-[#F3F3F3] text-lg rounded-2xl leading-[1.25]
            hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer justify-items-center">
            <div className="text-center">
                SCHEDULE <br /> APPOINTMENT
            </div>
        </Link>
    );
};

export default AppointmentButton;