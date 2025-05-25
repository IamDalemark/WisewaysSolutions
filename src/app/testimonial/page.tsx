"use client";
import { useState, useEffect } from "react";
import TestimonialForm from "../../components/testimonial/TestimonialForm";
import SentTestimonial from "@/components/testimonial/SentTestimonial";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/contexts/UserContext";
const Testimonial = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  const user = useUser();
  const [userName, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.user?.user_metadata.username ?? "");
      setUserEmail(user.user?.user_metadata.email ?? "");
    }
  }, [user]);
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
        <TestimonialForm
          onSubmit={handleSubmit}
          userName={userName}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default Testimonial;
