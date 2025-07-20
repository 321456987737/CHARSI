"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
export default function BioSettings() {
  const { data: session } = useSession();
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user's bio on load
  useEffect(() => {
  const fetchBio = async () => {
    if (!session?.user?.email) return;
    try {
      console.log(1)
      const res = await axios.get("/api/user/bio");
      console.log(1)

      setBio(res.data.bio || "");
    } catch (err) {
      setMessage("❌ Failed to load bio.");
    }
  };
  fetchBio();
}, [session?.user?.email]);

const handleSave = async () => {
  setLoading(true);
  setMessage("");
  try {
    const res = await axios.patch("/api/user/bio", {
      email: session.user.email,
      bio
    });
    if (res.status === 200) {
      setMessage("✅ Bio updated successfully.");
    }
  } catch (err) {
    setMessage("❌ Failed to update bio. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mt-8 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Bio</h2>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={5}
        className="w-full p-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
        placeholder="Write a few lines about yourself..."
      />

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handleSave}
          disabled={loading || bio.trim().length < 3}
          className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {message && (
          <span
            className={`text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </span>
        )}
      </div>
    </section>
  );
}
