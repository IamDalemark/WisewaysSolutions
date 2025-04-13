"use client";

import React, { useState } from "react";
import Image from "next/image";
import NavMenuDropDownItem from "./NavMenuDropDownItem";
import Link from "next/link";
import NavBarButton from "./NavBarButton";
import { useRouter } from "next/navigation";
import UserLoginModal from "../auth/user/UserLoginModal";
import UserSignUpModal from "../auth/user/UserSignUpModal";

const NavBar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserLoginModal, setShowUserLoginModal] = useState(false);
  const [showUserSignUpModal, setShowUserSignUpModal] = useState(false);
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);

  const handleScheduleAppointment = () => {
    if (isLoggedIn) {
      router.push("/booking");
    } else {
      setIsBookingAppointment(true);
      setShowUserLoginModal(true);
    }
  };

  const handleChangeModal = () => {
    setShowUserLoginModal(!showUserLoginModal);
    setShowUserSignUpModal(!showUserSignUpModal);
  };

  const handleLogin = () => {
    if (isBookingAppointment) {
      router.push("/booking");
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <nav className="w-[80%] flex items-center bg-[#F3F3F3] fixed top-6 mx-[10%] rounded-3xl h-20 shadow-lg/15 px-[2%] justify-between z-1">
      <div className="flex w-[70%] md:w-[50%] lg:w-[75%] ">
        <Link
          href="/"
          className="w-[80%] lg:w-4/12 h-full ml-[4%] mr-[1%] xl:ml-[5%]"
        >
          <Image
            src={"/wiseways_navbar_logo.png"}
            alt="WiseWays Solution logo"
            width={190}
            height={51.5}
            className="hover:scale-103 transition-all"
          ></Image>
        </Link>

        <ul className="hidden lg:flex items-center lg:w-8/12">
          <NavBarButton navButtonName="Services" />
          <NavBarButton navButtonName="About" />
          <NavBarButton navButtonName="Contact" />
          <NavBarButton navButtonName="User" />
        </ul>
      </div>

      <div className="flex w-[30%] md:w-[50%] lg:w-[25%] justify-end">
        <button
          className="hidden md:inline-block h-5/8 w-[50%] lg:w-[80%] xl:[60%] py-1 mx-2 bg-blue-green text-[#F3F3F3] rounded-2xl leading-[1.25] 
            hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer"
          onClick={handleScheduleAppointment}
        >
          <p>
            SCHEDULE <br /> APPOINTMENT
          </p>
        </button>

        <NavMenuDropDownItem />
      </div>

      <UserLoginModal
        show={showUserLoginModal}
        onClose={() => setShowUserLoginModal(false)}
        onOpenSignUp={handleChangeModal}
        onLogin={handleLogin}
      />
      <UserSignUpModal
        show={showUserSignUpModal}
        onClose={() => setShowUserSignUpModal(false)}
        onOpenLogIn={handleChangeModal}
      />
    </nav>
  );
};

export default NavBar;
