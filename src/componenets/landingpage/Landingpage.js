"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Landingpagefooter from "@/componenets/footer/landingpagefooter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Page = () => {
  const {data: session} = useSession();
  const router = useRouter();
  return (
    <div className="w-full min-h-screen pt-[60px] bg-[#FFFBF0] flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-200px)]">
            
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center lg:text-left space-y-8"
            >
              <motion.div
                variants={fadeUp}
                custom={1}
                className="inline-flex items-center px-4 py-2 bg-[#fff6e6]/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-lg"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Join 50K+ active readers
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  variants={fadeUp}
                  custom={2}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 bg-clip-text text-transparent">
                    Human stories
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    & ideas
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl leading-relaxed"
                >
                  Discover extraordinary stories, share your thoughts, and connect with a community of curious minds.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button 
                 onClick={()=>{session?router.push("/userdashboard"):router.push("/signin")}}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="relative z-10">Start exploring</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-[#fff6e6]/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <Link href={"/about"}>
                  Learn more
                  </Link>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                custom={5}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/50"
              >
                {[
                  { value: "10M+", label: "Stories read" },
                  { value: "50K+", label: "Active writers" },
                  { value: "4.9★", label: "User rating" },
                ].map((item, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                <div className="relative bg-[#FFFBF0] p-2 rounded-3xl shadow-2xl">
                  <Image
                    src="/4_SdjkdS98aKH76I8eD0_qjw.webp"
                    alt="Creative writing and storytelling"
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-2xl object-cover"
                    priority
                  />

                  {/* Floating Cards */}
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl transform rotate-6 transition-transform duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg"></div>
                    <div className="mt-2 text-xs font-semibold text-gray-700">Latest Story</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ rotate: -12 }}
                    className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl transform -rotate-6 transition-transform duration-300"
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="mt-2 text-xs font-semibold text-gray-700">Active Now</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200/50 bg-[#FFFBF0] backdrop-blur-sm">
        <Landingpagefooter />
      </div>
    </div>
  );
};

export default Page;
