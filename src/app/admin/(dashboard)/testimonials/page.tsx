import AdminTable from "@/components/admin/AdminTable";
import { testimonialTableColumns } from "@/constants/adminTableColumns";

const AdminTestimonialsPage = () => {
  return (
    <div className="flex flex-col w-full text-blue-green mb-20">
      <div className="flex flex-row justify-between px-3 mb-1">
        <p className="text-4xl font-bold">Testimonials</p>
        <button>Filter by</button>
      </div>
      <AdminTable columns={testimonialTableColumns} table="Testimonials"/>
    </div>
  );
};

export default AdminTestimonialsPage;
