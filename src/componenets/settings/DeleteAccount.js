"use client";
import { useState } from "react";

export default function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch("/api/user/delete-account", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete");

      setFeedback("✅ Account deleted. Redirecting...");
      setTimeout(() => {
        window.location.href = "/"; // or sign-out route
      }, 2000);
    } catch (err) {
      setFeedback(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mt-8 border border-red-200">
      <h2 className="text-xl font-semibold text-red-600 mb-2">Delete Account</h2>
      <p className="text-sm text-gray-600 mb-4">
        Warning: This will permanently delete your account and all related data. This action cannot be undone.
      </p>

      <input
        type="text"
        placeholder="Type DELETE to confirm"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        className="w-full border border-red-400 rounded-md p-2 text-red-600 placeholder:text-red-400"
      />

      <button
        disabled={confirmText !== "DELETE" || loading}
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete My Account"}
      </button>

      {feedback && (
        <p
          className={`mt-3 text-sm ${
            feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </p>
      )}
    </section>
  );
}
