"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Storysection = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [myblogs, setMyblogs] = useState([]);

  const myblogsdata = async () => {
    try {
      const res = await axios.get(`/api/myblogs/${encodeURIComponent(email)}`);
      setMyblogs(res.data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch your blogs:", err);
    }
  };

  useEffect(() => {
    if (email) myblogsdata();
  }, [email]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">📚 Your Stories</h2>

      <ul className="space-y-4">
        {myblogs.length === 0 ? (
          <p className="text-gray-500">
            You haven’t published any blogs yet.
          </p>
        ) : (
          myblogs.map((blog) => (
            <li
              key={blog._id}
              className="bg-white rounded-lg shadow flex items-center p-4 gap-4 hover:shadow-md transition border border-gray-100 hover:border-gray-300"
            >
              {blog.primaryImage && (
                <Link
                  href={`/userdashboard/readblog/${blog._id}`}
                  className="block flex-shrink-0"
                >
                  <Image
                    src={blog.primaryImage}
                    alt={blog.title}
                    width={96}
                    height={80}
                    className="w-24 h-20 object-cover rounded-md border"
                  />
                </Link>
              )}

              <div className="flex-1 min-w-0">
                <Link
                  href={`/userdashboard/readblog/${blog._id}`}
                  className="block"
                >
                  <h3 className="text-lg font-semibold mb-1 hover:underline">
                    {blog.title}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm line-clamp-2 mb-1">
                  {blog.description}
                </p>

                <div className="text-xs text-gray-400 flex gap-4">
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <span>{blog.category}</span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Storysection;
