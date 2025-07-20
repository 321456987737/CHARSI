"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 },
  }),
};

const Settings = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/getadmin");
    setUsers(res.data.users);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user, index) => (
            <motion.div
              key={user._id}
              className="bg-white shadow-md rounded-xl px-4 py-4 flex items-center gap-4"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              {/* Profile Picture */}
              <img
                src={user.profileImage}
                alt={user.username}
                className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
              />

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{user.username}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-600 line-clamp-1 italic">
                      {user.aboutText}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md">
                    {user.role}
                  </span>
                </div>

                {/* Stats & Notifications */}
                <div className="flex justify-between mt-3 text-xs text-gray-600">
                  <div className="flex gap-4">
                    <Stat label="Blogs" value={user.blogs?.length || 0} />
                    <Stat label="Liked" value={user.likedblogs?.length || 0} />
                    <Stat label="Saved" value={user.savedblogs?.length || 0} />
                  </div>
                  <div className="hidden md:flex gap-2 text-green-600 font-medium">
                    {user.notificationSettings?.emailNotifications && <span>Email 🔔</span>}
                    {user.notificationSettings?.followerAlerts && <span>Followers 👥</span>}
                    {user.notificationSettings?.blogActivity && <span>Blogs ✍️</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="text-center">
    <p className="font-semibold">{value}</p>
    <p className="text-gray-400">{label}</p>
  </div>
);

export default Settings;
