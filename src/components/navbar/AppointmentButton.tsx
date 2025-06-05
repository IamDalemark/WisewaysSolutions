import { Button } from "../ui/button";

interface AppointmentButtonProps {
  onHandleScheduleAppointment: () => void;
}

const AppointmentButton = ({
  onHandleScheduleAppointment,
}: AppointmentButtonProps) => {
  return (
    <Button
      className="h-15 md:h-[95%] w-50 py-2 mx-2 bg-blue-green text-[#F3F3F3] text-lg rounded-2xl leading-[1.25]
            hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer justify-items-center"
      onClick={onHandleScheduleAppointment}
      data-cy="appointment-button"
    >
      <div className="text-center">
        SCHEDULE <br /> APPOINTMENT
      </div>
    </Button>
  );
};

export default AppointmentButton;
