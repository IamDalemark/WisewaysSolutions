import type { Meta, StoryObj } from "@storybook/react";
import TestimonialForm from "@/components/testimonial/TestimonialForm";
import { userEvent, within } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TestimonialForm> = {
  component: TestimonialForm,
  title: "Components/Testimonials/TestimonialForm",
  args: { onSubmit: fn() },
};

export default meta;
type Story = StoryObj<typeof TestimonialForm>;

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByTestId("form-name");
    await userEvent.type(nameInput, "ExampleName", {
      delay: 100,
    });

    const emailInput = canvas.getByTestId("form-email");
    await userEvent.type(emailInput, "example-email@email.com", {
      delay: 100,
    });

    const ratingInput = canvas.getByTestId("form-rating-3");
    await userEvent.click(ratingInput, {
      delay: 100,
    });

    const TestimonialInput = canvas.getByTestId("form-testimonial");
    await userEvent.type(TestimonialInput, "I love this product!", {
      delay: 100,
    });

    const submitButton = canvas.getByTestId("form-button");
    await userEvent.click(submitButton, {
      delay: 100,
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/testimonials", async () => {
          // Return a successful response matching your API format
          return HttpResponse.json(
            {
              success: false,
            },
            { status: 201 }
          );
        }),
      ],
    },
  },
};

// Error case story
export const SubmissionError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByTestId("form-name");
    await userEvent.type(nameInput, "ExampleName", {
      delay: 100,
    });

    const emailInput = canvas.getByTestId("form-email");
    await userEvent.type(emailInput, "example-email@email.com", {
      delay: 100,
    });

    const ratingInput = canvas.getByTestId("form-rating-3");
    await userEvent.click(ratingInput, {
      delay: 100,
    });

    const TestimonialInput = canvas.getByTestId("form-testimonial");
    await userEvent.type(TestimonialInput, "I love this product!", {
      delay: 100,
    });

    const submitButton = canvas.getByTestId("form-button");
    await userEvent.click(submitButton, {
      delay: 100,
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/testimonials", () => {
          // Simulate a server error
          return HttpResponse.json(
            { error: "Database connection error" },
            { status: 500 }
          );
        }),
      ],
    },
  },
};

// Missing fields error story
export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitButton = canvas.getByTestId("form-button");
    await userEvent.click(submitButton, {
      delay: 100,
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/testimonials", () => {
          // Simulate a validation error
          return HttpResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
          );
        }),
      ],
    },
  },
};

export const LongInputValues: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const longName =
      "SirBartholomewAlexanderMaximusTheFourthHighDukeOfExtraordinaryFormSubmissionsAndBeyond";
    const longEmail =
      "the.most.unbelievably.long.email.address.that.you.have.ever.seen.in.your.entire.life@example.super-long-organization-name-that-might-break-layout.com";
    const longTestimonial =
      "Let me begin by stating unequivocally that this platform has irrevocably transformed my understanding of what it means to deliver excellence in the realm of digital form submissions. Never before have I encountered a user experience so fluid, so responsive, so utterly impeccable in its construction. ".repeat(
        5
      );

    await userEvent.type(canvas.getByTestId("form-name"), longName, {
      delay: 5,
    });
    await userEvent.type(canvas.getByTestId("form-email"), longEmail, {
      delay: 5,
    });
    await userEvent.click(canvas.getByTestId("form-rating-5"), { delay: 100 });
    await userEvent.type(
      canvas.getByTestId("form-testimonial"),
      longTestimonial,
      {
        delay: 1,
      }
    );
    await userEvent.click(canvas.getByTestId("form-button"), { delay: 100 });
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/testimonials", async () => {
          return HttpResponse.json({ success: true }, { status: 201 });
        }),
      ],
    },
  },
};
