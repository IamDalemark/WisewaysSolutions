import { Button } from "../ui/button";
import Testimonial from "./Testimonial";
const TestimonialSection = () => {
  return (
    <div className="grid grid-rows-7 w-[100vw] h-[100vh p-4">
      <div className="row-span-2 place-content-center">
        <div className="justify-self-center text-6xl mt-5 font-medium  leading-[1.1]">
          What Our Customers Say
        </div>
        <div className="justify-self-center ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          eos optio voluptates saepe veritatis vero rerum
        </div>
      </div>
      <div className="row-span-4">
        <Testimonial />
      </div>
      <div className=" justify-self-center  self-center">
        <Button className="bg-blue-green hover:bg-blue-green-dark">
          Submit Testimonial
        </Button>
      </div>
    </div>
  );
};

export default TestimonialSection;
