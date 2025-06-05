import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import NavBarWrapper from "@/components/navbar/NavBarWrapper";
import { ModalProvider } from "@/components/contexts/ModalContext";
import Modals from "@/components/modals/modals";
import { UserProvider } from "@/components/contexts/UserContext";
import { ToastProvider } from "@/components/contexts/ToastContext";
import { ToastContainer } from "@/components/toast/ToastContainer";

const inter = Inter({
  subsets: ["latin"],
});
const interTight = Inter_Tight({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wiseways Solutions",
  description: "Your Virtual Assistance Provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${interTight.className} bg-gray-white antialiased`}
      >
        <UserProvider>
          <ToastProvider>
            <ModalProvider>
              <NavBarWrapper />
              <Modals />
              <ToastContainer position="bottom-right" />
              {children}
            </ModalProvider>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
