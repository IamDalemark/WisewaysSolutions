import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import { ModalProvider } from "@/components/contexts/ModalContext";
import Modals from "@/components/modals/modals";
import { UserProvider } from "@/components/contexts/UserContext";

const inter = Inter({
  subsets: ["latin"],
});
const interTight = Inter_Tight({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wiseways Solutions",
  description: "Generated by create next app",
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
          <ModalProvider>
            <NavBar />
            <Modals />
            {children}
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
