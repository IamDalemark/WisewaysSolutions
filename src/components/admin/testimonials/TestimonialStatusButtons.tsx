import { Button } from "@/components/ui/button";
import { useUpdateTestimonialStatus } from "@/app/hooks/admin/useUpdateTestimonialStatus";

interface Props {
    rowId: string;
  }

const TestimonialStatusButtons = ({ rowId }: Props) => {
    const { updateStatus } = useUpdateTestimonialStatus();

    const handleClick = async (status: "Accepted" | "Declined") => {
      const result = await updateStatus(rowId, status);
  
      if (!result.success) {
        console.error("Failed to update status:", result.error);
      }
    };
  

    return (
        <div className="flex gap-2 justify-center">
            <Button 
                className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all cursor-pointer"
                onClick={() => handleClick("Accepted")}
            >
            Accept
            </Button>
            <Button 
                className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all cursor-pointer"
                onClick={() => handleClick("Declined")}
            >
            Decline
            </Button>
        </div>
    );
};

export default TestimonialStatusButtons;