export type Booking = {
  booking_id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  date: string;
  time: string;
  invitee_id: string;
  managed_by: string | null;
  created_at: string;
};

export type CalendlyInvitee = {
  uri: string;
  email: string;
  name: string;
  status: string;
  has_no_show?: boolean;
  canceled?: boolean;
};

export type CalendlyEvent = {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  event_type: string;
  location?: {
    type: string;
    location?: string;
    join_url?: string;
    status?: string;
  };
  cancellation?: {
    canceled_by: string;
    reason: string;
    canceler_type: string;
    created_at: string;
  };
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
  rescheduled: boolean;
  created_at: string;
  updated_at: string;
  event_memberships: Array<{
    user: string;
  }>;
  event_guests: Array<{
    email: string;
    name?: string;
  }>;
  meeting_notes_html: string | null;
  meeting_notes_plain: string | null;
  invitees?: CalendlyInvitee[];
  associated_booking?: Booking | null;
};

export type PaginationData = {
  count: number;
  next_page: string | null;
  previous_page: string | null;
  next_page_token: string | null;
  previous_page_token: string | null;
};

export type CalendlyResponse = {
  collection?: CalendlyEvent[];
  pagination?: PaginationData;
  data?: {
    collection?: CalendlyEvent[];
    pagination?: PaginationData;
  };
};
