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

export interface BookingFormData {
  booking_id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: string;
  created_at: string;
  managed_by: string;
};

export type SubmitBookingResult = {
  success: boolean;
  error?: string;
};
