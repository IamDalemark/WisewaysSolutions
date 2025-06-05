import type { Meta, StoryFn } from "@storybook/react";
import CalendlyScheduler, {
  CalendlySchedulerProps,
} from "@/components/booking/CalendlyScheduler";
import { StorybookUserProvider } from "@/mocks/StoryBookUserProvider";
import { StorybookModalProvider } from "@/mocks/StoryBookModalProvider";

const meta: Meta<typeof CalendlyScheduler> = {
  title: "Components/Booking/CalendlyScheduler",
  component: CalendlyScheduler,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A scheduler component that embeds Calendly inline widget and listens to booking events. It handles booking submissions via a custom hook and displays a loader during submission.",
      },
    },
  },
  argTypes: {
    user_id: {
      control: "text",
      description: "The user ID associated with the booking submission.",
    },
    name: {
      control: "text",
      description: "Name of the person scheduling the appointment.",
    },
    email: {
      control: "text",
      description: "Email of the person scheduling the appointment.",
    },
    onSubmit: {
      action: "submit callback triggered",
      description: "Callback fired after successful booking submission.",
    },
  },
};

export default meta;

const Template: StoryFn<CalendlySchedulerProps> = (args) => (
  <div style={{ position: "relative", height: "100vh", width: "100%" }}>
    <StorybookUserProvider>
      <StorybookModalProvider modalProps={args} fromService="Any">
        <CalendlyScheduler {...args} />
      </StorybookModalProvider>
    </StorybookUserProvider>
  </div>
);

export const Default = Template.bind({});
Template.args = {
  user_id: "user-123",
  name: "John Doe",
  email: "john.doe@example.com",
  onSubmit: () => console.log("Booking submitted!"),
};
