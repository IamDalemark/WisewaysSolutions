"use client";
import { useState, useEffect } from "react";
import { useCreateTestimonial } from "@/app/hooks/testimonials/useSubmitTestimonial";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import {
  TestimonialFormProps,
  TestimonialFormData,
  FormErrors,
} from "@/types/testimonials.type";
import { useUser } from "@/components/contexts/UserContext";

const TestimonialForm = ({ onSubmit }: TestimonialFormProps) => {
  const user = useUser();
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    email: "",
    rating: 0,
    testimonial: "",
  });
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.user?.user_metadata.username,
        email: user.user?.user_metadata.email,
      }));
    }
  }, [user]);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { submitTestimonial, isSubmitting } = useCreateTestimonial();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field when user starts typi  ng
    if (name in formErrors) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRating = (index: number) => {
    setFormData((prev) => ({ ...prev, rating: index }));
    if (formErrors.rating) {
      setFormErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.rating) errors.rating = "Rating is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.testimonial.trim())
      errors.testimonial = "Testimonial is required";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const result = await submitTestimonial(formData);
    if (result.success) {
      onSubmit();
    } else {
      setFormErrors({
        ...formErrors,
        testimonial: result.error || "Failed to submit. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 w-full md:w-3/4 lg:w-1/2 mx-auto mt-32 rounded-2xl shadow-2xl ">
      <div className="text-blue-green-dark text-4xl font-medium">
        Form us your Testimonial
      </div>
      <div className="text-blue-green mb-4">
        Share with us your feedback and experience
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4">
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="text-blue-green-dark block mb-1">
              Name
            </label>
            <Input
              id="name"
              name="name"
              data-testid="form-name"
              placeholder="Your name"
              value={formData.name ?? ""}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!formErrors.name}
              className={formErrors.name ? "border-red-500" : ""}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-blue-green-dark block mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              data-testid="form-email"
              placeholder="Your email"
              value={formData.email ?? ""}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!formErrors.email}
              className={formErrors.email ? "border-red-500" : ""}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <div className="text-blue-green-dark mb-1">
              Rate our Services <span className="text-red-500">*</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    index <= formData.rating
                      ? "fill-blue-green stroke-blue-green"
                      : "stroke-gray-400"
                  }`}
                  onClick={() => handleRating(index)}
                  data-testid={"form-rating-" + index.toString()}
                  role="button"
                  aria-label={`Rate ${index} star${index > 1 ? "s" : ""}`}
                />
              ))}
            </div>
            {formErrors.rating && (
              <p className="text-red-500 text-sm mt-1">{formErrors.rating}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="testimonial"
              className="text-blue-green-dark block mb-1"
            >
              Your Testimonial <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="testimonial"
              name="testimonial"
              data-testid="form-testimonial"
              className={`h-32 ${
                formErrors.testimonial ? "border-red-500" : ""
              }`}
              placeholder="Tell us about your experience..."
              value={formData.testimonial}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!formErrors.testimonial}
            />
            {formErrors.testimonial && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.testimonial}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          className="bg-blue-green hover:bg-blue-green-dark px-6"
          onClick={handleSubmit}
          disabled={isSubmitting}
          data-testid="form-button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Testimonial"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TestimonialForm;
