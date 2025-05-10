export const testimonialTableColumns = [
    { header: "User", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Review", accessor: "testimonial" },
    { header: "Rating", accessor: "rating" },
    { header: "Status", accessor: "is_approved" },
  ];

export const appointmentTableColumns = [
  { header: "User", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Service", accessor: "service" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" },
  { header: "Status", accessor: "status" },
];