import type { Meta, StoryObj } from "@storybook/react";

// Tell Storybook to use the mock
jest.mock("@/components/contexts/ModalContext");

import LandingPage from "@/app/landing/LandingPage";

const meta: Meta<typeof LandingPage> = {
  title: "Components/LandingPage/LandingPage",
  component: LandingPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {
  name: "Complete Landing Page",
};