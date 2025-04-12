import { Star, CircleUserRound } from "lucide-react";
import { TestimonialProps } from "@/types/testimonials.type";

const Testimonial = ({ testimonial, name, ratings }: TestimonialProps) => {
  return (
    <div className="grid grid-rows-7 w-[60vw] md:w-[40vw] lg:w-[20vw] h-[60vh] border-[#FD8432] border p-4 rounded-2xl sm:m-2 justify-self-center mt-10 ">
      <div className="row-span-5 mt-1">{testimonial}</div>
      <div className="row-span-2 grid grid-cols-4 mt-2 ">
        <div>
          <CircleUserRound size={65} />
        </div>
        <div className="col-span-3 grid-rows-2 ml-4">
          <div className="mt-1">{name}</div>
          <div className=" flex">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={
                  i < ratings
                    ? "fill-blue-green stroke-blue-green"
                    : "stroke-blue-green"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
