import type { Meta, StoryObj } from "@storybook/react";

import UserSignUpModal from "@/components/auth/user/UserSignUpModal";

const meta = {
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
} satisfies Meta<typeof UserSignUpModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username: "testUsername",
    password: "testPassword",
    confirmPassword: "testPassword",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const NoUsername: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username: "",
    password: "testPassword",
    confirmPassword: "testPassword",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const NoPassword: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username: "testUsername",
    password: "",
    confirmPassword: "testPassword",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const NoConfirmPassword: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username: "testUsername",
    password: "testPassword",
    confirmPassword: "",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const ShowPasswords: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username: "testUsername",
    password: "testPassword",
    confirmPassword: "testPassword",
    showPassword: true,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const LongUsername: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
    password: "testPassword",
    confirmPassword: "testPassword",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const LongPassword: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username: "testUsername",
    password:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
    confirmPassword: "testPassword",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const LongConfirmPassword: Story = {
  args: {
    show: true,
    email: "test@email.com",
    username: "testUsername",
    password: "testPassword",
    confirmPassword:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};

export const LongEmail: Story = {
  args: {
    show: true,
    email:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
    username: "testUsername",
    password: "testPassword",
    confirmPassword: "testPassword",
    showPassword: false,
    onClose: () => {},
    onOpenLogIn: () => {},
    onSignUp: () => {},
  },
};
