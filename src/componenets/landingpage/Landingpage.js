import React from "react";
import Image from "next/image";
import Landingpagefooter from "@/componenets/footer/landingpagefooter";
import Link from "next/link";
const Page = () => {
  return (
    <div className="w-full min-h-screen pt-[60px] flex flex-col justify-between">
      {/* Main Section */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Section */}
        <div className="md:w-[60%] w-full flex items-center justify-center px-8 text-center py-12">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-xl mx-auto">
              Human stories & ideas
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto">
              A place to read, write, and deepen your understanding.
            </p>
            <div className="flex justify-center">
              <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition">
                <Link href={"/signup"}>
                Start reading
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-[40%] w-full relative hidden md:flex items-start justify-end pr-8">
          <div className="mt-10">
            <Image
              src="/4_SdjkdS98aKH76I8eD0_qjw.webp"
              alt="Author"
              width={420}
              height={420}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t">
        <Landingpagefooter />
      </div>
    </div>
  );
};

export default Page;
