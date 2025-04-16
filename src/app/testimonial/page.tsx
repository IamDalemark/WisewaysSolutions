"use client";
import { useState } from "react";
import SendTestimonial from "../../components/testimonial/SendTestimonial";
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
    router.push("/");
  };
  return (
    <div className="bg-gray-white h-screen w-full   ">
      <NavBar />
      {isSubmitted ? (
        <SentTestimonial onSubmit={handleBackToHome} />
      ) : (
        <SendTestimonial onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Testimonial;
