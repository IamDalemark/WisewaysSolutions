
import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/navbar/NavBar";
import React, { createContext, useContext } from "react";

const ModalContext = createContext({
  handleScheduleAppointment: () => alert("Schedule Appointment"),
});

export const useModal = () => useContext(ModalContext);

export const MockModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContext.Provider value={{ handleScheduleAppointment: () => alert("Schedule Appointment") }}>
      {children}
    </ModalContext.Provider>
  );
};

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  render: () => <NavBar />,
};
