"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, X, Edit3, Trash2, ChevronDown } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

 export const AdminUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const search = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/admin/searchusers`, {
          params: { q: searchTerm },
          signal: controller.signal,
        });
        setResults(data.users || []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Search error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 350);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/user/${selectedUser._id}`);
      setSelectedUser(null);
      setSearchTerm("");
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    console.log(newRole);
    try {
      await axios.patch(`/api/admin/user/${selectedUser._id}`, {
        role: newRole,
      });
      setSelectedUser({ ...selectedUser, role: newRole });
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  const handleAnalytics = () => {
    router.push(`/admin/useranalytics/${selectedUser._id}`);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div
          className={`flex items-center border border-gray-400 rounded-xl overflow-hidden transition-all duration-300 ${
            isExpanded ? "ring-2 ring-gray-400 shadow-md" : "hover:shadow-sm"
          }`}
        >
          <div className="pl-4 pr-2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email, or keyword..."
            className="w-full p-3 outline-none bg-transparent placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedUser(null);
              setIsExpanded(true);
            }}
            onFocus={() => setIsExpanded(true)}
          />
          <div className="flex items-center pr-3 space-x-2">
            {searchTerm && !isLoading && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 transition-transform"
            >
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {isExpanded && searchTerm && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 mt-2 w-full bg-white shadow-xl rounded-xl border border-gray-100 max-h-80 overflow-auto"
            >
              {isLoading ? (
                <div className="p-4 flex justify-center">
                  <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                </div>
              ) : results.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {results.map((user) => (
                    <motion.li
                      key={user._id}
                      whileHover={{
                        backgroundColor: "rgba(243, 244, 246, 0.5)",
                      }}
                      className="p-4 cursor-pointer transition-colors flex items-center gap-4"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsExpanded(false);
                      }}
                    >
                      <Image
                        src={user.profileImage || "/default-profile.png"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover border"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{user.username}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm.trim()
                    ? "No matching users found"
                    : "Start typing to search"}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected User */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <Image
                    src={selectedUser.profileImage || "/default-profile.png"}
                    alt="profile"
                    width={60}
                    height={60}
                    className="rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedUser.username}
                    </h2>
                    <p className="text-sm text-gray-600">{selectedUser.email}</p>
                    <p className="text-sm text-gray-400 mt-1 italic">
                      {selectedUser.bio || "No bio provided"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-6">
                  {/* Role Selector */}
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow transition">
                    <Edit3 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 font-medium">Role:</span>
                    <select
                      value={selectedUser.role || "user"}
                      onChange={handleRoleChange}
                      className="bg-transparent text-sm text-blue-600 font-semibold outline-none cursor-pointer"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-white border border-red-200 rounded-lg px-4 py-2 text-red-600 font-semibold shadow-sm hover:bg-red-50 hover:shadow transition"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete User
                  </button>

                  {/* Analytics */}
                  <button
                    onClick={handleAnalytics}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 font-semibold shadow-sm hover:bg-gray-100 hover:shadow transition"
                  >
                    📊 View Analytics
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <span>Liked Blogs: {selectedUser.likedblogs?.length}</span>
                  <span>Saved Blogs: {selectedUser.savedblogs?.length}</span>
                  <span>Followers: {selectedUser.followers?.length}</span>
                  <span>Following: {selectedUser.following?.length}</span>
                  <span>Account Created: {new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                  <span>Status: <span className="text-green-600">{selectedUser.status}</span></span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
