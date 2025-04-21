import { Button } from "../ui/button";
import Testimonial from "../testimonial/Testimonial";
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
    <div id="testimonial" className="grid grid-rows-6  w-[90vw] justify-self-center p-4 z-0">
      <div className="row-span-2 place-content-center">
        <div className="justify-self-center text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
          What Our Customers Say
        </div>
        <div className="justify-self-center text-md lg:text-xl  p-4 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          eos optio voluptates saepe veritatis vero rerum
        </div>
      </div>
      <div className="row-span-4 grid">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-[90vw] max-w-[95%] md:max-w-[85%] justify-self-center "
        >
          <CarouselContent>
            {testimonialSample.map((props) => (
              <CarouselItem
                key={props.id}
                className=" md:basis-2/3 lg:basis-1/3"
              >
                <Testimonial {...props} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" top-1/2 -translate-y-1/2 left-2 sm:-left-5 md:-left-5" />
          <CarouselNext className="top-1/2 -translate-y-1/2 right-2 sm:right-0 md:-right-5" />
        </Carousel>
        <div className=" justify-self-center self-center mt-4 md:mt-10">
          <Button
            className="bg-blue-green hover:bg-blue-green-dark mb-28 "
            onClick={onSubmit}
          >
            Submit Testimonial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
