import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Toast } from "@/components/toast/Toast";
import {
  ToastInterface,
  ToastProvider,
} from "@/components/contexts/ToastContext";

export default {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Toast is a transient notification component that appears in one of the four corners of the screen. It supports different types (success, error, info, warning) and fades in/out with animation.",
      },
      canvas: {
        height: "100%",
        width: "100%",
      },
    },
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
      description: "Position where the toast will appear.",
    },
    toast: {
      description:
        "The toast object containing message, type, and optional duration.",
    },
    onClose: {
      description: "Callback to remove the toast when it is closed.",
    },
  },
} satisfies Meta<typeof Toast>;

const baseToast: ToastInterface = {
  id: "1",
  message: "This is a toast message.",
  type: "info",
};

const getPositionClass = (position: string) => {
  switch (position) {
    case "top-left":
      return "top-4 left-4";
    case "top-right":
      return "top-4 right-4";
    case "bottom-left":
      return "bottom-4 left-4";
    case "bottom-right":
      return "bottom-4 right-4";
    default:
      return "top-4 right-4";
  }
};

const Template = ({
  toast,
  position,
}: {
  toast: ToastInterface;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <ToastProvider>
      <div style={{ position: "relative", height: "20vh", width: "100%" }}>
        {visible && (
          <div className={`absolute ${getPositionClass(position)}`}>
            <Toast
              toast={toast}
              position={position}
              onClose={() => setVisible(false)}
            />
          </div>
        )}
      </div>
    </ToastProvider>
  );
};

// Stories
export const Success: StoryObj<typeof Toast> = {
  render: () =>
    Template({
      toast: { ...baseToast, type: "success", message: "Success toast!" },
      position: "top-right",
    }),
  name: "Success",
};

export const Error: StoryObj<typeof Toast> = {
  render: () =>
    Template({
      toast: { ...baseToast, type: "error", message: "Something went wrong!" },
      position: "bottom-left",
    }),
  name: "Error",
};

export const Warning: StoryObj<typeof Toast> = {
  render: () =>
    Template({
      toast: { ...baseToast, type: "warning", message: "Careful now!" },
      position: "top-left",
    }),
  name: "Warning",
};

export const Info: StoryObj<typeof Toast> = {
  render: () =>
    Template({
      toast: { ...baseToast, type: "info", message: "Just so you know." },
      position: "bottom-right",
    }),
  name: "Info",
};
