import type { Meta, StoryObj } from "@storybook/react";
import RescheduleBooking from "@/components/booking/RescheduleBooking";

const meta: Meta<typeof RescheduleBooking> = {
  title: "Components/Booking/RescheduleBooking",
  component: RescheduleBooking,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`RescheduleBooking` provides a Calendly interface for rescheduling a booking based on the `invitee_id`. If no ID is provided, a fallback message is shown. It also offers an option to cancel the rescheduling process.",
      },
    },
  },
  argTypes: {
    invitee_id: {
      control: "text",
      description:
        "Calendly invitee ID for rescheduling. If `null`, shows a 'No Scheduled Booking' message.",
    },
    onHandleReturn: {
      action: "cancel reschedule clicked",
      description: "Callback when user cancels the reschedule attempt.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RescheduleBooking>;

export const WithInviteeId: Story = {
  args: {
    invitee_id: "12659f68-6c50-4644-b501-8b24c9511195",
    onHandleReturn: () => console.log("Cancel reschedule clicked"),
  },
};

export const WithoutInviteeId: Story = {
  args: {
    invitee_id: null,
    onHandleReturn: () => {},
  },
};
