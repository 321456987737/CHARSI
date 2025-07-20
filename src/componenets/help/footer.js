"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function HelpFooter() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Column 1: Branding */}
        <div>
          <h2 className="text-xl font-bold mb-3">Medium Help Center</h2>
          <p className="text-sm text-gray-400">
            Everything you need to get the most out of Medium — learn, write, and grow.
          </p>
        </div>

        {/* Column 2: Help Topics */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase text-gray-300 tracking-wide">Help Topics</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/help/Gettingstarted" className="hover:text-white">Getting Started</Link></li>
            <li><Link href="/help/Managingyouraccount" className="hover:text-white">Account</Link></li>
            <li><Link href="/help/Reading" className="hover:text-white">Reading</Link></li>
            <li><Link href="/help/Managingstories" className="hover:text-white">Stories</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase text-gray-300 tracking-wide">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/help/Terms&Policies" className="hover:text-white">Terms</Link></li>
            <li><Link href="/help/Content" className="hover:text-white">Content Policy</Link></li>
            <li><Link href="/help/Safety" className="hover:text-white">Safety</Link></li>
          </ul>
        </div>

        {/* Column 4: Social */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase text-gray-300 tracking-wide">Connect</h3>
          <div className="flex items-center gap-5">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-gray-300">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Medium Help Center. All rights reserved.
      </div>
    </footer>
  );
}

