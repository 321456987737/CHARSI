"use client";

import React, { useState, useEffect } from "react";
import Logo from "@/componenets/logo/page";
import Suggestion from "@/componenets/suggesttopics/page";
import {
  Pencil,
  Bell,
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
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Searchbar from "@/componenets/search/page"; // Assuming you have a Searchbar component
const Page = () => {
  const { data: session } = useSession();
  const [aboutUser, setAboutUser] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 50) {
        setShowTopBar(false); // scrolling down
      } else {
        setShowTopBar(true); // scrolling up
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuSection1 = [
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/userdashboard/profile" },
    { name: "Library", icon: <BookOpen className="w-4 h-4" />, href: "/userdashboard/library" },
    { name: "Stories", icon: <FileText className="w-4 h-4" />, href: "/userdashboard/story" },
    { name: "Stats", icon: <BarChart2 className="w-4 h-4" />, href: "/userdashboard/stats" },
  ];

  const menuSection2 = [
    { name: "Settings", icon: <Settings className="w-4 h-4" />, href: "/userdashboard/settings" },
    { name: "Refine recommendations", icon: <Sparkles className="w-4 h-4" />, href: "/userdashboard/Refinerecommendations" },
    { name: "Manage publications", icon: <Landmark className="w-4 h-4" />, href: "/userdashboard/settings" },
    { name: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "/help" },
  ];

  const menuSection3 = [
    { name: "Become a Medium member", icon: <Star className="w-4 h-4" />, href: "/plans" },
    { name: "Apply to the Partner Program", icon: <BadgeCheck className="w-4 h-4" />, href: "/membership" },
    // { name: "Gift a membership", icon: <Gift className="w-4 h-4" />, href: "/gift-plans" },
  ];

  return (
    <>
      {/* Top Bar: Moves up by 64px */}
      <div
        className={`fixed w-full z-50 bg-slate-50  transition-transform duration-300 ${
          showTopBar ? "translate-y-0" : "-translate-y-[70px]"
        }`}
      >
        <div className="w-full px-6 flex items-center justify-between h-[64px]">
          {/* Logo */}
          <div className="flex items-center gap-4 w-[20%] min-w-[100px] ml-[-80px]">
            <Logo />
          </div>

          {/* Search */}
          <div className="flex-1 px-4">
            {/* <input
              type="text"
              placeholder="Search"
              className="w-full max-w-md px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none tracking-wide"
            /> */}
            <Searchbar/>
          </div>

          {/* Icons & Avatar */}
          <div className="flex items-center gap-5 w-[20%] justify-end relative">
            <Link href="/writing">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <Pencil className="w-5 h-5 text-gray-700" />
              </button>
            </Link>

            <Link href="/userdashboard/notification">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
            </Link>

            <div onClick={() => setAboutUser(!aboutUser)} className="relative cursor-pointer">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
              )}

              {/* Dropdown */}
              {aboutUser && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg p-4 shadow-md min-w-[270px] z-50 space-y-4">
                  {[menuSection1, menuSection2, menuSection3].map((section, i) => (
                    <div key={i} className={`space-y-1 ${i !== 0 ? "border-t pt-2 border-gray-200" : ""}`}>
                      {section.map((item, j) => (
                        <Link
                          key={j}
                          href={item.href}
                          className="flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}

                  <div className="border-t pt-2 space-y-2 border-gray-200">
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                    <div className="text-xs text-gray-500 px-3 truncate">
                      {session?.user?.email?.replace(/(?<=.).(?=[^@]*?@)/g, "•")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggestion Bar: Always visible */}
        <div className="border-t flex w-[100vw] items-center justify-center border-gray-300  bg-white">
          <div className="w-[75%]">
          <Suggestion />
          </div>
        </div>
      </div>

      {/* Page Content: Padding to avoid being behind fixed header */}
      </>
  );
};

export default Page;
