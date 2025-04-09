"use client";

import Image from "next/image";

interface LandingPageProps {
    heading?: string | React.ReactNode;
    title?: string | React.ReactNode;
    subtitle: string | React.ReactNode;
    imageSrc: string;
    altText: string;
    actionButton?: React.ReactNode;
  }

// notes: if you want a prop to be optional, add '?' before the parameter name (e.g 'title?: string')
// if you want to pass a class style as a prop make sure to use the quotation format:
// className={`style1 style2 style3 ${styleprop}`}

const LandingPageSection = ({ heading, title, subtitle, imageSrc, altText, actionButton }: LandingPageProps) => {
    return (
        <div id="home" className="flex-col h-screen px-[6%]">

            <div className="text-6xl font-bold text-center pt-[4%] mb-[4%]">
                {heading}
            </div>

            <div className="flex">

                <div className="text-wrap w-[50%] pr-8 content-center">
                    <div className="text-6xl font-medium leading-[1.1]">
                        {title}
                    </div>
                    <div className="text-xl mt-1.5">
                        {subtitle}
                    </div>

                    {actionButton &&
                    <div className="justify-self-center pt-4">
                            {actionButton}
                    </div>
                    }

                </div>
            
                <div> {/* 2:3 image ratio */}
                    <Image src={imageSrc} alt={altText} height={400} width={600}>
                    </Image>
                </div>

            </div>

        </div>
    );
};

export default LandingPageSection;