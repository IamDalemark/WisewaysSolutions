// import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ServicePage from "@/components/services/ServicePage";

const meta: Meta<typeof ServicePage> = {
  title: "Components/Services/ServicePage",
  component: ServicePage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ServicePage>;

// =====================
// HAPPY PATH STORIES
// =====================

export const AccountingAndBookkeeping: Story = {
  args: {
    title: "Accounting and Bookkeeping",
    subtitle:
      "Reliable and accurate financial management to keep your business on solid ground. Our services cover day-to-day bookkeeping, financial reporting, and compliance support, giving you clarity, confidence, and control over your numbers.",
    imageSrc: "/service-accounting.png",
    altText: "Accounting illustration",
  },
};

export const ContentCreation: Story = {
  args: {
    title: "Content Creation",
    subtitle:
      "We craft compelling content that aligns with your brand’s voice and messaging. From blog articles and video scripts to social media posts and visual storytelling, our team creates engaging, high-quality content designed to connect with your audience and drive meaningful interaction.",
    imageSrc: "/service-ccreation.png",
    altText: "Content creation illustration",
  },
};

export const CustomerSupport: Story = {
  args: {
    title: "Customer Support",
    subtitle:
      "Delivering responsive and reliable customer service across phone, live chat, and email channels. Our skilled support teams serve as the frontline of your business, resolving inquiries, addressing concerns, and ensuring a seamless customer experience that builds trust and satisfaction.",
    imageSrc: "/service-csupport.png",
    altText: "Customer support illustration",
  },
};

export const DataEntryAndProcessing: Story = {
  args: {
    title: "Data Entry and Processing",
    subtitle:
      "Accurate, efficient, and detail-oriented data management services that transform disorganized information into structured, actionable formats. Whether it's database updating, spreadsheet creation, or records maintenance, we ensure data integrity and consistency to support smarter business decisions.",
    imageSrc: "/service-dataentry.png",
    altText: "Data entry and processing illustration",
  },
};

export const DigitalMarketing: Story = {
  args: {
    title: "Digital Marketing",
    subtitle:
      "Strategic digital marketing solutions designed to amplify your brand’s visibility and drive measurable results. From search engine optimization (SEO) and social media management to targeted online advertising, we craft data-driven campaigns that attract the right audience, boost engagement, and convert clicks into customers.",
    imageSrc: "/service-marketing.png",
    altText: "Digital Marketing illustration",
  },
};

export const GraphicAndWebDesign: Story = {
  args: {
    title: "Graphic and Web Design",
    subtitle:
      "Professional design services that combine aesthetic appeal with user-focused functionality. Whether it’s branding, web interfaces, or marketing materials, we deliver visually cohesive and impactful designs that strengthen your digital presence.",
    imageSrc: "/service-graphics.png",
    altText: "Graphic and Web Design illustration",
  },
};

export const ITSupportAndHelpDesk: Story = {
  args: {
    title: "IT Support and Help Desk",
    subtitle:
      "Comprehensive remote technical support to keep your systems running smoothly. Our IT specialists handle troubleshooting, software and hardware support, network issues, and user assistance with speed and precision, minimizing downtime and ensuring your team stays productive and connected.",
    imageSrc: "/service-itsupport.png",
    altText: "IT Support illustration",
  },
};

export const RecruitmentAndHR: Story = {
  args: {
    title: "Recruitment and HR Services",
    subtitle:
      "End-to-end talent acquisition and HR support to help you build a strong, high-performing team. From crafting job descriptions and screening candidates to onboarding and HR compliance, we ensure you hire right and manage people effectively.",
    imageSrc: "/service-recruitment.png",
    altText: "Recruitment and HR illustration",
  },
};

export const SoftwareDevelopment: Story = {
  args: {
    title: "Software Development",
    subtitle:
      "Tailored software solutions to meet your unique business needs. We design and develop custom applications, websites, and platforms that are not only visually appealing but also built for performance, scalability, and real-world functionality.",
    imageSrc: "/service-software.png",
    altText: "Software development illustration",
  },
};

export const VirtualAssistance: Story = {
  args: {
    title: "Virtual Assistance",
    subtitle:
      "Providing reliable administrative support through efficient calendar management, email coordination, and task organization. Our virtual assistants help executives stay on track, optimize productivity, and focus on high-priority work, without the overwhelm.",
    imageSrc: "/service-assistant.png",
    altText: "Virtual assistance illustration",
  },
};

// =====================
// SAD PATH STORIES
// =====================

export const Sad_AccountingAndBookkeeping: Story = {
  args: {
    title: "Accounting and Bookkeeping",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken accounting image",
  },
};

export const Sad_ContentCreation: Story = {
  args: {
    title: "Content Creation",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken content image",
  },
};

export const Sad_CustomerSupport: Story = {
  args: {
    title: "Customer Support",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken customer support image",
  },
};

export const Sad_DataEntryAndProcessing: Story = {
  args: {
    title: "Data Entry and Processing",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken data entry image",
  },
};

export const Sad_DigitalMarketing: Story = {
  args: {
    title: "Digital Marketing",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken marketing image",
  },
};

export const Sad_GraphicAndWebDesign: Story = {
  args: {
    title: "Graphic and Web Design",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken design image",
  },
};

export const Sad_ITSupportAndHelpDesk: Story = {
  args: {
    title: "IT Support and Help Desk",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken IT image",
  },
};

export const Sad_RecruitmentAndHR: Story = {
  args: {
    title: "Recruitment and HR Services",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken HR image",
  },
};

export const Sad_SoftwareDevelopment: Story = {
  args: {
    title: "Software Development",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken software image",
  },
};

export const Sad_VirtualAssistance: Story = {
  args: {
    title: "Virtual Assistance",
    subtitle: "",
    imageSrc: "/invalid-image.png",
    altText: "Broken assistant image",
  },
};
