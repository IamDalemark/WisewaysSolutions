import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  rowId: string;
}

const StatusColumnButtonsBooking = ({ rowId }: Props) => {
  const handleStatusChange = async (status: "Pending" | "Accepted" | "Declined") => {
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
      <Button
        className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all"
        onClick={() => handleStatusChange("Accepted")}
      >
        Accept
      </Button>
      <Button
        className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all"
        onClick={() => handleStatusChange("Declined")}
      >
        Decline
      </Button>
    </div>
  );
};

export default StatusColumnButtonsBooking;