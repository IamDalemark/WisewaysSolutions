import { Button } from "../ui/button";
import Testimonial from "../testimonial/Testimonial";
import { useAcceptedTestimonials } from "@/app/hooks/testimonials/useGetAcceptedTestimonial";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const TestimonialSection = () => {
  const router = useRouter();
  const { testimonials, loading } = useAcceptedTestimonials();

  const onSubmit = () => {
    router.push("/testimonial");
  };

  return (
    <div id="testimonial" className="w-[90vw] justify-self-center p-4 z-0">
      <div className="place-content-center md:pb-12">
        <div className="justify-self-center text-center text-5xl lg:text-6xl font-bold leading-[1.1]">
          What Our Customers Say
        </div>
        <div className="justify-self-center text-xl lg:text-2xl px-4 py-8">
          {loading
            ? "Loading testimonials..."
            : testimonials.length > 0
            ? "Discover how our tailored solutions have empowered clients to streamline operations and drive success."
            : "No testimonials available yet"}
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin w-10 h-10 text-blue-green" />
          </div>
        ) : (
          <>
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-[90vw] max-w-[95%] md:max-w-[85%] justify-self-center "
            >
              <CarouselContent>
                {testimonials.map((props) => (
                  <CarouselItem
                    key={props.testimonial_id}
                    className="md:basis-2/3 lg:basis-1/3 pb-16"
                  >
                    <Testimonial {...props} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {testimonials.length >= 4 || window.outerWidth <= 720 ? (
                <>
                  <CarouselPrevious className="top-1/2 -translate-y-1/2 left-2 sm:-left-5 md:-left-5" />
                  <CarouselNext className="top-1/2 -translate-y-1/2 right-2 sm:right-0 md:-right-5" />
                </>
              ) : (
                <></>
              )}
            </Carousel>
            <div className="justify-self-center self-center mt-8 md:mt-10">
              <Button
                data-cy="testimonial-section-submit"
                className="bg-blue-green hover:bg-blue-green-dark mb-28 text-xl p-6 rounded-xl
                hover:scale-103 transition-all cursor-pointer"
                onClick={onSubmit}
              >
                Submit Testimonial
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialSection;
