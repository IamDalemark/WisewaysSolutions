import AdminTable from "@/components/admin/AdminTable";
// import { testimonialAdminData } from "@/mockData/testimonialAdminTable.sample";

export const testimonialColumns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Review", accessor: "testimonial" },
  { header: "Rating", accessor: "rating" },
  { header: "Status", accessor: "is_approved" },
];

const AdminTestimonialsPage = () => {
  return (
    <div className="flex flex-col w-full text-blue-green mb-20">
      <div className="flex flex-row justify-between px-3 mb-1">
        <p className="text-4xl font-bold">Testimonials</p>
        <button>Filter by</button>
      </div>
      <AdminTable columns={testimonialColumns}/>
    </div>
  );
};

export default AdminTestimonialsPage;
