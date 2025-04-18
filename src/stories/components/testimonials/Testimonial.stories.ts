import type { Meta, StoryObj } from "@storybook/react";

import Testimonial from "@/components/testimonial/Testimonial";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Testimonials/Testimonial",
  component: Testimonial,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },

  argTypes: {
    testimonial: { control: "text" },
    name: { control: "text" },
    ratings: { control: { type: "number", min: 0, max: 5, step: 1 } },
  },
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    testimonial:
      "This is a wonderful service! I was so impressed with the quality and the support I received. Highly recommend!",
    name: "Alice Wonderland",
    ratings: 5,
  },
};

export const LowRating: Story = {
  args: {
    testimonial: "It was okay, but there's definitely room for improvement.",
    name: "Bob The Builder",
    ratings: 2,
  },
};

export const NoRating: Story = {
  args: {
    testimonial: "",
    name: "Charlie Chaplin",
    ratings: 0,
  },
};

export const LongTestimonial: Story = {
  args: {
    testimonial:
      "I had an absolutely fantastic experience! From the initial contact to the final result, everything was handled with professionalism and care. The team went above and beyond to ensure my needs were met, and the communication was excellent throughout the entire process. I would not hesitate to use their services again in the future and will be recommending them to all my friends and family. Thank you for such a positive experience!",
    name: "Diana Prince",
    ratings: 4,
  },
};

export const ShortTestimonial: Story = {
  args: {
    testimonial: "Great!",
    name: "Eve Harrington",
    ratings: 4,
  },
};