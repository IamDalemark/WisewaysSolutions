import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TestimonialTable, AdminTableColumn } from "@/components/admin/testimonials/TestimonialTable";

// Types based on your testimonial data structure
interface MockTestimonialData {
  testimonial_id: number;
  name: string;
  email: string;
  testimonial: string;
  rating: number;
  is_approved: string;
  created_at: string;
}

interface TestimonialFilters {
  name?: string;
  status?: string;
  rating?: string;
  date?: string;
  clientName?: string;
}

interface MockTestimonialTableBodyProps {
  currentPage: number;
  setTotalPages: (total: number) => void;
  filters?: TestimonialFilters;
}

// Mock data for testimonials
const mockTestimonialData: MockTestimonialData[] = [
  {
    testimonial_id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    testimonial: "This service completely transformed my business operations. The team was professional, efficient, and delivered exactly what was promised. I couldn't be happier with the results.",
    rating: 5,
    is_approved: "Pending",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    testimonial_id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    testimonial: "Outstanding experience from start to finish. Highly recommend!",
    rating: 5,
    is_approved: "Accepted",
    created_at: "2024-01-14T14:20:00Z"
  },
  {
    testimonial_id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@email.com",
    testimonial: "Good service but there's room for improvement in communication.",
    rating: 3,
    is_approved: "Declined",
    created_at: "2024-01-13T09:15:00Z"
  },
  {
    testimonial_id: 4,
    name: "Alice Brown",
    email: "alice.brown@domain.com",
    testimonial: "Excellent work! The team exceeded my expectations.",
    rating: 4,
    is_approved: "Pending",
    created_at: "2024-01-12T16:45:00Z"
  },
  {
    testimonial_id: 5,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.org",
    testimonial: "Professional service with great attention to detail. Will definitely work with them again in the future.",
    rating: 5,
    is_approved: "Accepted",
    created_at: "2024-01-11T11:30:00Z"
  }
];

