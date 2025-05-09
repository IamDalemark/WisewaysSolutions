export type Booking = {
  name: string | null;
  email: string | null;
  service: string | null;
  date: Date | null;
  time: string | null;
};

export type BookingDateTime = {
  date: Date;
  time: string;
};

export type BookingDetails = {
  name: string;
  email: string;
  service: string;
};

export type BookingFormData = {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
};

export type SubmitBookingResult = {
  success: boolean;
  error?: string;
};
