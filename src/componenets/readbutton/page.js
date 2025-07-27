"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { BookOpenCheck, Loader2 } from "lucide-react";

const MarkAsReadButton = ({ blogId }) => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [loading, setLoading] = useState(false);
  const [marked, setMarked] = useState(false);
  const [error, setError] = useState("");

  const handleMarkAsRead = async () => {
    setError("");
    if (!email || !blogId || loading) return;

    setLoading(true);
    try {
      const res = await axios.patch("/api/mark-as-read", {
        id: blogId,
        email,
      });

      if (res.data.success) {
        setMarked(true);
      } else {
        setError("Failed to mark as read.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="relative w-[46px] h-[46px] flex flex-col items-center justify-center  group">
      <button
        onClick={handleMarkAsRead}
        disabled={loading || marked || !email}
        className={`
           rounded-full transition-all duration-200
          ${marked ? "text-green-600" : "text-gray-500 hover:text-green-500"}
          ${loading || !email ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
        `}
      >
        {loading ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <BookOpenCheck
            size={22}
            className={`transition-all ${marked ? "fill-green-600" : "fill-transparent"}`}
            strokeWidth={2}
          />
        )}
      </button>

      {/* Tooltip */}
      <span
        className={`
          absolute -top-8 px-2 py-1 rounded-md text-xs text-white bg-gray-800 shadow-sm
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none
        `}
      >
        {loading ? "Marking..." : marked ? "Marked as Read" : "Mark as Read"}
      </span>

      {error && (
        <p className="text-red-500 text-xs mt-1 animate-pulse">{error}</p>
      )}
    </div>
  );
};

export default MarkAsReadButton;
