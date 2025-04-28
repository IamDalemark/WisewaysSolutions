import type { Meta, StoryFn } from "@storybook/react";

import UserSignUpModal, {
  UserSignUpModalProps,
} from "@/components/auth/user/UserSignUpModal";
import React, { ReactNode } from "react";
import { UserProvider } from "@/components/contexts/UserContext";
import { StorybookModalProvider } from "@/mocks/StoryBookModalProvider";

const meta: Meta<typeof UserSignUpModal> = {
  title: "Components/auth/UserSignUpModal",
  component: UserSignUpModal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    show: { control: "boolean" },
    email: { control: "text" },
    username: { control: "text" },
    password: { control: "text" },
    confirmPassword: { control: "text" },
    showPassword: { control: "boolean" },
  },
};

export default meta;

// Mock UserProvider to avoid Supabase client issues
const MockUserProvider = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

const Template: StoryFn<UserSignUpModalProps> = (args) => {
  return (
    <MockUserProvider>
      <StorybookModalProvider modalProps={args}>
        <UserSignUpModal {...args} />
      </StorybookModalProvider>
    </MockUserProvider>
  );
};

// Template for stories with validation errors
const ValidationErrorTemplate: StoryFn<UserSignUpModalProps> = (args) => {
  return (
    <MockUserProvider>
      <StorybookModalProvider
        modalProps={args}
        showValidationErrors={true}
        validationErrors={args.validationErrors}
      >
        <UserSignUpModal {...args} />
      </StorybookModalProvider>
    </MockUserProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const NoUsername = Template.bind({});
NoUsername.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const NoEmail = Template.bind({});
NoEmail.args = {
  show: true,
  isLoading: false,
  email: "",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const NoPassword = Template.bind({});
NoPassword.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const NoConfirmPassword = Template.bind({});
NoConfirmPassword.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "",
  showPassword: false,
};

export const ShowPasswords = Template.bind({});
ShowPasswords.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: true,
};

export const LongUsername = Template.bind({});
LongUsername.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const LongPassword = Template.bind({});
LongPassword.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const LongConfirmPassword = Template.bind({});
LongConfirmPassword.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "testPassword",
  confirmPassword:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
  showPassword: false,
};

export const LongEmail = Template.bind({});
LongEmail.args = {
  show: true,
  isLoading: false,
  email:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const Loading = Template.bind({});
Loading.args = {
  show: true,
  isLoading: true,
  email: "test@email.com",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
};

export const WithUsernameError = ValidationErrorTemplate.bind({});
WithUsernameError.args = {
  show: true,
  isLoading: false,
  email: "invalid-email",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
  validationErrors: {
    username: "Username is required.",
  },
};

export const WithEmailError = ValidationErrorTemplate.bind({});
WithEmailError.args = {
  show: true,
  isLoading: false,
  email: "invalid-email",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
  validationErrors: {
    email: "Please enter a valid email address.",
  },
};

export const WithShortPassword = ValidationErrorTemplate.bind({});
WithShortPassword.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "short",
  confirmPassword: "short",
  showPassword: false,
  validationErrors: {
    password: "Password must be at least 6 characters.",
  },
};

export const WithPasswordMismatch = ValidationErrorTemplate.bind({});
WithPasswordMismatch.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "differentPassword",
  showPassword: false,
  validationErrors: {
    confirmPassword: "Passwords do not match.",
  },
};

export const WithGeneralError = ValidationErrorTemplate.bind({});
WithGeneralError.args = {
  show: true,
  isLoading: false,
  email: "test@email.com",
  username: "testUsername",
  password: "testPassword",
  confirmPassword: "testPassword",
  showPassword: false,
  validationErrors: {
    general: "Account creation failed. Please try again later.",
  },
};

export const WithMultipleError = ValidationErrorTemplate.bind({});
WithMultipleError.args = {
  show: true,
  isLoading: false,
  email: "invalid-email",
  username: "",
  password: "test",
  confirmPassword: "tested",
  showPassword: false,
  validationErrors: {
    username: "Username is required.",
    email: "Please enter a valid email address.",
    password: "Password must be at least 6 characters.",
    confirmPassword: "Passwords do not match.",
    general: "Account creation failed. Please try again later.",
  },
};
