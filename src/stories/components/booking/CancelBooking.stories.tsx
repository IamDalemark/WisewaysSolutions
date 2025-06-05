import type { Meta, StoryObj } from "@storybook/react";
import CancelBooking from "@/components/booking/CancelBooking";

const meta: Meta<typeof CancelBooking> = {
  title: "Components/Booking/CancelBooking",
  component: CancelBooking,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CancelBooking` displays a Calendly widget interface for canceling an existing booking using an `invitee_id`. It also includes a prompt to stop the cancellation and return.",
      },
    },
  },
  argTypes: {
    invitee_id: {
      control: "text",
      description:
        "Calendly invitee ID for cancellation. If `null`, a fallback message is shown.",
    },
    onHandleReturn: {
      action: "stop cancellation clicked",
      description:
        "Callback triggered when the user decides to stop the cancellation process.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CancelBooking>;

export const WithInviteeId: Story = {
  args: {
    invitee_id: "12659f68-6c50-4644-b501-8b24c9511195",
    onHandleReturn: () => console.log("Stop cancellation clicked"),
  },
};

export const WithoutInviteeId: Story = {
  args: {
    invitee_id: null,
    onHandleReturn: () => {},
  },
};
