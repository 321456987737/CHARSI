"use client";
import { useEffect, useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    followerAlerts: false,
    blogActivity: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
  const getnotification = async () => {
    try {
      const res = await fetch("/api/user/notifications");
      const data = await res.json();
      setSettings(data || {});
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notification settings:", err);
      setLoading(false);
    }
  };

  getnotification();
  }, []);

  const handleChange = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save settings");

      setMessage("✅ Preferences saved successfully");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>

      {loading ? (
        <p className="text-gray-500">Loading settings...</p>
      ) : (
        <div className="space-y-4">
          {[
            {
              name: "emailNotifications",
              label: "Receive email notifications",
            },
            {
              name: "followerAlerts",
              label: "Notify me when someone follows me",
            },
            {
              name: "blogActivity",
              label: "Notify me about comments or likes on my blogs",
            },
          ].map(({ name, label }) => (
            <label
              key={name}
              className="flex items-center justify-between bg-gray-50 border px-4 py-3 rounded-md"
            >
              <span>{label}</span>
              <input
                type="checkbox"
                checked={settings[name]}
                onChange={() => handleChange(name)}
                className="w-5 h-5 text-black focus:ring-black rounded"
              />
            </label>
          ))}

          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Preferences"}
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
      )}
    </section>
  );
}
