"use client";
import { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isValid = () => {
    return (
      currentPassword.length >= 6 &&
      newPassword.length >= 6 &&
      newPassword === confirmPassword
    );
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error changing password");

      setMessage("✅ Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="bg-black text-white px-4 py-2 rounded-md mt-2 disabled:opacity-50"
          disabled={!isValid() || loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
