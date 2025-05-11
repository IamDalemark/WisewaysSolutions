"use client";

import AppointmentTable from "@/components/admin/appointments/AppointmentTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CalendlyInlineWidget from "@/components/calendly/InlineWidget";
import { X } from "lucide-react"; // Import X icon for close button

const AdminAppointmentsPage = () => {
  const router = useRouter();
  const [url, setURL] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  const onHandleCancellation = (uri: string) => {
    setURL(`https://calendly.com/cancellations/${uri.split("/")[6]}`);
    setShow(true);
    document.body.style.overflow = "hidden";
  };

  const onHandleReschedule = (uri: string) => {
    console.log(uri);
    setURL(`https://calendly.com/reschedulings/${uri.split("/")[6]}`);
    setShow(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShow(false);
    setURL("");
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex flex-col w-full text-blue-green mt-40 mb-80">
      <div className="flex flex-row justify-between px-3 mb-1">
        <p className="text-4xl font-bold">Appointments</p>
      </div>
      <AppointmentTable
        onReschedule={onHandleReschedule}
        onCancel={onHandleCancellation}
      />

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-blend-color">
          <div className="relative w-full h-full max-w-6xl max-h-screen bg-white rounded-lg shadow-xl p-6 m-4 overflow-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="h-full pt-8">
              <CalendlyInlineWidget data_url={url} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsPage;
