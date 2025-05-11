import { useUpdateTestimonialStatus } from "@/app/hooks/admin/useUpdateTestimonialStatus";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
interface Props {
  rowId: string;
}

const TestimonialStatusButtons = ({ rowId }: Props) => {
  const { updateStatus } = useUpdateTestimonialStatus();
  const router = useRouter();
  const handleClick = async (status: "Accepted" | "Declined") => {
    const result = await updateStatus(rowId, status);
    router.refresh();
    if (!result.success) {
      console.error("Failed to update status:", result.error);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="bg-transparent text-blue-green justify-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-full scale-90 hover:bg-gray-300 hover:text-green-500 hover:scale-110 transition-all cursor-pointer"
        onClick={() => handleClick("Accepted")}
      >
        <Check size={30} strokeWidth={2.5} />
      </button>
      <button
        className="bg-transparent text-blue-green justify-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-full scale-90 hover:bg-gray-300 hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
        onClick={() => handleClick("Declined")}
      >
        <X size={30} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default TestimonialStatusButtons;
