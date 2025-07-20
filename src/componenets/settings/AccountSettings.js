"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ImageIcon } from "lucide-react";

export default function AccountSettings() {
  const { data: session, status } = useSession();
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.image) {
      setImagePreview(session.user.image);
    }
  }, [session]);

  if (status === "loading") return <div className="p-6">Loading...</div>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!imageFile || !session?.user?.email) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("email", session.user.email);

    try {
      const res = await fetch("/api/user/update-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Profile image updated!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      <div className="flex items-center gap-6 mb-6">
        {/* Profile Image Preview */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-300">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <ImageIcon className="w-full h-full text-gray-400" />
          )}
        </div>

        {/* File Input & Upload Button */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm"
          />
          <button
            onClick={handleImageUpload}
            className="mt-2 px-4 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* Email (Read-only) */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          value={session?.user?.email || ""}
          disabled
          className="mt-1 block w-full bg-gray-100 border border-gray-300 text-gray-600 rounded-md p-2"
        />
      </div>
    </section>
  );
}
