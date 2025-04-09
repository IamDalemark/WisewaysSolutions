import { Phone, Mail, MapPin } from "lucide-react";

type Icons = "Phone" | "Mail" | "MapPin"

const getIconFromName = (iconName: Icons) => {
  switch (iconName) {
    case "Phone":
        return <Phone size={30}/>;
    case "Mail":
        return <Mail size={30}/>;
    case "MapPin":
        return <MapPin size={30}/>;
  };
};

interface ContactDetailProp {
    iconName: Icons;
    description: string;
}

const ContactDetail = ({iconName, description}: ContactDetailProp) => {
    const icon = getIconFromName(iconName);

    return (
        <div className="flex my-[6%]">
            {icon}
            <p className="ml-3 text-md lg:text-xl font-medium">{description}</p>
        </div>
    );
};

export default ContactDetail;