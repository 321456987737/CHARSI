"use client";

import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import axios from "axios";

export default function MarkAsSaved({ blogId, initialSaved, userEmail }) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!userEmail || !blogId) return;

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
    <button
      onClick={handleSave}
      disabled={loading}
      title={saved ? "Saved" : "Save this blog"}
      className="flex items-center gap-1 px-3 py-1 rounded-lg border hover:bg-gray-100 text-sm transition duration-200 disabled:opacity-50"
    >
      {saved ? (
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      ) : (
        <Save className="w-4 h-4 text-gray-600" />
      )}
      {saved ? "Saved" : "Save"}
    </button>
  );
}
