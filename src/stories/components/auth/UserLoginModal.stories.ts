import type { Meta, StoryObj } from "@storybook/react";

import UserLoginModal from "@/components/auth/user/UserLoginModal";

const meta = {
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
} satisfies Meta<typeof UserLoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    email: "testEmail",
    password: "testPassword",
    showPassword: false,
  },
};

export const NoUsername: Story = {
  args: {
    show: true,
    email: "",
    password: "testPassword",
    showPassword: false,
  },
};

export const NoPassword: Story = {
  args: {
    show: true,
    email: "testEmail",
    password: "",
    showPassword: false,
  },
};

export const ShowPassword: Story = {
  args: {
    show: true,
    email: "testEmail",
    password: "testPassword",
    showPassword: true,
  },
};

export const LongUsername: Story = {
  args: {
    show: true,
    email:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
    password: "testPassword",
    showPassword: false,
  },
};

export const LongPassword: Story = {
  args: {
    show: true,
    email: "testEmail",
    password:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.",
    showPassword: false,
  },
};
