import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/navbar/NavBar";

const meta = {
    title: "Components/Navbar/NavBar",
    component: NavBar,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    },
  } satisfies Meta<typeof NavBar>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {};