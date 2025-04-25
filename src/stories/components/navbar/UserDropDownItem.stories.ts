import type { Meta, StoryObj } from "@storybook/react";
import UserDropDownItem from "@/components/navbar/dropdown/UserDropDownItem";

const meta: Meta<typeof UserDropDownItem> = {
  title: "Components/Navbar/UserDropDownItem",
  component: UserDropDownItem,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//     layout: "centered",
//   },
};
export default meta;

type Story = StoryObj<typeof UserDropDownItem>;

export const Default: Story = {};

export const Open: Story = {
    args: {
        initialOpen: true,
    },
};
