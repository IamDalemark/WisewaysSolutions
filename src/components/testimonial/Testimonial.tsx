import { Star, CircleUserRound } from "lucide-react";
import { TestimonialProps } from "@/types/testimonials.type";

const Testimonial = ({ testimonial, name, ratings }: TestimonialProps) => {
  return (
    <div className="grid grid-rows-7 min-h-56 w-[60vw] md:w-[40vw] lg:w-[20vw] h-[60vh] border-[#FD8432] border p-4 rounded-2xl sm:m-2 justify-self-center mt-10  text-blue-green">
      <div className="row-span-5 mt-1 overflow-y-auto pr-2">{testimonial}</div>
      <div className="row-span-2 grid grid-cols-4 mt-2 ">
        <div className="">
          <CircleUserRound className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
        </div>
        <div className="col-span-3 grid-rows-2 ml-4">
          <div className="mt-1 truncate">{name}</div>
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
