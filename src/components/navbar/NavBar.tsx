"use client";

// the main component for the actual navbar you see at the top of the website

import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavMenuDropDownItem from "./dropdown/NavMenuDropDownItem";
import NavBarButton from "./NavBarButton";
import UserDropDownItem from "./dropdown/UserDropDownItem";
import { useModal } from "../contexts/ModalContext";
import AppointmentButton from "./AppointmentButton";

const NavBar = () => {
  const { handleScheduleAppointment } = useModal();

  return (
    <nav className="w-[90%] flex items-center bg-[#F3F3F3] fixed top-6 mx-[5%] rounded-3xl h-20 shadow-lg px-[2%] justify-between z-1">
      <div className="flex w-[60%] md:w-[40%] lg:w-[65%] xl:w-[70%]">
        <Link href="/" className="w-[80%] lg:w-[35%] xl:w-[30%] h-full mx-[2%]">
          <Image
            src={"/wiseways_navbar_logo.png"}
            alt="WiseWays Solution logo"
            width={190}
            height={51.5}
            className="hover:scale-103 transition-all"
          ></Image>
        </Link>

        <ul className="hidden lg:flex items-center lg:w-[55%] xl:w-[60%] justify-left">
          <NavBarButton navButtonName="Services" />
          <NavBarButton navButtonName="About" />
          <NavBarButton navButtonName="Contact" />
          <NavBarButton navButtonName="Testimonial" />
        </ul>
      </div>

      <div className="flex w-[30%] md:w-[55%] lg:w-[30%] xl:w-[30%] mr-[2%] justify-end">
        <div className="hidden md:flex md:w-[60%] lg:w-[75%] items-center justify-end max-w-70">
          <AppointmentButton
            onHandleScheduleAppointment={handleScheduleAppointment}
          />
        </div>

        <UserDropDownItem initialOpen={false} />
        <NavMenuDropDownItem initialOpen={false} />
      </div>
    </nav>
  );
};

export default NavBar;
