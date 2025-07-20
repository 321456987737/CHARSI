"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
export default function GettingStartedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <Globe className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Getting Started</h1>
        <p className="text-gray-300 max-w-xl">
          Learn how to sign up, set up your profile, and start using Medium.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full">
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">1. Sign In or Create an Account</h2>
          <p className="text-gray-700">
            Go to <strong>medium.com</strong> and click “Sign in.” Use Google, Apple, or email to log in.
            If youre new, youll be prompted to create a new account quickly.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">2. Set Up Your Profile</h2>
          <p className="text-gray-700">
            After signing in, visit <strong><Link href="/signup"> Settings </Link></strong> to customize:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li>Profile picture</li>
            <li>Bio and username</li>
            <li>Social media links</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">3. Discover Content</h2>
          <p className="text-gray-700">
            Use the homepage to find and follow writers, topics, and publications that interest you.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">4. Start Writing</h2>
          <p className="text-gray-700">
            Click the “Write” button to create a story. Add text, images, embeds, and format freely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Engage with the Community</h2>
          <p className="text-gray-700">
            Highlight text, leave thoughtful comments, and share stories that resonate with you.
          </p>
        </section>
      </div>
    </div>
  );
}
