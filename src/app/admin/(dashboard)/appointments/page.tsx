"use client";

import AdminTableBooking from "@/components/admin/AdminTableBooking";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const appointmentAdminColumns = [
  { header: "Client Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Service", accessor: "service" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" },
  { header: "Status", accessor: "status" },
];

const AdminAppointmentsPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    } else {
    }
  }, [router]);
  return (
    <div className="flex flex-col w-full text-blue-green mb-20">
      <div className="flex flex-row justify-between px-3 mb-1">
        <p className="text-4xl font-bold">Appointments</p>
        <button>Filter by</button>
      </div>
      <AdminTableBooking columns={appointmentAdminColumns}>
      </AdminTableBooking>
    </div>
  );
};

export default AdminAppointmentsPage;