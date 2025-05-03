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
  clientName: string;
  email: string;
  review: string;
  rating: number;
  status: string;

  [key: string]: string | number;
}