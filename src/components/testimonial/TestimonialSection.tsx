import { Button } from "../ui/button";
import Testimonial from "./Testimonial";
import { testimonialSample } from "@/mockData/testimonial.sample";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
const TestimonialSection = () => {
  const router = useRouter();
  const onSubmit = () => {
    router.push("/testimonial");
  };
  return (
    <div className="grid grid-rows-7 w-[90vw] justify-self-center p-4">
      <div className="row-span-2 place-content-center">
        <div className="justify-self-center text-6xl mt-5 font-medium  leading-[1.1]">
          What Our Customers Say
        </div>
        <div className="justify-self-center ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          eos optio voluptates saepe veritatis vero rerum
        </div>
      </div>
      <div className="row-span-4 grid mt-4 ">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-[90vw] max-w-[95%] md:max-w-[85%] justify-self-center z-0"
        >
          <CarouselContent>
            {testimonialSample.map((props) => (
              <CarouselItem
                key={props.id}
                className=" md:basis-1/2 lg:basis-1/3"
              >
                <Testimonial {...props} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext />
        </Carousel>
      </div>
      <div className=" justify-self-center  self-center">
        <Button
          className="bg-blue-green hover:bg-blue-green-dark"
          onClick={onSubmit}
        >
          Submit Testimonial
        </Button>
      </div>
    </div>
  );
};

export default TestimonialSection;
