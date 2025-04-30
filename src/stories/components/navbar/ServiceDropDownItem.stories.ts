import type { Meta, StoryObj } from "@storybook/react";
import ServiceDropDownItem from "@/components/navbar/dropdown/ServiceDropDownItem";

const meta: Meta<typeof ServiceDropDownItem> = {
  title: "Components/Navbar/ServiceDropDownItem",
  component: ServiceDropDownItem,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//     layout: "centered",
//   },
};
export default meta;

type Story = StoryObj<typeof ServiceDropDownItem>;

export const Default: Story = {
  args: {
    label: "SERVICES",
  },
};

export const Open: Story = {
    args: {
        label: "SERVICES",
        initialOpen: true,
    },
};
