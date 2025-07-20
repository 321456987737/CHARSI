"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ReadingHistory = () => {
  const { data: session, status } = useSession();
  const [readBlogs, setReadBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReadBlogs = async () => {
    if (!session?.user?.email) return;

    try {
      const res = await axios.get("/api/mark-as-read", {
        params: { email: session.user.email },
      });
      setReadBlogs(res.data.blogs || []);
    } catch (error) {
      console.error("Error fetching reading history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getReadBlogs();
    }
  }, [session, status]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 text-lg">Loading your reading history...</div>
    );

  if (readBlogs.length === 0)
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        You haven’t read any blogs yet.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 ">Reading History</h2>
      <ul className="space-y-4">
        {readBlogs.map((blog) => (
          <li key={blog._id} className="bg-white rounded-lg shadow flex items-center p-4 gap-4 hover:shadow-md transition border border-gray-100 hover:border-gray-300">
            {blog.primaryImage && (
              <Image
                src={blog.primaryImage}
                alt={blog.title}
                width={96}
                height={80}
                className="w-24 h-20 object-cover rounded-md border"
              />
            )}
            <div className="flex-1 min-w-0">
              <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
                <h3 className="text-lg font-semibold mb-1 hover:underline">{blog.title}</h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2 mb-1">{blog.description}</p>
              <div className="text-xs text-gray-400 flex gap-4">
                <span>By {blog.username || blog.author}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                <span>{blog.category}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingHistory;