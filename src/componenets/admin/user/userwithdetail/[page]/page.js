"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/admin/authorwithdetails?page=${page}`);
        setUsers((prev) => [...prev, ...res.data.Users]);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const loadMore = () => {
    if (page < totalPages && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">👥 All Users</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Profile</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">About</th>
              <th className="px-4 py-3">Blogs</th>
              <th className="px-4 py-3">Saved</th>
              <th className="px-4 py-3">Liked</th>
              <th className="px-4 py-3">Read</th>
              <th className="px-4 py-3">Followers</th>
              <th className="px-4 py-3">Following</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={user.profileImage || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{user.username}</td>
                <td className="px-4 py-3 text-blue-600">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 truncate max-w-[200px]" title={user.aboutText}>
                  {user.aboutText || "N/A"}
                </td>
                <td className="px-4 py-3 text-center">{user.blogs?.length || 0}</td>
                <td className="px-4 py-3 text-center">{user.savedblogs?.length || 0}</td>
                <td className="px-4 py-3 text-center">{user.likedblogs?.length || 0}</td>
                <td className="px-4 py-3 text-center">{user.readblogs?.length || 0}</td>
                <td className="px-4 py-3 text-center">{user.followers?.length || 0}</td>
                <td className="px-4 py-3 text-center">{user.following?.length || 0}</td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {page < totalPages && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserTable;
