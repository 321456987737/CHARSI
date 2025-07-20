"use client"
import React from 'react';
import Link from 'next/link';
const Landingpagefooter = () => {
  return (
    <div className="bg-amber-50 w-full py-8">
      <div className="flex flex-wrap justify-center items-center gap-4 text-gray-500 text-[12px]">
        <span className="cursor-pointer hover:underline">Help</span>
        <span className="cursor-pointer hover:underline">Status</span>
        <span className="cursor-pointer hover:underline">
          <Link href={'/about'}>
          About
          </Link>
          </span>
        <span className="cursor-pointer hover:underline">Careers</span>
        <span className="cursor-pointer hover:underline">Press</span>
        <span className="cursor-pointer hover:underline">Blog</span>
        <span className="cursor-pointer hover:underline">Privacy</span>
        <span className="cursor-pointer hover:underline">Rules</span>
        <span className="cursor-pointer hover:underline">Terms</span>
        <span className="cursor-pointer hover:underline">Text to speech</span>
      </div>
    </div>
  );
};

export default Landingpagefooter;
