"use client";

import { useEffect } from "react";
import LandingPageSection from "@/components/landing/LandingPageSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
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
        }, 300);
      }
    }
    sessionStorage.removeItem("scrollTarget");
  }, []);

  return (
    //    sm:bg-fuchsia-200 md:bg-amber-200 lg:bg-blue-200 xl:bg-green-300
    <main className="bg-[#E3E3E3]
    sm:bg-fuchsia-200 md:bg-amber-200 lg:bg-blue-200 xl:bg-green-300
    text-blue-green w-full h-full pt-36 lg:pt-32 static">

      {/* intro section */}
      <LandingPageSection
        id="intro"
        title="Welcome to WiseWays Solutions!"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua."
        imageSrc="/landing-page1.png"
        altText="Website Landing page"
        titleClassName="text-5xl lg:text-6xl font-bold"
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
      />

      {/* about section */}
      <LandingPageSection
        id="about"
        heading={
          <p className="flex flex-wrap justify-center">
            {" "}
            Learn More About
            <span className="text-[#FD8432] font-extrabold ml-3">Wiseways</span>{" "}
          </p>
        }
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident."
        imageSrc="/landing-about.png"
        altText="About Us"
        subTitleClassName="lg:px-[5%] leading-7 lg:leading-9"
      />
      
      {/* testimonial section */}
      <TestimonialSection />

      {/* contact details section */}
      <LandingPageSection
        id="contact"
        heading="CONTACT US"
        title="Feel free to connect with us if you have any questions or concerns"
        subtitle={
          <ul className="justify-self-center text-lg">
            <ContactDetail iconName="Phone" description="(63) 000-000-0000" />
            <ContactDetail iconName="Mail" description="loremisum@gmail.com" />
            <ContactDetail iconName="MapPin" description="999 Lorem Ipsum road, Dolor sit Amet City"/>
          </ul>
        }
        imageSrc="/landing-contact.png"
        altText="Contact Us"
        actionButton={
          <AppointmentButton/>
        }
        titleClassName="text-2xl md:text-3xl lg:text-4xl font-medium"
      />

    </main>
  );
};

export default LandingPage;
