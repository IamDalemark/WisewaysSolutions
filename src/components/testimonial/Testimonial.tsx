import { Star, CircleUserRound } from "lucide-react";
export type TestimonialProps = {
  description: string;
  name: string;
  ratings: number;
};
const Testimonial = ({ description, name, ratings }: TestimonialProps) => {
  return (
    <div className="grid grid-rows-7 w-[20vw] h-[60vh] border-[#FD8432] border p-4 rounded-2xl m-2">
      <div className="row-span-5 mt-1">{description}</div>
      <div className="row-span-2 grid grid-cols-4 mt-2 ">
        <div>
          <CircleUserRound size={65} />
        </div>
        <div className="col-span-3 grid-rows-2 ml-3">
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
