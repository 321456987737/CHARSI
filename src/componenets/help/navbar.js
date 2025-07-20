"use client";

import Link from "next/link";
import { Menu, HelpCircle } from "lucide-react";

export default function HelpNavbar() {
  return (
    <nav className="bg-black text-white px-4 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-white" />
          <Link href="/" className="text-lg font-semibold hover:text-gray-300 transition">
            Medium Help Center
          </Link>
        </div>

        {/* Nav Links (hidden on small screens) */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/help/Gettingstarted" className="hover:text-gray-300">Getting Started</Link>
          <Link href="/help/Managingyouraccount" className="hover:text-gray-300">Account</Link>
          <Link href="/help/Writing&editing" className="hover:text-gray-300">Writing</Link>
          <Link href="/help/PartnerProgram" className="hover:text-gray-300">Partner Program</Link>
        </div>

        {/* Mobile menu icon (optional) */}
        <button className="md:hidden">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
