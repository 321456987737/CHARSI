"use client";
import Link from "next/link";
import React from "react";
import Logo from "@/componenets/logo/page";
const Navbar = () => {
  return (
    <div className="h-[75px] border-b-[1px] fixed border-solid w-full z-50 bg-amber-50   flex items-center justify-center ">
      <div className="w-[80%] flex items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="ml-[-110px]">
            <Logo />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 flex-nowrap">
          <div className="md:flex hidden gap-4">
            <button className="hover:cursor-pointer ">
              <Link href={"/about"}>Our Story</Link>
            </button>
            <button className="hover:cursor-pointer">
              <Link href={"/membership"}>Membership</Link>
            </button>
            <button className="hover:cursor-pointer">
              <Link href={"/writing"}>Write</Link>
            </button>
            <button className="hover:cursor-pointer">
              <Link href={"/signin"}>SignIn</Link>
            </button>
          </div>
          <div className="mr-[-15px]">
            <Link href="/signup">
              <button className="bg-black text-white px-4 py-2 text-md rounded-full cursor-pointer inline-block">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
