import type { Meta, StoryObj } from "@storybook/react";
import ScheduledBooking from "@/components/booking/ScheduledBooking";

const meta: Meta<typeof ScheduledBooking> = {
  title: "Components/Booking/ScheduledBooking",
  component: ScheduledBooking,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`ScheduledBooking` displays a Calendly invitee booking based on a provided `invitee_id`. It shows reschedule and cancel buttons, or a message if no booking is found.",
      },
    },
  },
  argTypes: {
    invitee_id: {
      control: "text",
      description:
        "The invitee ID from Calendly. If `null`, a 'No booking found' message is shown.",
    },
    onHandleReschedule: {
      action: "reschedule clicked",
      description: "Callback fired when the Reschedule button is clicked.",
    },
    onHandleCancellation: {
      action: "cancel clicked",
      description: "Callback fired when the Cancel button is clicked.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScheduledBooking>;

export const WithInviteeId: Story = {
  args: {
    invitee_id: "12659f68-6c50-4644-b501-8b24c9511195",
    onHandleReschedule: () => console.log("Reschedule clicked"),
    onHandleCancellation: () => console.log("Cancel clicked"),
  },
};

export const WithoutInviteeId: Story = {
  args: {
    invitee_id: null,
    onHandleReschedule: () => {},
    onHandleCancellation: () => {},
  },
};
