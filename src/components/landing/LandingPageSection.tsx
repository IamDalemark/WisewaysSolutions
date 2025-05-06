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
    titleClassName,
    subTitleClassName
    }: LandingPageSectionProps) => {
    return (
        <section 
            id={id} 
            className="text-blue-green flex-col h-full sm:content-center lg:max-h-screen mx-[6%] pb-[150]"
        >
            {heading && (
                <h2 className="flex text-5xl lg:text-6xl font-bold text-center justify-self-center">
                    {heading}
                </h2>
            )}

            <div className="flex flex-col md:flex-row pt-10 items-center">
                {/* Text Section */}
                <div className="w-full md:w-[50%] px-4">
                    {title && (
                        <h3 className={`${titleClassName || "text-3xl sm:text-4xl lg:text-5xl font-medium"} text-center leading-[1.1] pb-4`}>
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <h5 className={`${subTitleClassName} text-md lg:text-xl text-left mb-[8%] break-words`}>
                            {subtitle}
                        </h5>
                    )}
                    {actionButton &&
                        <div className="flex justify-center mb-8 md:hidden">
                            {actionButton}
                        </div>
                    }
                </div>

                {/* Image Section */}
                <div className="w-full md:w-[50%] justify-self-center self-center"> {/* 2:3 image ratio */}
                    <Image 
                        src={imageSrc} 
                        alt={altText} 
                        height={400} 
                        width={600} 
                        className="object-contain max-w-full h-auto justify-self-center" 
                    />
                </div>

            </div>

        </section>
    );
};

export default LandingPageSection;