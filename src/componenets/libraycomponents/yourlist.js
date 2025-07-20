"use client";
import { useState,useEffect } from 'react';
import Link from 'next/link';
import { BookmarkCheck, X } from "lucide-react";
import ProfileLeftSection from "@/app/(app)/userdashboard/profile/page"; // ✅ import from component, not a page!

const YourList = () => {
  const [activeTab, setActiveTab] = useState(true);
  // ✅ Load from localStorage on first render
  return (
    <div>
      {activeTab && (
        <div className='relative flex flex-col overflow-hidden justify-center pl-8 gap-5 w-full h-[170px] bg-green-700 mb-10'>
          <div
            onClick={() => setActiveTab(false)}
            className=' hover:bg-gray-600/10 active:bg-gray-700/20 cursor-pointer text-white h-8 w-8 flex text-2xl items-center justify-center rounded-full absolute top-4 right-4'
          >
            <X className='h-6 w-6' />
          </div>

          <div className='absolute h-64 w-64 bg-green-400 right-12 flex items-center justify-center rounded-full'>
            <BookmarkCheck className='h-12 w-12 text-black' />
          </div>

          <div className='md:max-w-[350px]'>
            <span className='font-bold text-2xl'>Create a list to easily organize and share stories</span>
          </div>

          <div>
            <Link href="/writing">
              <button className='px-5 py-2 bg-black text-white rounded-full font-bold text-md'>
                Start creating your list now
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className='mt-[-150px]'>
        <ProfileLeftSection />
      </div>
    </div>
  );
};

export default YourList;
