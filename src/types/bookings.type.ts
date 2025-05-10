export type Booking = {
  booking_id: string | null;
  invitee_id: string | null;
  name: string | null;
  email: string | null;
  service: string | null;
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
  user_id: string;
  booking_id: string | undefined;
  invitee_id: string | undefined;
  name: string;
  email: string;
  service?: string;
};

export type SubmitBookingResult = {
  success: boolean;
  error?: string;
};

export type GetBookingResult = {
  data?: Booking;
  success: boolean;
  error?: string;
};

export interface BookingAdminData {
  booking_id: string;
  invitee_id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  created_at: string;
  managed_by: string;
}