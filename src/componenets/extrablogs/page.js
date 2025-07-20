"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
const Page = () => {
  const { id } = useParams();
  console.log(id);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ───────────── Fetch blogs once on mount ───────────── */
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get("/api/recomendedblog?id=" + id);
        setBlogs(res.data.blogs); // ← array of blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  /* ───────────── UI ───────────── */
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
  const addviews = async()=>{
    await axios.patch(`/api/blog?id=${id}`);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Recommended Blogs</h1>

      <ul className="flex flex-col gap-4 ">
        {blogs.map((blog) => (
          <li
          onClick={addviews}
          key={blog._id}
          className="flex flex-col sm:flex-row overflow-hidden  border-b border-gray-200 pb-6  bg-white  duration-300"
          >
          
            {/* --- Text Content --- */}
            <div className="flex-1 p-6 space-y-2">
              <Link href={`/blog/${blog._id}`}>
                <h2 className="text-2xl font-bold text-gray-800 hover:underline line-clamp-2">
                  {blog.title}
                </h2>
              </Link>

              <p className="text-base text-gray-600 line-clamp-3">
                {blog.description}
              </p>

              <p className="text-sm text-gray-500 mt-4">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* --- Image --- */}
            <div className="relative w-full sm:w-[350px] h-64 sm:h-44 flex-shrink-0">
              <Link href={`/userdashboard/readblog/${blog._id}`}>
                <Image
                  src={blog.primaryImage || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover  transition-transform duration-300 hover:scale-105  "
                  priority
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Page;
