"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/componenets/main/navbar/page";
import BlogFooter from "@/componenets/footer/inpagefooter";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  // Show footer only on these specific pages
  const showFooter = [
    "/userdashboard",
    "/userdashboard/categoryblog",
    "/userdashboard/readblog",
  ].some((path) => pathname?.startsWith(path));

  return (
    <>
      <Navbar />
      {children}
      {showFooter && <BlogFooter />}
    </>
  );
}
