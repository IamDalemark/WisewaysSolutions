"use client";
import { Button } from "../ui/button";
import { SentTestimonialProps } from "@/types/testimonials.type";

const SentTestimonial = ({ onSubmit }: SentTestimonialProps) => {
  const handleSubmit = () => {
    onSubmit();
  };
  return (
    <div className="justify-self-center w-[50vw] mt-12 rounded-2xl shadow-2xl p-4 bg-white ">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="text-blue-green-dark text-4xl font-medium">
            Testimonial submitted!
          </div>
          <div className="text-blue-green">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque qui
            tenetur voluptates itaque temporibus quasi
          </div>
          <Button
            className="mt-10 bg-blue-green hover:bg-blue-green-dark sm:mb-3"
            onClick={handleSubmit}
          >
            Back to Homepage
          </Button>
        </div>

        <div className="place-content-center ">
          <div className="justify-self-center">Image</div>
        </div>
      </div>
    </div>
  );
};

export default SentTestimonial;
