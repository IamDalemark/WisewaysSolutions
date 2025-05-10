import React from "react";
import CalendarComponent from "./Calendar";

interface BookingPageLandingProps {
  onStartBookingProcess: () => void;
}

const BookingPageLanding = ({
  onStartBookingProcess,
}: BookingPageLandingProps) => {
  const currentDate = new Date();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-8">
      <div className="flex flex-col md:flex-row items-start justify-center gap-5 max-w-7xl w-full">
        <div className="flex flex-col max-w-xl w-full gap-6 mt-4">
          <div className="text-base flex flex-col gap-3 mt-30 md:mt-0">
            <p>
              Let&apos;s make things happen. Whether you&apos;re a current
              client, a future partner, or just exploring what we can do for
              your business, we&apos;re ready to listen--and act.
            </p>
            <p>
              From solving day-to-day headaches to helping you scale smarter,
              our team is standing by. Have a question, an idea, or a challenge?
              Talk to us. We believe conversations spark progress, and yours
              might just be the next big thing.
            </p>
            <p>
              Schedule an appointment or send us an email. No smoke signals
              necessary.
            </p>
            <h2 className="text-lg font-semibold">
              Email:{" "}
              <span className="text-teal-700 underline underline-offset-2">
                info@wisewayssolutions.us
              </span>
            </h2>
          </div>
          <div className="flex flex-row justify-around items-center">
            <h1 className="text-teal-700 text-4xl font-bold leading-tight">
              Talk to us!
            </h1>
            <button
              className="bg-teal-700 text-white rounded-2xl shadow-md px-6 py-4 text-base font-semibold 
            w-fit hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer"
              onClick={onStartBookingProcess}
            >
              Schedule Appointment Now
            </button>
          </div>
        </div>
        <div className="flex w-full h-full items-center justify-center max-w-[440px]">
          <CalendarComponent currentDate={currentDate} />
        </div>
      </div>
    </div>
  );
};

export default BookingPageLanding;
