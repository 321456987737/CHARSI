"use client";
import Menubar from "@/componenets/admin/menubar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen relative">
      <Menubar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
