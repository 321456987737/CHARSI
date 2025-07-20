"use client";
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import axios from 'axios';

const Page = ({ blogId }) => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [loading, setLoading] = useState(false);
  const [marked, setMarked] = useState(false);
  const [error, setError] = useState("");

  const handleMarkAsRead = async () => {
   console.log(11)
    setError("");
    if (!email) {
      setError("User not authenticated");
      return;
    }
    if (!blogId) {
      setError("No blog ID provided");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch("/api/mark-as-read", {
        id: blogId,
        email,
      });
      const result = res.data;
      if (result.success) {
        setMarked(true);
      } else {
        setError(result.message || "Failed to mark as read.");
      }
    } catch (err) {
      setError("Error while marking as read.");
    }
    setLoading(false);
  };

  return (
    <div>
 <button
  onClick={handleMarkAsRead}
  disabled={loading || marked}
  className={`
    px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
    flex items-center gap-2 shadow-md
    ${marked || loading
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400"}
  `}
>
  {marked ? "✅ Marked as Read" : loading ? "⏳ Marking..." : "📖 Mark as Read"}
</button>


  {error && (
    <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>
  )}
</div>

  );
};

export default Page;





