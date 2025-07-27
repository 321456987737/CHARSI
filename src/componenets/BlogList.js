"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import useBlogStore from "@/stores/blogStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Eye, Heart, MessageCircle } from "lucide-react";

export default function LoadBlogs() {
  const router = useRouter();
  const {
    blogs,
    hasMore,
    loading,
    loadingMore,
    error,
    fetchLatestBlogs,
    fetchMoreBlogs,
  } = useBlogStore();
  const observer = useRef();
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  const lastBlogRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreBlogs();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, hasMore, fetchMoreBlogs]
  );

  useEffect(() => {
    fetchLatestBlogs().finally(() => setHasFetchedOnce(true));
  }, []);

  const addViews = async (blogId) => {
    try {
      await axios.patch(`/api/blog?id=${blogId}`);
    } catch (err) {
      console.error("Error updating views:", err);
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="animate-pulse bg-white p-4 rounded-2xl"
            style={{
              animationDelay: `${i * 100}ms`,
              animationDuration: '1s'
            }}
          >
            <div className="h-40 bg-gray-200 rounded-lg mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="flex items-center justify-between mt-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="flex gap-2">
                <div className="h-4 w-6 bg-gray-200 rounded" />
                <div className="h-4 w-6 bg-gray-200 rounded" />
                <div className="h-4 w-6 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && hasFetchedOnce) return <div className="text-red-500">{error}</div>;
  if (hasFetchedOnce && blogs.length === 0) {
    return <div className="text-center text-gray-500">No blogs found.</div>;
  }

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .blog-card {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            onClick={() => addViews(blog._id)}
            key={blog._id}
            ref={index === blogs.length - 1 ? lastBlogRef : null}
            className="blog-card border border-gray-300 cursor-pointer p-4 hover:shadow-md rounded-2xl transition-shadow bg-white flex flex-col justify-between"
            style={{ 
              animationDelay: `${(index % 6) * 100}ms`
            }}
          >
            <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
              {blog.primaryImage && (
                <img
                  src={blog.primaryImage}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}

              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-3">{blog.description}</p>

              <div className="text-sm text-gray-500 pt-2 mt-2 border-t">
                <div className="flex justify-between items-center mt-2">
                  <span>
                    <span className="font-medium text-gray-800">{blog.username}</span> •{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{blog.views}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={16} />
                    <span>{blog.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    <span>{blog.comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* Loading indicator for infinite scroll */}
        {loadingMore && (
          <>
            <div className="animate-pulse bg-white p-4 rounded-2xl">
              <div className="h-40 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="flex items-center justify-between mt-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="flex gap-2">
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
            <div className="animate-pulse bg-white p-4 rounded-2xl">
              <div className="h-40 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="flex items-center justify-between mt-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="flex gap-2">
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
            <div className="animate-pulse bg-white p-4 rounded-2xl">
              <div className="h-40 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="flex items-center justify-between mt-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="flex gap-2">
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}