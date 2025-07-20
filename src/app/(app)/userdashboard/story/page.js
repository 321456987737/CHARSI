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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 pt-[150px]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Stories</h2>
        <Link 
          href="/writing" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + New Story
        </Link>
      </div>

      {myblogs.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No stories yet</h3>
          <p className="text-gray-500 mb-4">Start writing and share your thoughts with the world</p>
          <Link 
            href="/writing" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Create your first story
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {myblogs.map((blog) => (
            <div key={blog._id} className="flex flex-col sm:flex-row gap-6 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {blog.primaryImage && (
                <div className="sm:w-64 h-48 sm:h-auto relative">
                  <Image
                    src={blog.primaryImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <Link href={`/userdashboard/readblog/${blog._id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/userdashboard/readblog/${blog._id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1"
                  >
                    Read story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <div className="flex space-x-2">
                    <Link 
                      href={`/userdashboard/edit-blog/${blog._id}`}
                      className="text-gray-500 hover:text-gray-700 p-2"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Storysection;