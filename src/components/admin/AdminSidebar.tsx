"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
const items = [
  {
    title: "Appointments",
    url: "/admin/appointments",
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar className="h-full w-65">
      <SidebarHeader>
        <Image
          src={"/wiseways_navbar_logo.png"}
          alt="WiseWays Solution logo"
          width={190}
          height={51.5}
          className="mx-5 my-1"
        ></Image>
        <div className="w-full h-0.5 bg-blue-green mb-2"></div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild className="mb-3">
                  <Link href={item.url}>
                    <div className="flex items-center justify-between text-blue-green text-3xl font-medium ">
                      {item.title}
                      {pathname === item.url ? (
                        <ChevronRightIcon
                          className="w-5 h-5 ml-5 mt-1 font-3xl "
                          strokeWidth={3}
                        />
                      ) : null}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AdminSidebar;
