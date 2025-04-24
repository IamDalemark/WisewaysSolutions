"use client";
import { useState } from "react";
import SendTestimonial from "../../components/testimonial/TestimonialForm";
import SentTestimonial from "@/components/testimonial/SentTestimonial";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar/NavBar";
const Testimonial = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleBackToHome = () => {
    router.back();
  };
  return (
    <div className="bg-gray-white h-screen w-full overflow-auto  ">
      <NavBar />
      {isSubmitted ? (
        <SentTestimonial
          onSubmit={handleBackToHome}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, hic dicta temporibus nesciunt dolor molestiae et iste praesentium impedit unde velit asperiores minus fuga corrupti necessitatibus officiis rem repellat expedita!"
        />
      ) : (
        <SendTestimonial onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Testimonial;
