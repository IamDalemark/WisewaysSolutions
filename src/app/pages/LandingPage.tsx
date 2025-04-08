"use client";

import NavBar from "@/components/layout/NavBar";
import { Phone, Mail, MapPin } from "lucide-react";
import LandingPageSection from "@/components/page_sections/LandingPageSection";

const LandingPage = () => {
    return (
        <div className="bg-[#E1E1E1] text-blue-green w-full h-full pt-10 pb-30">
            <NavBar/>
            
            {/* intro section */}
            <LandingPageSection
                title="Welcome to WiseWays Solutions!"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua."
                imageSrc="/landing-page1.png"
                altText="Website Landing page"
                // bg="bg-amber-100"
            />

            {/* services section */}
            <LandingPageSection
                heading="Check out our available Services"
                title="Solutions for Your Small Business"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua."
                imageSrc="/landing-services.png"
                altText="Services"
                // bg="bg-pink-100"
                actionButton={
                    <button className="bg-blue-green text-[#F3F3F3] rounded-lg px-6 py-2
                    hover:bg-blue-green-dark hover:text-[#BECECE]">
                        VIEW SERVICES
                    </button>}
            />

            {/* about section */}
            <LandingPageSection
                heading={<p className="flex justify-center">
                    Learn More About&nbsp;<span className="text-[#FD8432] font-extrabold">Wiseways</span>
                </p>}
                subtitle={<div className="px-16 leading-9">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>}
                imageSrc="/landing-about.png"
                altText="Services"
            />

            {/* contact details section */}
            <LandingPageSection
                heading={<p className="flex justify-center">
                    CONTACT US
                </p>}
                title={<p className="text-4xl">Feel free to contact us if you any questions or concerns</p>}
                subtitle={<div className="justify-self-center">
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
                    </div>}
                imageSrc="/landing-contact.png"
                altText="Contact Us"
                actionButton={
                    <button className="inline-block h-5/8 w-48 py-1 mx-2 bg-blue-green text-[#F3F3F3] rounded-2xl leading-[1.25] 
                    hover:bg-blue-green-dark hover:text-[#BECECE]">
                        <p>SCHEDULE <br /> APPOINTMENT</p>
                    </button>}
            />

        </div>
    );
};

export default LandingPage;