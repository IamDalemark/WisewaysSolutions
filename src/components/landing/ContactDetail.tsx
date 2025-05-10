// component for the details in the contact us section of the landing page

import { Phone, Mail, MapPin } from "lucide-react";

type Icons = "Phone" | "Mail" | "MapPin"

const getIconFromName = (iconName: Icons) => {
  switch (iconName) {
    case "Phone":
        return <Phone size={32}/>;
    case "Mail":
        return <Mail size={32}/>;
    case "MapPin":
        return <MapPin size={32}/>;
  };
};

interface ContactDetailProp {
    iconName: Icons;
    description: string;
}

const ContactDetail = ({iconName, description}: ContactDetailProp) => {
    const icon = getIconFromName(iconName);

    return (
        <div className="flex my-[5%] lg:my-[7%]">
            {icon}
            <p className="ml-6 text-xl lg:text-2xl font-medium">{description}</p>
        </div>
    );
};

export default ContactDetail;