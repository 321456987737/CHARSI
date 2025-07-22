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
  }, []);

  const addViews = async () => {
    await axios.patch(`/api/blog?id=${id}`);
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
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Recommended Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            onClick={addViews}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <Link href={`/userdashboard/readblog/${blog._id}`}>
              <div className="relative w-full h-48">
                <Image
                  src={blog.primaryImage || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
            </Link>

            <div className="p-4 space-y-2">
              <Link href={`/blog/${blog._id}`}>
                <h2 className="text-lg font-semibold text-gray-800 hover:underline line-clamp-2">
                  {blog.title}
                </h2>
              </Link>

              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.description}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
