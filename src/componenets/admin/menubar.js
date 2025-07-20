"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart2,
  MessageCircle,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/admin" },
  { label: "Blogs", icon: <FileText size={18} />, href: "/admin/blogs" },
  { label: "Users", icon: <Users size={18} />, href: "/admin/users" },
  { label: "Settings", icon: <Settings size={18} />, href: "/admin/settings" },
  { label: "Analytics", icon: <BarChart2 size={18} />, href: "/admin/analytics" },
];

export default function Menubar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger button on small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full cursor-pointer border border-gray-400 bg-gray-50"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar drawer */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-60 bg-gray-50 border-r shadow-lg p-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0`}
      >
        {/* Close button only on mobile */}
        <div className="md:hidden flex justify-end mb-4 ">
          <button onClick={closeMenu} className="cursor-pointer hover:bg-gray-50 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-6 tracking-wide text-gray-700">
          Admin Panel
        </h2>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium
                  ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
