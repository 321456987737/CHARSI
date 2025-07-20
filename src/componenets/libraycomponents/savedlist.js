"use client"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from "next/link"

const Savedlist = () => {
  const { data: session } = useSession();
  const [savedblogs, setSavedblogs] = useState([]);

  const savedBlogs = async () => {
    if (!session?.user?.email) return;
    const response = await axios.get("/api/getsavedblogs", {
      params: { email: session.user.email }
    });
    setSavedblogs(response.data.data || []);
  };

  useEffect(() => {
    if (session?.user?.email) {
      savedBlogs();
    }
    // eslint-disable-next-line
  }, [session?.user?.email]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Saved Blogs</h2>
      {savedblogs.length === 0 ? (
        <p className="text-gray-500 text-center">No saved blogs yet.</p>
      ) : (
        <ul className="space-y-4">
          {savedblogs.map(blog => (
            <li key={blog._id} className="bg-white rounded-lg shadow flex items-center p-4 gap-4 hover:shadow-md transition">
              {blog.primaryImage && (
                <img
                  src={blog.primaryImage}
                  alt={blog.title}
                  className="w-24 h-20 object-cover rounded-md border"
                />
              )}
              <div className="flex-1">
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
      )}
    </div>
  );
};

export default Savedlist;