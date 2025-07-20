"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SocialConnections() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState("followers");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/social")
      .then((res) => res.json())
      .then((data) => {
        setFollowers(data.followers || []);
        setFollowing(data.following || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching social data:", err);
        setLoading(false);
      });
  }, []);

  const handleUnfollow = async (userEmail) => {
    const res = await fetch("/api/user/unfollow", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    });

    if (res.ok) {
      setFollowing((prev) => prev.filter((user) => user.email !== userEmail));
    }
  };

  const activeList = activeTab === "followers" ? followers : following;

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Social Connections</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("followers")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "followers"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Followers ({followers.length})
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "following"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Following ({following.length})
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : activeList.length === 0 ? (
        <p className="text-gray-500">No users to show in this list.</p>
      ) : (
        <ul className="space-y-4">
          {activeList.map((user) => (
            <li
              key={user.email}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-xs text-gray-500 w-full h-full flex items-center justify-center">
                      👤
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              {activeTab === "following" && (
                <button
                  onClick={() => handleUnfollow(user.email)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Unfollow
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
