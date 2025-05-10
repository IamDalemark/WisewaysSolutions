import React from "react";
import CalendlyInlineWidget from "../calendly/InlineWidget";

interface ScheduledBookingProps {
  invitee_id: string | null;
  onHandleReschedule: () => void;
  onHandleCancellation: () => void;
}

const ScheduledBooking = ({
  invitee_id,
  onHandleReschedule,
  onHandleCancellation,
}: ScheduledBookingProps) => {
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
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center text-center space-y-4 mt-32 mb-6">
        <h1 className="text-lg font-bold text-gray-800">
          Do you want to make some changes?
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white lg:w-36 rounded-2xl shadow transition-all duration-200"
            onClick={onHandleReschedule}
          >
            Reschedule
          </button>
          <button
            className="px-6 py-2 bg-red-500 hover:bg-red-800 text-white lg:w-36 rounded-2xl shadow transition-all duration-200"
            onClick={onHandleCancellation}
          >
            Cancel
          </button>
        </div>
      </div>
      <CalendlyInlineWidget
        data_url={`https://calendly.com/${process.env
          .NEXT_PUBLIC_CALENDLY_EMAIL!}/30min/invitees/${invitee_id}`}
      />
    </div>
  );
};

export default ScheduledBooking;
