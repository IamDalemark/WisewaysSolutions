import React, { useEffect, useRef, useState } from "react";

import { useSubmitBooking } from "@/app/hooks/bookings/useSubmitBooking";
import CalendlyInlineWidget from "../calendly/InlineWidget";
import { Loader2 } from "lucide-react";
import { useModal } from "../contexts/ModalContext";

export interface CalendlySchedulerProps {
  user_id: string;
  name: string;
  email: string;
  onSubmit: () => void;
}

const CalendlyScheduler = ({
  user_id,
  name,
  email,
  onSubmit,
}: CalendlySchedulerProps) => {
  const hasSubmittedRef = useRef(false);
  const { submitBooking, isSubmitting } = useSubmitBooking();
  const { fromService } = useModal();
  const [service, setService] = useState("Any");

  // Set up event listener for Calendly events
  useEffect(() => {
    setService(fromService);

    // Set up event listener for Calendly events
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (isCalendlyEvent(e)) {
        if (isCalendlyEventScheduled(e)) {
          console.log("Event scheduled! URI: ", e.data.payload.event.uri);
          console.log("Invitee URI: ", e.data.payload.invitee.uri);
          createBooking(e.data.payload.event.uri, e.data.payload.invitee.uri);
        }
      }
    };

    window.addEventListener("message", handleCalendlyMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCalendlyEvent = (e: MessageEvent) => {
    return (
      e.origin === "https://calendly.com" &&
      e.data.event?.startsWith("calendly.")
    );
  };

  const isCalendlyEventScheduled = (e: MessageEvent) => {
    return e.data.event?.endsWith("event_scheduled");
  };

  const createBooking = async (booking_uri: string, invitee_uri: string) => {
    if (hasSubmittedRef.current) return; // prevent duplicate submission
    hasSubmittedRef.current = true;

    const booking_id = booking_uri.split("/").pop();
    const invitee_id = invitee_uri.split("/").pop();
    console.log("Booking ID: ", booking_id);
    console.log({
      user_id,
      booking_id,
      invitee_id,
      name,
      email,
      service,
    });

    const result = await submitBooking({
      user_id,
      booking_id,
      invitee_id,
      name,
      email,
      service,
    });

    if (result.success) {
      onSubmit();
    } else {
      console.log(result.error);
      hasSubmittedRef.current = false;
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E1E1E1] px-4">
        <Loader2 className="w-10 h-10 text-gray-600 animate-spin mb-4" />
        <p className="text-gray-700 text-base md:text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto h-full">
      <CalendlyInlineWidget
        data_url={`https://calendly.com/${process.env
          .NEXT_PUBLIC_CALENDLY_EMAIL!}/30min?back=1&hide_gdpr_banner=1&name=${name}&email=${email}&a1=${service}`}
      />
    </div>
  );
};

export default CalendlyScheduler;
