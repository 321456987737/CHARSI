"use client";
import React, { useState } from "react";
import Logo from "@/componenets/logo/page";
import { useSession, signOut } from "next-auth/react";
import Writingsystem from "./writingsystem";

import {
  MoreHorizontal,
  LogOut,
  User,
  BookOpen,
  FileText,
  BarChart2,
  Settings,
  Sparkles,
  Landmark,
  HelpCircle,
  Star,
  Globe,
  ShieldCheck,
  BadgeCheck,
  Gift,
  Bell,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const [aboutUser, setAboutUser] = useState(false);

  const menuSection1 = [
    {
      name: "Profile",
      icon: <User className="w-4 h-4" />,
      href: "/userdashboard/profile",
    },
    {
      name: "Library",
      icon: <BookOpen className="w-4 h-4" />,
      href: "/userdashboard/library",
    },
    {
      name: "Stories",
      icon: <FileText className="w-4 h-4" />,
      href: "/userdashboard/story",
    },
    {
      name: "Stats",
      icon: <BarChart2 className="w-4 h-4" />,
      href: "/userdashboard/stats",
    },
  ];

  const menuSection2 = [
    {
      name: "Settings",
      icon: <Settings className="w-4 h-4" />,
      href: "/userdashboard/settings",
    },
    {
      name: "Refine recommendations",
      icon: <Sparkles className="w-4 h-4" />,
      href: "/userdashboard/Refinerecommendations",
    },
    {
      name: "Manage publications",
      icon: <Landmark className="w-4 h-4" />,
      href: "#",
    },
    { name: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "/help" },
  ];

  const menuSection3 = [
    {
      name: "Become a Medium member",
      icon: <Star className="w-4 h-4" />,
      href: "/plans",
    },
    {
      name: "Create a Mastodon account",
      icon: <Globe className="w-4 h-4" />,
      href: "#",
    },
    {
      name: "Apply for author verification",
      icon: <ShieldCheck className="w-4 h-4" />,
      href: "/verified-authors",
    },
    {
      name: "Apply to the Partner Program",
      icon: <BadgeCheck className="w-4 h-4" />,
      href: "/partner-program",
    },
    {
      name: "Gift a membership",
      icon: <Gift className="w-4 h-4" />,
      href: "/gift-plans",
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <div className="fixed top-0 z-50 w-full bg-white/60 border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 sm:gap-0">
          {/* Left Section */} 
          <div className="flex ml-[-85px] items-center gap-3 sm:gap-6 flex-shrink-0">
            <Logo  />
            {session?.user?.username && (
              <div className="text-sm text-gray-600 font-medium hidden sm:block truncate max-w-[100px]">
                {session.user.username}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <button className="hover:bg-gray-100 p-2 rounded-full transition">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>

            <Link href="/userdashboard/notification">
              <button className="hover:bg-gray-100 p-2 rounded-full transition">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </Link>

            <div className="relative">
              <div
                onClick={() => setAboutUser(!aboutUser)}
                className="cursor-pointer"
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
                )}
              </div>

              {/* Dropdown */}
              {aboutUser && (
                <div className="absolute right-0 mt-3 w-64 sm:w-72 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-4 space-y-4">
                  {/* Section 1 */}
                  <div className="space-y-1">
                    {menuSection1.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Section 2 */}
                  <div className="space-y-1 border-t pt-2 border-gray-200">
                    {menuSection2.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Section 3 */}
                  <div className="space-y-1 border-t pt-2 border-gray-200">
                    {menuSection3.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Section 4 */}
                  <div className="space-y-2 border-t pt-2 border-gray-200">
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                    <div className="text-xs text-gray-500 px-3 truncate">
                      {session?.user?.email?.replace(
                        /(?<=.).(?=[^@]*?@)/g,
                        "•"
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to avoid overlap with fixed navbar */}
      <div className="pt-[75px]" />
      <div>
        {" "}
        <Writingsystem />{" "}
      </div>
    </div>
  );
};

export default Page;
