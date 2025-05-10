import { supabase } from "@/lib/supabaseClient";
import { Check, X } from "lucide-react";

interface Props {
  rowId: string;
}

const StatusColumnButtonsBooking = ({ rowId }: Props) => {
  const handleStatusChange = async (
    status: "Pending" | "Accepted" | "Declined"
  ) => {
    const { error } = await supabase
      .from("booking")
      .update({ status })
      .eq("booking_id", rowId);

    if (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="flex items-center justify-center bg-transparent text-blue-green h-8 w-8 sm:h-9 sm:w-9 rounded-full scale-90 hover:bg-gray-300 hover:text-green-500 hover:scale-110 transition-all cursor-pointer"
        onClick={() => handleStatusChange("Accepted")}
      >
        <Check size={30} strokeWidth={2.5} />
      </button>
      <button
        className="flex items-center justify-center bg-transparent text-blue-green h-8 w-8 sm:h-9 sm:w-9 rounded-full scale-90 hover:bg-gray-300 hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
        onClick={() => handleStatusChange("Declined")}
      >
        <X size={30} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default StatusColumnButtonsBooking;
