import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import TestimonialFilterButton from "@/components/admin/testimonials/TestimonialFilterButton";

const meta: Meta<typeof TestimonialFilterButton> = {
  title: "Admin/Testimonials/TestimonialFilterButton",
  component: TestimonialFilterButton,
  tags: ["autodocs"],
  args: {
    onFilter: (filters) => console.log("Filtered with:", filters),
    onReset: () => console.log("Filters reset"),
  },
};

export default meta;

type Story = StoryObj<typeof TestimonialFilterButton>;

export const FillNameFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /filter by/i }));
    await userEvent.type(canvas.getByLabelText(/name/i), "Jane Doe");
  },
};

export const FillStatusFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /filter by/i }));
    await userEvent.selectOptions(canvas.getByLabelText(/status/i), "Accepted");
  },
};

export const FillRatingFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /filter by/i }));
    await userEvent.selectOptions(canvas.getByLabelText(/rating/i), "5");
  },
};
