import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
const SendTestimonial = () => {
  return (
    <div className="bg-white p-4 justify-self-center w-[50vw] mt-5 rounded-2xl shadow-2xl">
      <div className="text-blue-green-dark text-4xl">
        {" "}
        Send us your Testimonial
      </div>
      <div className="text-blue-green">
        Share to us your feedback and experience
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 mt-2">
        <div>
          <div>
            <div className="text-blue-green-dark">Name</div>
            <div>
              <Input placeholder="Name"></Input>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-blue-green-dark">Email</div>
            <div>
              <Input type="Email" placeholder="Email"></Input>
            </div>
          </div>
        </div>
        <div>
          <div className="text-blue-green-dark">Rate our Services</div>
          <div className="text-blue-green-dark">★★★★☆</div>
          <div>
            <div className="text-blue-green-dark">Your Testimonial</div>
            <Textarea className="h-32" />
          </div>
        </div>
      </div>
      <div className="justify-self-center mt-2">
        <Button className="bg-blue-green hover:bg-blue-green-dark">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SendTestimonial;
