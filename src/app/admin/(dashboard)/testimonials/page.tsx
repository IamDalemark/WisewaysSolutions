"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminTable from "@/components/admin/AdminTable";
import { testimonialTableColumns } from "@/constants/adminTableColumns";
import TestimonialFilterButton from "@/components/admin/testimonials/TestimonialFilterButton";
import TestimonialTableBody from "@/components/admin/testimonials/TestimonialTableBody";

const AdminTestimonialsPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<{
    name?: string;
    status?: string;
    rating?: string;
  }>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  const handleFilter = (newFilters: {
    name?: string;
    status?: string;
    rating?: string;
  }) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="flex flex-col w-full text-blue-green mb-20">
      <div className="flex flex-row justify-between px-3 mb-1">
        <p className="text-4xl font-bold">Testimonials</p>
        <TestimonialFilterButton 
          onFilter={handleFilter} 
          onReset={handleResetFilters} 
        />
      </div>
      <AdminTable 
        columns={testimonialTableColumns} 
        body={
          <TestimonialTableBody filters={filters} />
        }
      />
    </div>
  );
};

export default AdminTestimonialsPage;