// Mock columns (you'll need to adjust based on your actual column structure)
const mockColumns: AdminTableColumn[] = [
  { header: "User", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Review", accessor: "testimonial" },
  { header: "Rating", accessor: "rating" },
  { header: "Status", accessor: "is_approved" }
];

// Mock TestimonialStatusButtons component to match your actual component
const MockTestimonialStatusButtons = ({ rowId }: { rowId: string }) => {
  const handleClick = (status: "Accepted" | "Declined") => {
    console.log(`${status} testimonial ${rowId}`);
  };

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="bg-transparent text-blue-green justify-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-full scale-90 hover:bg-gray-300 hover:text-green-500 hover:scale-110 transition-all cursor-pointer"
        onClick={() => handleClick("Accepted")}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </button>
      <button
        className="bg-transparent text-blue-green justify-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-full scale-90 hover:bg-gray-300 hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
        onClick={() => handleClick("Declined")}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

// Mock TestimonialTableBody component
const MockTestimonialTableBody = ({ 
  setTotalPages, 
}: MockTestimonialTableBodyProps) => {
  // Mock the setTotalPages call
  React.useEffect(() => {
    setTotalPages(1);
  }, [setTotalPages]);

  return (
    <tbody>
      {mockTestimonialData.map((row, index) => (
        <MockTestimonialTableRow 
          key={row.testimonial_id} 
          row={row} 
          isLastRow={index === mockTestimonialData.length - 1}
        />
      ))}
    </tbody>
  );
};

// Mock TestimonialTableRow component
const MockTestimonialTableRow = ({ 
  row, 
  isLastRow 
}: { 
  row: MockTestimonialData; 
  isLastRow: boolean; 
}) => {
  const maxLengths: Record<string, number> = {
    testimonial: 40,
    name: 20,
    email: 30,
  };

  return (
    <tr
      className={`${isLastRow ? "" : "border-b-neutral-300 border-b-2 md:border-b-1"}
      ${row.is_approved === "Declined" ? "text-gray-400" : "text-blue-green"}
      text-sm xl:text-base h-27 md:h-18 lg:h-14`}
    >
      {mockColumns.map((col, colIdx) => {
        const cellValue = row[col.accessor as keyof MockTestimonialData];
        const maxLength = maxLengths[col.accessor] ?? Infinity;

        const shouldTruncate =
          typeof cellValue === "string" && cellValue.length > maxLength;

        const shortText = shouldTruncate ? 
          `${String(cellValue).slice(0, maxLength)}...` : cellValue;

        return (
          <td 
            key={colIdx} 
            className={`${col.header === "Rating" || col.header === "Status" ? 
              "text-center px-4" : "text-left pl-4 pr-3 md:pl-8 md:pr-4"}
            ${col.header === "User" ? "w-[15%] text-base" : ""}
            ${col.header === "Email" ? "w-[25%] hidden lg:table-cell" : ""} 
            ${col.header === "Status" ? "hidden md:table-cell" : ""}
            ${col.header === "Rating" ? "hidden sm:table-cell w-[5%]" : ""}
            ${col.header === "Review" ? "w-[55%] sm:w-[45%] md:w-[35%]" : ""}
            pt-4 sm:pt-0 align-top sm:align-middle`}
          >
            {col.header === "Status" ? (
              row.is_approved === "Accepted" || row.is_approved === "Declined" ? (
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  row.is_approved === "Accepted" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {row.is_approved}
                </span>
              ) : (
                <MockTestimonialStatusButtons rowId={String(row.testimonial_id)} />
              )
            ) : shouldTruncate ? (
              <div className="relative group">
                <span className="cursor-help">{shortText}</span>
                <div className="absolute z-10 invisible group-hover:visible bg-black text-white p-2 rounded shadow-lg text-sm max-w-xs">
                  {cellValue}
                </div>
              </div>
            ) : col.header === "Rating" ? (
              <span className="text-blue-green font-medium">{cellValue}</span>
            ) : (
              cellValue
            )}

            {/* Mobile responsive content */}
            {col.header === "User" && (
              <dl className="mt-0.5">
                <dt className="hidden">Email</dt>
                <dd className="text-gray-500 text-xs lg:hidden">{row.email}</dd>

                <div className="md:hidden h-0.25 w-full bg-gray-300 mt-2 mb-1"></div>

                <dt className="hidden">Status</dt>
                <dd className="md:hidden text-center mt-1">
                  {row.is_approved === "Accepted" || row.is_approved === "Declined" ? (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      row.is_approved === "Accepted" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {row.is_approved}
                    </span>
                  ) : (
                    <MockTestimonialStatusButtons rowId={String(row.testimonial_id)} />
                  )}
                </dd>
              </dl>
            )}
            
            {col.header === "Review" && (
              <dl className="sm:hidden mt-1">
                <dt className="hidden">Rating</dt>
                <dd className="text-gray-500 font-medium">
                  Rating: <span className="text-blue-green">{row.rating}</span>
                </dd>
              </dl>
            )}
          </td>
        );
      })}
    </tr>
  );
};

// Define the props interface for MockedTestimonialTable
interface MockedTestimonialTableProps {
  columns: AdminTableColumn[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  filters?: TestimonialFilters;
  body?: React.ReactNode;
}

// Mock the TestimonialTableBody import
const MockedTestimonialTable = (props: MockedTestimonialTableProps) => {
  return (
    <TestimonialTable
      {...props}
      body={
        <MockTestimonialTableBody
          currentPage={props.currentPage}
          setTotalPages={props.setTotalPages}
          filters={props.filters}
        />
      }
    />
  );
};

const meta: Meta<typeof TestimonialTable> = {
  title: "Admin/TestimonialTable",
  component: MockedTestimonialTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
TestimonialTable is a responsive admin table component for managing testimonials. 

Features:
- Responsive design with column hiding on smaller screens
- Status management (Accept/Decline testimonials)
- Text truncation with tooltips for long content
- Rating display with stars
- Mobile-optimized layout with collapsible information
        `,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current page number for pagination",
    },
    filters: {
      control: "object",
      description: "Filter object for table data",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-gray-50 min-h-screen">
        <style jsx global>{`
          .bg-blue-green {
            background-color: #0d9488;
          }
          .text-blue-green {
            color: #0d9488;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TestimonialTable>;

export const Default: Story = {
  args: {
    columns: mockColumns,
    currentPage: 1,
    setCurrentPage: (page: number) => console.log("Set page:", page),
    setTotalPages: (total: number) => console.log("Set total pages:", total),
  },
};

export const WithFilters: Story = {
  args: {
    columns: mockColumns,
    currentPage: 1,
    setCurrentPage: (page: number) => console.log("Set page:", page),
    setTotalPages: (total: number) => console.log("Set total pages:", total),
    filters: {
      name: "John",
      status: "Pending",
      rating: "5",
      date: "2024-01-15",
      clientName: "John Doe",
    },
  },
};

export const EmptyState: Story = {
  args: {
    columns: mockColumns,
    currentPage: 1,
    setCurrentPage: (page: number) => console.log("Set page:", page),
    setTotalPages: (total: number) => console.log("Set total pages:", total),
    body: (
      <tbody>
        <tr>
          <td colSpan={mockColumns.length} className="text-center py-8 text-gray-500">
            No testimonials found
          </td>
        </tr>
      </tbody>
    ),
  },
};

export const Loading: Story = {
  args: {
    columns: mockColumns,
    currentPage: 1,
    setCurrentPage: (page: number) => console.log("Set page:", page),
    setTotalPages: (total: number) => console.log("Set total pages:", total),
    body: (
      <tbody>
        {Array.from({ length: 5 }, (_, i) => (
          <tr key={i} className="animate-pulse">
            {mockColumns.map((_, colIdx) => (
              <td key={colIdx} className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    ),
  },
};

// Responsive breakpoint stories
export const Mobile: Story = {
  args: {
    columns: mockColumns,
    currentPage: 1,
    setCurrentPage: (page: number) => console.log("Set page:", page),
    setTotalPages: (total: number) => console.log("Set total pages:", total),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Tablet: Story = {
  args: {
    columns: mockColumns,
    currentPage: 1,
    setCurrentPage: (page: number) => console.log("Set page:", page),
    setTotalPages: (total: number) => console.log("Set total pages:", total),
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

export const Desktop: Story = {
  args: {
    columns: mockColumns,
    currentPage: 1,
    setCurrentPage: (page: number) => console.log("Set page:", page),
    setTotalPages: (total: number) => console.log("Set total pages:", total),
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};