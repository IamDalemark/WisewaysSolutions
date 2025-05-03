import { Button } from "../ui/button";

interface Props {
    onChange: (status: "Accepted" | "Declined") => void;
};

const StatusColumnButtons = ({ onChange }: Props) => {
    return (
        <div className="flex gap-2 justify-center">
            <Button 
                className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark"
                onClick={() => onChange("Accepted")}
            >
            Accept
            </Button>
            <Button 
                className="bg-blue-green text-white px-3 py-1 rounded-md hover:bg-blue-green-dark"
                onClick={() => onChange("Declined")}
            >
            Decline
            </Button>
        </div>
    );
};

export default StatusColumnButtons;