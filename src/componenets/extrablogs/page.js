"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get("/api/recomendedblog?id=" + id);
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [id]);

  const addViews = async (blogId) => {
    try {
      await axios.patch(`/api/blog?id=${blogId}`);
    } catch (err) {
      console.error("Error adding view:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-blue-500">
        Loading recommended blogs…
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="flex h-60 items-center justify-center text-red-500">
        No blogs found.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Recommended Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            href={`/userdashboard/readblog/${blog._id}`}
            key={blog._id}
            onClick={() => addViews(blog._id)}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="relative w-full h-48">
                <Image
                  src={blog.primaryImage || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:underline line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.description}
                </p>

                <p className="text-xs text-gray-400 pt-1">
                  Posted on {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Page;
