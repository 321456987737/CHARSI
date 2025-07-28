"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ghost, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-50 blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-amber-100 blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-amber-50 blur-2xl opacity-30"></div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl w-full"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-br from-amber-100 to-amber-50 p-6 rounded-full shadow-lg border border-amber-200/50"
          >
            <Ghost className="w-16 h-16 text-amber-600" />
          </motion.div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
        >
          404 - Page Not Found
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          The page you re looking for doesn t exist or may have been moved. 
          Do  t worry though, you can find your way back home.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transition-all duration-300 px-6 py-3 rounded-lg text-lg shadow-md hover:shadow-lg">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </Link>
          <Link href="/help" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50 transition-all duration-300 px-6 py-3 rounded-lg text-lg shadow-sm hover:shadow-md">
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 text-sm text-gray-400"
      >
        <p>Error code: 404 | {new Date().getFullYear()} © Your Company</p>
      </motion.div>
    </div>
  );
}