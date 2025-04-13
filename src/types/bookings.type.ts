export type Booking = {
  name: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  date: string | null;
  time: string | null;
};

export type BookingDateTime = {
  date: string;
  time: string;
};

export type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  service: string;
};
