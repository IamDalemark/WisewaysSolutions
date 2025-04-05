"use client";
import { useState } from "react";
import SendTestimonial from "../../components/testimonial/SendTestimonial";
import SentTestimonial from "@/components/testimonial/SentTestimonial";
import { useRouter } from "next/navigation";
const Testimonial = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleBackToHome = () => {
    router.push("/");
  };
  return (
    <div className="bg-gray-white h-[100vh] w-full ">
      nav bar goes here
      {isSubmitted ? (
        <SentTestimonial onSubmit={handleBackToHome} />
      ) : (
        <SendTestimonial onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Testimonial;
