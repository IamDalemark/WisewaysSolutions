import type { Meta, StoryObj } from "@storybook/react";
import NavMenuDropDownItem from "@/components/navbar/dropdown/NavMenuDropDownItem";

const meta: Meta<typeof NavMenuDropDownItem> = {
  title: "Components/Navbar/NavMenuDropDownItem",
  component: NavMenuDropDownItem,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//     layout: "centered",
//   },
};
export default meta;

type Story = StoryObj<typeof NavMenuDropDownItem>;

export const Default: Story = {};

export const Open: Story = {
    args: {
        initialOpen: true,
    },
};
