import AdminTable from "@/components/admin/AdminTable";
// import { testimonialAdminData } from "@/mockData/testimonialAdminTable.sample";

const testimonialAdminColumns = [
{ header: "Client Name", accessor: "clientName" },
{ header: "Email", accessor: "email" },
{ header: "Review", accessor: "review" },
{ header: "Rating", accessor: "rating" },
{ header: "Status", accessor: "status" }
];

const AdminTestimonialsPage = () => {
  return (
    <div className="flex flex-col w-full text-blue-green mb-20">
      <div className="flex flex-row justify-between px-3">
        <p className="text-2xl font-bold">Testimonials</p>
        <button>Filter by</button>
      </div>
      <AdminTable columns={testimonialAdminColumns}/>
      {/* <AdminTable columns={testimonialAdminColumns} data={testimonialAdminData}/> */}
    </div>
  );
};

export default AdminTestimonialsPage;
