import { Button } from "../ui/button";

interface Props {
    onChange: (status: "Accepted" | "Declined") => void;
};

const StatusColumnButtons = ({ onChange }: Props) => {
    return (
        <div className="flex gap-2 justify-center">
            <Button 
                className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all cursor-pointer"
                onClick={() => onChange("Accepted")}
            >
            Accept
            </Button>
            <Button 
                className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all cursor-pointer"
                onClick={() => onChange("Declined")}
            >
            Decline
            </Button>
        </div>
    );
};

export default StatusColumnButtons;

// import { Button } from "../ui/button";
// import { supabase } from "@/lib/supabaseClient";

// interface Props {
//     rowId: number;
//     onStatusUpdate?: (newStatus: string) => void;
//   }


// const StatusColumnButtons = ({ rowId, onStatusUpdate }: Props) => {
//     const handleStatusChange = async (status: "Pending" | "Accepted" | "Declined") => {
//         const { error } = await supabase
//           .from("testimonial")
//           .update({ is_approved: status })
//           .eq("id", rowId);
    
//         if (error) {
//           console.error("Failed to update status:", error);
//           return;
//         }

//         onStatusUpdate?.(status);
//     }
//     ;
//     return (
//         <div className="flex gap-2 justify-center">
//             <Button 
//                 className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all cursor-pointer"
//                 onClick={() => handleStatusChange("Accepted")}
//             >
//             Accept
//             </Button>
//             <Button 
//                 className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark hover:scale-105 transition-all cursor-pointer"
//                 onClick={() => handleStatusChange("Declined")}
//             >
//             Decline
//             </Button>
//         </div>
//     );
// };

// export default StatusColumnButtons;