"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/componenets/main/navbar/page";
import BlogFooter from "@/componenets/footer/inpagefooter";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const showFooter =
    pathname === "/userdashboard" ||
    pathname.startsWith("/userdashboard/categoryblog") ||
    pathname.startsWith("/userdashboard/readblog");

  return (
    <>
      <Navbar />
      {children}
      {showFooter && <BlogFooter />}
    </>
  );
}
