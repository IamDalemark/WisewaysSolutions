import React from "react";
import CalendlyInlineWidget from "../calendly/InlineWidget";

interface ScheduledBookingProps {
  invitee_id: string | null;
}

const ScheduledBooking = ({ invitee_id }: ScheduledBookingProps) => {
  if (!invitee_id) {
    return (
      <div className="w-full mx-auto h-full">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          No Scheduled Booking Found.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto h-full">
      <CalendlyInlineWidget
        data_url={`https://calendly.com/francyamada1983/30min/invitees/${invitee_id}`}
      />
    </div>
  );
};

export default ScheduledBooking;
