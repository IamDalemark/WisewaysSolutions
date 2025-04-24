// import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LandingPageSection from "@/components/landing/LandingPageSection";
// import { Button } from "@/components/ui/button";



const meta: Meta<typeof LandingPageSection> = {
  title: "Components/LandingPageSection",
  component: LandingPageSection,
  tags: ["autodocs"],
  args: {
    id: "section1",
    heading: "This is your heading",
    title: "Add title",
    subtitle: "subtitle add here",
    imageSrc: "/landing-page1.png",
    altText: "Landing Page section",
  },
};

export default meta;

type Story = StoryObj<typeof LandingPageSection>;

export const Basic: Story = {};

export const IntroSection: Story = {
  args: {
    id: "intro",
    heading: null,
    title: "Welcome to WiseWays Solutions!",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod,tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "/landing-page1.png",
    altText: "Website Landing page",
  },
};

export const ServicesSection: Story = {
  args: {
    id:"services",
    heading:"Check out our available Services",
    title:"Solutions for Your Small Business",
    subtitle:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc:"/landing-services.png",
    altText:"Services"
  },
};

export const AboutSection: Story = {
  args: {
    id:"about",
    heading: "Learn More About Wiseways",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do,eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageSrc: "/landing-about.png",
    altText: "About Us"
  },
};


export const OnlyImageAndAlt: Story = {
  args: {
    heading: undefined,
    title: undefined,
    subtitle: undefined,
    actionButton: undefined,
  },
};
