export type SentTestimonialProps = {
  onSubmit: () => void;
  description: string;
};
export type TestimonialProps = {
  testimonial: string;
  name: string;
  rating: number;
  title: string;
};

export type TestimonialFormData = {
  name: string;
  email: string;
  rating: number;
  testimonial: string;
  title: string;
};

export type FormErrors = {
  name?: string;
  email?: string;
  rating?: string;
  testimonial?: string;
  title?: string;
};

export type SubmitTestimonialResult = {
  success: boolean;
  error?: string;
};

export interface TestimonialAdminData {
  testimonial_id: string;
  name: string;
  email: string;
  testimonial: string;
  rating: string;
  is_approved: string;
}

export interface Testimonial {
  testimonial_id: string;
  name: string;
  email: string;
  rating: number;
  testimonial: string;
  is_approved: string;
  created_at?: string;
  title: string;
  submitted_at?: string;
}
