"use client";

import { useEffect } from "react";
import LandingPageSection from "@/components/landing/LandingPageSection";
import TestimonialSection from "@/components/page_sections/TestimonialSection";
import ContactDetail from "@/components/landing/ContactDetail";
import AppointmentButton from "@/components/navbar/AppointmentButton";

const LandingPage = () => {
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("scrollTarget");

    if (scrollTarget) {
      const target = document.getElementById(scrollTarget);

      if (target) {
        setTimeout(() => {
          const yOffset = -120;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth"});
          sessionStorage.removeItem("scrollTarget");
        }, 300);
      }
    }
  }, []);

  return (
    //    sm:bg-fuchsia-200 md:bg-amber-200 lg:bg-blue-200 xl:bg-green-300
    <div className="bg-[#E3E3E3]
    text-blue-green w-full h-full pt-32 lg:pt-24 static">

      {/* intro section */}
      <LandingPageSection
        id="intro"
        title={<p className="text-5xl lg:text-6xl font-bold">Welcome to WiseWays Solutions!</p>}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua."
        imageSrc="/landing-page1.png"
        altText="Website Landing page"
      />

      {/* services section */}
      <LandingPageSection
        id="services"
        heading="Check out our available Services"
        title="Solutions for Your Small Business"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua."
        imageSrc="/landing-services.png"
        altText="Services"
        actionButton={
          <button
            className="bg-blue-green text-[#F3F3F3] rounded-lg px-8 py-2
                    hover:bg-blue-green-dark hover:text-[#BECECE] cursor-pointer"
          >
            VIEW SERVICES
          </button>
        }
      />

      {/* about section */}
      <LandingPageSection
        id="about"
        heading={
          <p>
            {" "}
            Learn More About&nbsp;
            <span className="text-[#FD8432] font-extrabold">Wiseways</span>{" "}
          </p>
        }
        subtitle={
          <div className="lg:px-[5%] leading-7 lg:leading-9">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident.
          </div>
        }
        imageSrc="/landing-about.png"
        altText="About Us"
      />
      
      {/* testimonial section */}
      <TestimonialSection />

      {/* contact details section */}
      <LandingPageSection
        id="contact"
        heading="CONTACT US"
        title={
          <p className="text-2xl md:text-3xl lg:text-4xl">
            {" "}Feel free to connect with us if you have any questions or concerns{" "}
          </p>
        }
        subtitle={
          <div className="justify-self-center text-lg">
            <ContactDetail iconName="Phone" description="(63) 000-000-0000" />
            <ContactDetail iconName="Mail" description="loremisum@gmail.com" />
            <ContactDetail iconName="MapPin" description="999 Lorem Ipsum road, Dolor sit Amet City"/>
          </div>
        }
        imageSrc="/landing-contact.png"
        altText="Contact Us"
        actionButton={
          <AppointmentButton/>
        }
      />

    </div>
  );
};

export default LandingPage;
