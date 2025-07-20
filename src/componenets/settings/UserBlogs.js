"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function UserBlogs() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs/user");
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("❌ Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [session]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`/api/blogs/${id}`);
      if (res.status === 200) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog.");
    }
  };

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">You havent written any blogs yet.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 border rounded-md hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-1 text-gray-700 line-clamp-2">{blog.content}</p>

              <div className="flex gap-4 mt-3">
                <Link
                  href={`/edit-blog/${blog._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
