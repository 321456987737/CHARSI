"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch blogs when `page` changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/admin/blogwithdetails?page=${page}`);
        setBlogs((prev) => [...prev, ...res.data.blogs]); // append
        console.log(res.data.blogs);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]); // ✅ triggers on every page change

  const loadMore = () => {
    if (page < totalPages && !loading) {
      setPage((prev) => prev + 1); // triggers useEffect again
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">📃 All Blogs</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
         <thead className="bg-gray-50 border-b border-gray-200">
  <tr>
    <th className="px-6 py-3 font-medium text-gray-600">Title</th>
    <th className="px-6 py-3 font-medium text-gray-600">Author</th>
    <th className="px-6 py-3 font-medium text-gray-600">Status</th>
    <th className="px-6 py-3 font-medium text-gray-600">Views</th>
    <th className="px-6 py-3 font-medium text-gray-600">Category</th>
    <th className="px-6 py-3 font-medium text-gray-600">Created</th>
  </tr>
</thead>

<tbody>
  {blogs.map((blog) => (
    <tr key={blog._id} className="border-b border-gray-200">
      <td className="px-6 py-4">{blog.title}</td>
      <td className="px-6 py-4">{blog?.name || blog?.username || blog?.email || "Unknown"}</td>
      <td className="px-6 py-4 capitalize">{blog.status || "draft"}</td>
      <td className="px-6 py-4">{blog.views ?? 0}</td>
      <td className="px-6 py-4 capitalize">{blog.category || "N/A"}</td>
      <td className="px-6 py-4">
        {new Date(blog.createdAt).toLocaleDateString()}
      </td>
  </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Load More Button */}
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

export default AdminBlogTable;
