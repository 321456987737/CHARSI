"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-amber-50 to-white flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="text-green-600 w-20 h-20 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 text-lg mb-6">
        Thank you for your purchase. You can now access your dashboard.
      </p>

      <Link
        href="/userdashboard"
        className="inline-block bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Page;
