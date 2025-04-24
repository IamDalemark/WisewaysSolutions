import type { Meta, StoryObj } from "@storybook/react";

import SentTestimonial from "@/components/testimonial/SentTestimonial";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Testimonials/SentTestimonial",
  component: SentTestimonial,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof SentTestimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Thanks again! Sit tight while we redirect you.",
    onSubmit: () => {},
  },
};

export const LongDescription: Story = {
  args: {
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, hic dicta temporibus nesciunt dolor molestiae et iste praesentium impedit unde velit asperiores minus fuga corrupti necessitatibus officiis rem repellat expedita!",
    onSubmit: () => {},
  },
};

export const NoDescription: Story = {
  args: {
    description: "",
    onSubmit: () => {},
  },
};
