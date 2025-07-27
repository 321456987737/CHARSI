"use client";

import { useState } from "react";
import { Save, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";

export default function MarkAsSaved({ blogId, initialSaved, userEmail }) {
  const [saved, setSaved] = useState(initialSaved || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!userEmail || !blogId || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.patch("/api/saveblog", {
        blogId,
        email: userEmail,
      });

      if (response.status === 200) {
        setSaved((prev) => !prev);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-[46px] h-[46px] group">
      <button
        onClick={handleSave}
        disabled={loading || !userEmail}
        className={`
          p-2 rounded-full transition-all duration-200
          ${saved ? "text-green-600" : "text-gray-500 hover:text-blue-600"}
          ${loading || !userEmail ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
        `}
      >
        {loading ? (
          <Loader2 size={22} className="animate-spin" />
        ) : saved ? (
          <CheckCircle2
            size={22}
            className="fill-green-600 text-green-600 transition-all"
          />
        ) : (
          <Save
            size={22}
            className="fill-transparent transition-all"
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
        {loading ? "Saving..." : saved ? "Saved" : "Save"}
      </span>

      {error && (
        <p className="text-red-500 text-xs mt-1 animate-pulse">{error}</p>
      )}
    </div>
  );
}
