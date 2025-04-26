"use client";

import Image from "next/image";

interface LandingPageProps {
    id: string;
    heading?: string | React.ReactNode;
    title?: string | React.ReactNode;
    titleSize?: string;
    subtitle?: string | React.ReactNode;
    imageSrc: string;
    altText: string;
    actionButton?: React.ReactNode;
  }

// notes: if you want a prop to be optional, add '?' before the parameter name (e.g 'title?: string')
// if you want to pass a class style as a prop make sure to use the quotation format:
// className={`style1 style2 style3 ${styleprop}`}

const LandingPageSection = ({ id, heading, title, subtitle, imageSrc, altText, actionButton }: LandingPageProps) => {
    return (
        <div id={id} className="text-blue-green flex-col h-full sm:content-center lg:max-h-screen mx-[6%] pb-[20%]">

            <div className="flex text-5xl lg:text-6xl font-bold text-center justify-self-center mb-[3%]">
                {heading}
            </div>

            <div className="md:flex pt-4 items-center">

                <div className="sm:w-[100%] md:w-[50%] text-wrap px-4 content-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl text-center font-medium leading-[1.1] pb-4">
                        {title}
                    </div>
                    <div className="text-md text-left lg:text-xl mb-[8%]">
                        {subtitle}
                    </div>

                    {actionButton &&
                    <div className="justify-self-center justify-items-center mb-8">
                            {actionButton}
                    </div>
                    }

                </div>
            
                <div className="justify-self-center self-center w-[90%] md:w-[50%]"> {/* 2:3 image ratio */}
                    <Image src={imageSrc} alt={altText} height={400} width={600}>
                    </Image>
                </div>

            </div>

        </div>
    );
};

export default LandingPageSection;