import type { Meta, StoryObj } from "@storybook/react";
import LandingPageSection from "@/components/landing/LandingPageSection";
import AppointmentButton from "@/components/navbar/AppointmentButton";
import ContactDetail from "@/components/landing/ContactDetail";

const meta: Meta<typeof LandingPageSection> = {
  title: "Components/LandingPage/LandingPageSection",
  component: LandingPageSection,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LandingPageSection>;

export const Intro: Story = {
  args: {
    id: "intro",
    heading: "Wiseways Solutions",
    title: "Shaping the Future, Not Just Adapting to It",
    subtitle:
      "At Wiseways, we believe in progress with purpose. We don’t just adapt to the digital world, we help shape it. Our team combines innovation, strategy, and emerging tech to create smarter ways of working and growing. From streamlining everyday tasks to building future-ready solutions, we help businesses stay ahead faster, leaner, and more agile. Change doesn’t have to be overwhelming. With the right partner, it becomes opportunity. Let’s build what’s next, together.",
    imageSrc: "/landing-page1.png",
    altText: "Website Landing page",
    headingClassName: "text-5xl",
    titleClassName: "text-4xl lg:text-5xl font-semibold",
  },
};

export const Services: Story = {
  args: {
    id: "services",
    heading: "Smart Services & Scalable Solutions to Power Your Business",
    title: "From Strategy to Execution",
    subtitle:
      "We offer intelligent, tech-driven services designed to evolve with your business. Whether you're streamlining operations, enhancing customer experiences, or exploring AI-powered innovations, our scalable solutions are built to grow with you. We don’t do one-size-fits-all, we build what fits you best, so you can stay agile, competitive, and ready for what’s next.",
    imageSrc: "/landing-services.png",
    altText: "Services",
    titleClassName: "text-4xl lg:text-5xl font-semibold",
  },
};

export const About: Story = {
  args: {
    id: "about",
    heading: (
      <p className="flex flex-wrap justify-center">
        Learn More About
        <span className="text-[#FD8432] font-extrabold ml-3">Wiseways</span>
      </p>
    ),
    subtitle:
      "Wiseways isn’t just a service provider, we’re your growth partner. We’re the go-to team for businesses that want to run leaner, scale faster, and keep up with the speed of change without getting buried in the day-to-day. Whether you need help with admin tasks, tech support, digital marketing, or full-scale systems solutions, we bring the tools, talent, and tech to make it happen. Think of us as your behind-the-scenes team, solving problems, streamlining operations, and freeing you up to focus on the big stuff. From small tasks to serious transformation, We're here to simplify, support, and supercharge your ",
    imageSrc: "/landing-about.png",
    altText: "About Us",
    subTitleClassName: "lg:px-[5%] lg:leading-9 text-lg lg:text-xl",
  },
};

export const Contact: Story = {
  args: {
    id: "contact",
    heading: "CONTACT US",
    title: "Feel free to connect with us if you have any questions or concerns",
    subtitle: (
      <ul className="justify-self-center">
        <ContactDetail iconName="Phone" description="(63) 976-249-3136" />
        <ContactDetail iconName="Mail" description="info@wisewayssolutions.us" />
        <ContactDetail iconName="MapPin" description="Iloilo City, Philippines" />
      </ul>
    ),
    imageSrc: "/landing-contact.png",
    altText: "Contact Us",
    titleClassName: "text-2xl md:text-3xl lg:text-4xl font-medium",
    actionButton: (
      <AppointmentButton onHandleScheduleAppointment={() => alert("Schedule Appointment")} />
    ),
  },
};
