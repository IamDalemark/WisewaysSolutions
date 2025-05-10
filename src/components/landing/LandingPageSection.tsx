"use client";

import Image from "next/image";

interface LandingPageSectionProps {
  id: string;
  heading?: string | React.ReactNode;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  imageSrc: string;
  altText: string;
  actionButton?: React.ReactNode;
  headingClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

const LandingPageSection = ({
  id,
  heading,
  title,
  subtitle,
  imageSrc,
  altText,
  actionButton,
  headingClassName,
  titleClassName,
  subTitleClassName,
}: LandingPageSectionProps) => {
  return (
    <section
      id={id}
      className="text-blue-green flex-col h-full sm:content-center lg:max-h-screen mx-[6%] pb-[150]"
    >
      {heading && (
        <h2 className={`${headingClassName || "text-4xl pb-10"} flex lg:text-6xl font-bold text-center justify-self-center`}>
          {heading}
        </h2>
      )}

      <div
        className="flex flex-col md:flex-row items-center"
      >
        {/* Text Section */}
        <div className="w-full md:w-[50%] px-6">
          {title && (
            <h3
              className={`${titleClassName || "text-3xl sm:text-4xl lg:text-5xl"} text-center leading-[1.1] pb-4`}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <h5
              className={`${subTitleClassName} text-base lg:text-lg text-left mb-[8%] break-words leading-7`}
            >
              {subtitle}
            </h5>
          )}
          {actionButton && (
            <div className="flex justify-center mb-8 md:hidden">
              {actionButton}
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[50%] justify-self-center self-center mt-10 lg:mt-0">
          {/* 2:3 image ratio */}
          <Image
            src={imageSrc}
            alt={altText}
            height={350}
            width={525}
            className="object-contain max-w-full h-auto justify-self-center"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPageSection;
