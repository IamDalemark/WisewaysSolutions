export type TestimonialFormProps = {
  onSubmit: () => void;
};
export type SentTestimonialProps = {
  onSubmit: () => void;
  description: string;
};
export type TestimonialProps = {
  testimonial: string;
  name: string;
  ratings: number;
};

export type TestimonialFormData = {
  name: string;
  email: string;
  rating: number;
  testimonial: string;
};

export type FormErrors = {
  name?: string;
  email?: string;
  rating?: string;
  testimonial?: string;
};

export type SubmitTestimonialResult = {
  success: boolean;
  error?: string;
};

export interface TestimonialAdminData {
  // id: number;
  name: string;
  email: string;
  testimonial: string;
  rating: string;
  is_approved: string;
}