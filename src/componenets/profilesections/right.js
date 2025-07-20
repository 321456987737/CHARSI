"use client";
import Image from "next/image";
import { useState } from "react";
import Getusersbloginprofile from "@/componenets/getuserblogsinprofile/[id]/page";

export default function MediumProfileHeader({ profile }) {
  const [activeTab, setActiveTab] = useState("blogs"); // Default to showing blogs

  if (!profile || !profile._id) {
    return (
      <div className="text-center text-gray-500 py-10">Loading profile...</div>
    );
  }

  const { username, email, aboutText, bio } = profile;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 font-serif">
      {/* Profile Top Section */}
      <div className="flex items-center gap-5">
        {/* Profile Image */}

        {/* Name, Email, Follower Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{username}</h1>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>
       
              <div>
                <h2 className="text-md font-semibold text-gray-900 mt-2 mb-[-5px]">Bio</h2>
                <p className="text-gray-700">{bio}</p>
              </div>
          

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mt-4">
        <button
          onClick={() => setActiveTab("blogs")}
          className={`px-4 py-2 font-medium ${
            activeTab === "blogs"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Blogs
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 font-medium ${
            activeTab === "about"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          About
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "blogs" ? (
          <div>
            <Getusersbloginprofile email={email} />
          </div>
        ) : (
          <div className="space-y-6">
            {aboutText && (
              <div>
                <h2 className="text-md font-semibold text-gray-900 mb-1">
                  About me
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {aboutText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}