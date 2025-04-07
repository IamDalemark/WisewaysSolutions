import { Star, CircleUserRound } from "lucide-react";

const Testimonial = () => {
  return (
    <div className="grid grid-rows-7 w-[20vw] h-[60vh] border-[#FD8432] border p-4 rounded-2xl m-2">
      <div className="row-span-5 mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam error
        earum ad quas, quod nemo molestiae cumque autem iure! Laudantium a iure
        consectetur aliquid modi ut accusamus fugit rem similique!
      </div>
      <div className="row-span-2 grid grid-cols-4 mt-2 ">
        <div>
          <CircleUserRound size={65} />
        </div>
        <div className="col-span-3 grid-rows-2 ml-3">
          <div className="mt-1">John Bartholomew</div>
          <div className=" flex">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="fill-blue-green stroke-blue-green" />
              ))}
            <Star />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
