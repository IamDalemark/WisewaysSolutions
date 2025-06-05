"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { TestimonialTable } from "@/components/admin/testimonials/TestimonialTable";
import { testimonialTableColumns } from "@/constants/adminTableColumns";
import TestimonialFilterButton from "@/components/admin/testimonials/TestimonialFilterButton";
import PaginationControls from "@/components/admin/PaginationControls";

const AdminTestimonialsPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<{
    name?: string;
    status?: string;
    rating?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  setCurrentPage(1);
  }, [filters]);

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
    <div className="flex flex-col w-full text-blue-green mt-40 mb-80">
      <div className="flex flex-row justify-between px-3 mb-1">
        <p className="text-4xl font-bold">Testimonials</p>
        <TestimonialFilterButton 
          onFilter={handleFilter} 
          onReset={handleResetFilters} 
        />
      </div>
      <TestimonialTable
        columns={testimonialTableColumns}
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
    </div>
  );
};

export default AdminTestimonialsPage;