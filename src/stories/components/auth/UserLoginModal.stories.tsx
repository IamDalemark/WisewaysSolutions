import type { Meta, StoryFn } from "@storybook/react";

import UserLoginModal, {
  UserLoginModalProps,
} from "@/components/auth/user/UserLoginModal";
import React, { ReactNode } from "react";
import { UserProvider } from "@/components/contexts/UserContext";
import { StorybookModalProvider } from "@/mocks/StoryBookModalProvider";

const meta: Meta<typeof UserLoginModal> = {
  title: "Components/auth/UserLoginModal",
  component: UserLoginModal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    show: { control: "boolean" },
    email: { control: "text" },
    password: { control: "text" },
    showPassword: { control: "boolean" },
  },
};

export default meta;

// Mock UserProvider to avoid Supabase client issues
const MockUserProvider = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

const Template: StoryFn<UserLoginModalProps> = (args) => {
  return (
    <MockUserProvider>
      <StorybookModalProvider modalProps={args} fromService="Any">
        <UserLoginModal {...args} />
      </StorybookModalProvider>
    </MockUserProvider>
  );
};

// Template for stories with validation errors
const ValidationErrorTemplate: StoryFn<UserLoginModalProps> = (args) => {
  return (
    <MockUserProvider>
      <StorybookModalProvider
        modalProps={args}
        showValidationErrors={true}
        validationErrors={args.validationErrors}
        fromService="Any"
      >
        <UserLoginModal {...args} />
      </StorybookModalProvider>
    </MockUserProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  show: true,
  email: "testEmail",
  password: "testPassword",
  showPassword: false,
};

export const NoUsername = Template.bind({});
NoUsername.args = {
  isLoading: false,
  show: true,
  email: "",
  password: "testPassword",
  showPassword: false,
};

export const NoPassword = Template.bind({});
NoPassword.args = {
  isLoading: false,
  show: true,
  email: "testEmail",
  password: "",
  showPassword: false,
};

export const ShowPassword = Template.bind({});
ShowPassword.args = {
  isLoading: false,
  show: true,
  email: "testEmail",
  password: "testPassword",
  showPassword: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  show: true,
  email: "testEmail",
  password: "testPassword",
  showPassword: false,
};

export const LongUsername = Template.bind({});
LongUsername.args = {
  isLoading: false,
  show: true,
  email:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
  password: "testPassword",
  showPassword: false,
};

export const LongPassword = Template.bind({});
LongPassword.args = {
  isLoading: false,
  show: true,
  email: "testEmail",
  password:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
  showPassword: false,
};

// Validation error stories
export const EmailValidationError = ValidationErrorTemplate.bind({});
EmailValidationError.args = {
  isLoading: false,
  show: true,
  email: "not-an-email",
  password: "testPassword",
  showPassword: false,
  validationErrors: {
    email: "Email is invalid.",
  },
};

export const PasswordValidationError = ValidationErrorTemplate.bind({});
PasswordValidationError.args = {
  isLoading: false,
  show: true,
  email: "test@example.com",
  password: "short",
  showPassword: false,
  validationErrors: {
    password: "Password must be at least 6 characters.",
  },
};

export const GeneralError = ValidationErrorTemplate.bind({});
GeneralError.args = {
  isLoading: false,
  show: true,
  email: "test@example.com",
  password: "password123",
  showPassword: false,
  validationErrors: {
    general: "Invalid email or password. Please try again.",
  },
};

export const MultipleErrors = ValidationErrorTemplate.bind({});
MultipleErrors.args = {
  isLoading: false,
  show: true,
  email: "invalid-email",
  password: "short",
  showPassword: false,
  validationErrors: {
    email: "Email is invalid.",
    password: "Password must be at least 6 characters.",
  },
};
