"use client";
import { useState } from "react";
import SendTestimonial from "../../components/testimonial/TestimonialForm";
import SentTestimonial from "@/components/testimonial/SentTestimonial";
import { useRouter } from "next/navigation";

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
      {isSubmitted ? (
        <SentTestimonial
          onSubmit={handleBackToHome}
          description="Your testimonial has been submitted successfully. Thank you for your feedback!"
        />
      ) : (
        <SendTestimonial onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Testimonial;
