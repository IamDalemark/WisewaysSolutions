"use client";
import { Button } from "../ui/button";
import { SentTestimonialProps } from "@/types/testimonials.type";

const SentTestimonial = ({ onSubmit }: SentTestimonialProps) => {
  const handleSubmit = () => {
    onSubmit();
  };
  return (
    <div className="bg-white p-4 md:p-6 w-full md:w-3/4 lg:w-1/2 mx-auto mt-32 rounded-2xl shadow-2xl  ">
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
