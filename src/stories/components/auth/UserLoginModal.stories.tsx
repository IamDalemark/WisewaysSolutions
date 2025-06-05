import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import UserLoginModal, {
  UserLoginModalProps,
} from "@/components/auth/user/UserLoginModal";
import { StorybookModalProvider } from "@/mocks/StoryBookModalProvider";
import { StorybookUserProvider } from "@/mocks/StoryBookUserProvider";

const meta: Meta<typeof UserLoginModal> = {
  title: "Components/Auth/UserLoginModal",
  component: UserLoginModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The `UserLoginModal` is used for authenticating users via email and password. It includes features such as toggling password visibility, showing loading states, and displaying validation errors.",
      },
      canvas: {
        height: "100%",
        width: "100%",
      },
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
  argTypes: {
    show: {
      control: "boolean",
      description: "Controls visibility of the modal",
    },
    email: { control: "text", description: "User's email address" },
    password: { control: "text", description: "User's password" },
    showPassword: {
      control: "boolean",
      description: "Toggle for showing password text",
    },
  },
};

export default meta;

const Template: StoryFn<UserLoginModalProps> = (args) => (
  <div style={{ position: "relative", height: "100vh", width: "100%" }}>
    <StorybookUserProvider>
      <StorybookModalProvider modalProps={args} fromService="Any">
        <UserLoginModal {...args} />
      </StorybookModalProvider>
    </StorybookUserProvider>
  </div>
);

const ValidationErrorTemplate: StoryFn<UserLoginModalProps> = (args) => (
  <div style={{ position: "relative", height: "100vh", width: "100%" }}>
    <StorybookUserProvider>
      <StorybookModalProvider
        modalProps={args}
        showValidationErrors
        validationErrors={args.validationErrors}
        fromService="Any"
      >
        <UserLoginModal {...args} />
      </StorybookModalProvider>
    </StorybookUserProvider>
  </div>
);

/** Default login modal with all fields filled */
export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  show: true,
  email: "testEmail",
  password: "testPassword",
  showPassword: false,
};
Default.parameters = {
  docs: {
    description: {
      story: "Basic example with all fields provided and visible modal.",
    },
  },
};

/** Missing email field */
export const NoUsername = Template.bind({});
NoUsername.args = {
  ...Default.args,
  email: "",
};

/** Missing password field */
export const NoPassword = Template.bind({});
NoPassword.args = {
  ...Default.args,
  password: "",
};

/** Password shown in plaintext */
export const ShowPassword = Template.bind({});
ShowPassword.args = {
  ...Default.args,
  showPassword: true,
};

/** Loading state */
export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};

/** Very long email input */
export const LongUsername = Template.bind({});
LongUsername.args = {
  ...Default.args,
  email: "Lorem ipsum dolor sit amet consectetur adipiscing elit...".repeat(3),
};

/** Very long password input */
export const LongPassword = Template.bind({});
LongPassword.args = {
  ...Default.args,
  password: "Lorem ipsum dolor sit amet consectetur adipiscing elit...".repeat(
    3
  ),
};

/** Invalid email format with validation error */
export const EmailValidationError = ValidationErrorTemplate.bind({});
EmailValidationError.args = {
  ...Default.args,
  email: "not-an-email",
  validationErrors: {
    email: "Email is invalid.",
  },
};

/** Short password with validation error */
export const PasswordValidationError = ValidationErrorTemplate.bind({});
PasswordValidationError.args = {
  ...Default.args,
  password: "short",
  validationErrors: {
    password: "Password must be at least 6 characters.",
  },
};

/** General login error (e.g., wrong credentials) */
export const GeneralError = ValidationErrorTemplate.bind({});
GeneralError.args = {
  ...Default.args,
  email: "test@example.com",
  password: "password123",
  validationErrors: {
    general: "Invalid email or password. Please try again.",
  },
};

/** Multiple simultaneous validation errors */
export const MultipleErrors = ValidationErrorTemplate.bind({});
MultipleErrors.args = {
  ...Default.args,
  email: "invalid-email",
  password: "short",
  validationErrors: {
    email: "Email is invalid.",
    password: "Password must be at least 6 characters.",
  },
};
