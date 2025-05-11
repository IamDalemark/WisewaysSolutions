"use client";

import AdminTableBooking from "@/components/admin/appointments/AppointmentTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FilterButtonBooking from "@/components/admin/appointments/AppointmentFilterButton";
import CalendlyEvents from "@/components/calendly/Events";
import PaginationControls from "@/components/admin/PaginationControls";
import { appointmentTableColumns } from "@/constants/adminTableColumns";

const AdminAppointmentsPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<{
    date?: string;
    status?: string;
    clientName?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


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
        <FilterButtonBooking 
        onFilter={handleFilter} 
        onReset={handleResetFilters} 
        />
      </div>
      <AdminTableBooking 
        columns={appointmentTableColumns} 
        filters={filters}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Synced Appointments</h1>
        <p className="mb-6 text-gray-600">
          This page shows Calendly events matched with your Supabase bookings
          database. Events highlighted in green have matching bookings in your
          system.
        </p>
        <CalendlyEvents />
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;
