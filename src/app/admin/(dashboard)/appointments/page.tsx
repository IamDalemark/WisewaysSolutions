"use client";

import AdminTableBooking from "@/components/admin/appointments/AppointmentTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FilterButtonBooking from "@/components/admin/appointments/AppointmentFilterButton";

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
  const [filters, setFilters] = useState<{
    date?: string;
    status?: string;
    clientName?: string;
  }>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  const handleFilter = (newFilters: {
    date?: string;
    status?: string;
    clientName?: string;
  }) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="flex flex-col w-full text-blue-green mt-40 mb-80">
      <div className="flex flex-row justify-between px-3 mb-1">
        <p className="text-4xl font-bold">Appointments</p>
        <FilterButtonBooking onFilter={handleFilter} onReset={handleResetFilters} />
      </div>
      <AdminTableBooking 
        columns={appointmentAdminColumns} 
        filters={filters}
      />
    </div>
  );
};

export default AdminAppointmentsPage;