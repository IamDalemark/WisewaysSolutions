"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";

type SendTestimonialProps = {
  onSubmit: () => void;
};

const SendTestimonial = ({ onSubmit }: SendTestimonialProps) => {
  const [rating, setRating] = useState(0);

  const handleRating = (index: number) => {
    setRating(index);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="bg-white p-4 justify-self-center w-[50vw] mt-5 rounded-2xl shadow-2xl">
      <div className="text-blue-green-dark text-4xl">
        Send us your Testimonial
      </div>
      <div className="text-blue-green">
        Share with us your feedback and experience
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 mt-2">
        <div>
          <div>
            <div className="text-blue-green-dark">Name</div>
            <Input placeholder="Name" />
          </div>
          <div className="mt-2">
            <div className="text-blue-green-dark">Email</div>
            <Input type="email" placeholder="Email" />
          </div>
        </div>
        <div>
          <div className="text-blue-green-dark">Rate our Services</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <Star
                key={index}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  index <= rating
                    ? "fill-blue-green stroke-blue-green"
                    : "stroke-gray-400"
                }`}
                onClick={() => handleRating(index)}
              />
            ))}
          </div>
          <div className="mt-2">
            <div className="text-blue-green-dark">Your Testimonial</div>
            <Textarea className="h-32" />
          </div>
        </div>
      </div>
      <div className="justify-self-center mt-2">
        <Button
          className="bg-blue-green hover:bg-blue-green-dark"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SendTestimonial;
