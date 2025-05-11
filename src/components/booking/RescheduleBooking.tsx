import React from "react";
import CalendlyInlineWidget from "../calendly/InlineWidget";

interface RescheduleBookingProps {
  invitee_id: string | null;
  onHandleReturn: () => void;
}

const RescheduleBooking = ({
  invitee_id,
  onHandleReturn,
}: RescheduleBookingProps) => {
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
    <div className="w-full mx-auto overflow-hidden mt-32 flex flex-col lg:flex-row px-4 justify-center">
      <div className="flex flex-col justify-center items-center w-full lg:w-[200px] mb-32 text-center space-y-4">
        <div>
          <p className="text-lg text-gray-800 font-medium">
            Do you want to keep your current schedule?
          </p>
          <button
            className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-xl shadow transition"
            onClick={onHandleReturn}
          >
            Cancel Reschedule
          </button>
        </div>
        <div>
          * Note: If the page shows the event is cancelled, that means the admin
          has not yet checked your rescheduling.
        </div>
      </div>
      <CalendlyInlineWidget
        data_url={`https://calendly.com/reschedulings/${invitee_id}`}
        height={"700px"}
        marginTop={"-2rem"}
        maxWidth={"1080px"}
      />
    </div>
  );
};

export default RescheduleBooking;
