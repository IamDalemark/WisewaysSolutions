import type { Meta, StoryObj } from "@storybook/react";
import AdminLogin from "@/components/auth/admin/AdminLogin";
import { userEvent, within } from "@storybook/test";

const meta = {
    title: "Components/Admin/AdminLogin",
    component: AdminLogin,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: "centered",
    },
  } satisfies Meta<typeof AdminLogin>;

export default meta;
type Story = StoryObj<typeof AdminLogin>;

export const FilledLoginForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByTestId("email-input");
    await userEvent.type(emailInput, "admin@example.com", { delay: 100 });

    const passwordInput = canvas.getByPlaceholderText("Enter your password");
    await userEvent.type(passwordInput, "wrongpassword", { delay: 100 });


  },
};

export const LoginError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText("Enter your email");
    await userEvent.type(emailInput, "wronguser@example.com", { delay: 100 });

    const passwordInput = canvas.getByPlaceholderText("Enter your password");
    await userEvent.type(passwordInput, "wrongpassword", { delay: 100 });

    const loginButton = canvas.getByRole("button", { name: /log in/i });
    await userEvent.click(loginButton, { delay: 100 });
  },
};

export const SuccessfulLogin: Story = {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
  
      const emailInput = canvas.getByTestId("email-input");
      await userEvent.type(emailInput, "admin@example.com", { delay: 100 });
  
      const passwordInput = canvas.getByPlaceholderText("Enter your password");
      await userEvent.type(passwordInput, "correctpassword", { delay: 100 });
  
      const loginButton = canvas.getByRole("button", { name: /log in/i });
      await userEvent.click(loginButton, { delay: 100 });

      await canvas.findByText(/login successful/i, {}, { timeout: 2000 });
    },
  };