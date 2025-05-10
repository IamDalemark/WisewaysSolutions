"use client";
import React from "react";
import { Toast } from "./Toast";
import { useToast } from "../contexts/ToastContext";

interface ToastContainerProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = "top-right",
}) => {
  const { toasts, removeToast } = useToast();

  // Helper function to get the appropriate position styles
  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
      default:
        return "top-4 right-4";
    }
  };

  return (
    <div className={`fixed z-50 w-72 max-w-md ${getPositionStyles()}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          position={position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
