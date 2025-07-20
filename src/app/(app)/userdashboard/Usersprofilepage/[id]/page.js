"use client";

import ProfileAbout from "@/componenets/profilesections/right";
import ProfileStories from "@/componenets/profilesections/left";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfilePage() {
  const params = useParams();
  const email = params.id;

  const [Profile, setProfile] = useState(null); // use null initially
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/getuserprofile/${email}`);
      setProfile(res.data.data);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchProfile();
    }
  }, [email]);

  // ✅ Show loading or skeleton
  if (loading || !Profile) {
    return (
      <div className="pt-[120px] px-4 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-[120px] px-4">
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <aside className="w-full md:w-2/3 shrink-0">
          <ProfileAbout profile={Profile} />
        </aside>

        <div className="bg-green-700 w-[2px]" />

        <main className="w-1/3">
          <ProfileStories
            useremail={Profile.email}
            userid={Profile._id}
            userimage={Profile.profileImage}
            username={Profile.name || Profile.username}
            followers={Profile.followers}
            following={Profile.following}
            bio={Profile.bio}
          />
        </main>
      </div>
    </div>
  );
}
