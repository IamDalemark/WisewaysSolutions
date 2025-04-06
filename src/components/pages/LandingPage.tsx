"use client";

import NavBar from "../layout/NavBar";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const LandingPage = () => {
    return (
        <div className="bg-[#E1E1E1] text-[#0D767A] w-full h-full pb-30">
            <NavBar/>
            <div className="flex px-18 pt-20">

                {/* this is the intro section */}
                <div className="text-wrap w-[55%] pt-8 pl-4">
                    <p className="text-6xl font-medium leading-[1.1]">
                        Welcome to <br />the Official Website <br />of WiseWays Solutions!
                    </p>
                    <p className="text-lg mt-1.5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />
                    tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="h-[320] w-[480] rounded-4xl ml-4">
                    <Image src={"/landing-page1.png"} alt="Website Landing page" height={320} width={480}></Image>
                </div>

            </div>


            {/* this is the services section */}
            <div className="flex px-18 pt-24">

                <div className="text-wrap w-[55%] pt-16 pl-4">
                    <p className="text-5xl font-medium leading-[1.1]">
                        Services and Solutions for Your Small Business
                    </p>
                    <p className="text-lg mt-1.5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />
                    tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div className="mx-[25%] pt-4">
                        <button className="bg-[#0D767A] text-[#F3F3F3] rounded-lg px-4 py-2
                        hover:bg-[#086B70] hover:text-[#BECECE]">
                            View Available Services
                        </button>
                    </div>
                </div>

                <div className="h-[320] w-[480] rounded-4xl ml-4">
                    <Image src={"/landing-services.png"} alt="Services" height={320} width={480}></Image>
                </div>

            </div>


            {/* this is the about section */}
            <div id="about" className="flex px-18 pt-24">

                <div className="text-wrap w-[55%] pt-8 pl-4">
                    <div className="flex text-6xl font-medium">
                        About<p className="text-[#FD8432] ml-2 font-semibold">Wiseways</p>
                    </div>
                    <p className="text-md mt-1.5 pr-18">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. 
                    It has roots in a piece of classical Latin literature from 45 BC, 
                    making it over 2000 years old. 
                    <br />
                    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                    looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum 
                    passage, and going through the cites of the word in classical literature, 
                    discovered the undoubtable source.
                    </p>
                </div>

                <div className="h-[320] w-[480] rounded-4xl ml-4">
                    <Image src={"/landing-about.png"} alt="About Company" height={320} width={480}></Image>
                </div>

            </div>


            {/* this is the contact section */}
            <div id="contact" className="flex px-18 pt-24">

                <div className="text-wrap w-[55%] pt-6 pl-24">
                    <p className="text-5xl font-medium leading-[1.1]">
                        CONTACT US
                    </p>
                    <p className="text-lg mt-0.5 mb-2 font-light">
                        If you have any questions or concerns
                    </p>
                    
                    <div className="flex my-4">
                        <Phone size={30}/>
                        <p className="ml-3 text-xl font-medium">(63) 000-000-0000</p>
                    </div>
                    <div className="flex my-4">
                        <Mail size={30}/>
                        <p className="ml-3 text-xl font-medium">loremisum@gmail.com</p>
                    </div>
                    <div className="flex my-4">
                        <MapPin size={30}/>
                        <p className="ml-3 text-xl font-medium">999 Lorem Ipsum road, Dolor sit Amet City</p>
                    </div>
                    
                    <button className="bg-[#0D767A] text-[#F3F3F3] rounded-lg px-4 py-2 mt-4
                    hover:bg-[#086B70] hover:text-[#BECECE]">
                        SCHEDULE APPOINTMENT
                    </button>
                    

                </div>

                <div className="h-[320] w-[480] rounded-4xl ml-4">
                    <Image src={"/landing-contact.png"} alt="Contact Details" height={320} width={480}></Image>
                </div>

            </div>

        </div>
    );
};

export default LandingPage;