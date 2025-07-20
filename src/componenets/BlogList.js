"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import useBlogStore from "@/stores/blogStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function LoadBlogs() {
  const router = useRouter();
  const { blogs, hasMore, loading, loadingMore, error, fetchLatestBlogs, fetchMoreBlogs } = useBlogStore();
  const observer = useRef();
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false); // ✅ tracks if fetch happened at least once

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
    fetchLatestBlogs().finally(() => setHasFetchedOnce(true)); // ✅ mark fetch completion
  }, []);
  const addViews = async (blogId) => {
    try {
      await axios.patch(`/api/blog?id=${blogId}`);
    } catch (err) {
      console.error("Error updating views:", err);
    }
  };

  // ✅ Show skeleton loader if loading initially
  if (loading && blogs.length === 0) {
    return (
      <div className="space-y-6 p-4 max-w-2xl mx-auto">
  {Array.from({ length: 3 }).map((_, i) => (
    <div key={i} className="animate-pulse bg-white p-4 rounded-2xl">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left side: text */}
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="flex items-center justify-between pt-2 mt-2">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-6" />
              <div className="h-4 bg-gray-200 rounded w-6" />
              <div className="h-4 bg-gray-200 rounded w-6" />
            </div>
          </div>
        </div>

        {/* Right side: image placeholder */}
        <div className="w-full md:w-48 flex-shrink-0">
          <div className="w-full h-32 md:h-40 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  ))}
</div>

    );
  }

  // ✅ Only show error after first fetch attempt
  if (error && hasFetchedOnce) return <div className="text-red-500">{error}</div>;

  // ✅ Only show "No blogs found" if fetched and still empty
  if (hasFetchedOnce && blogs.length === 0) {
    return <div className="text-center text-gray-500">No blogs found.</div>;
  }

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {blogs.map((blog, index) => (
  <div
    onClick={() => addViews(blog._id)}
    key={blog._id}
    ref={index === blogs.length - 1 ? lastBlogRef : null}
    className="cursor-pointer p-4 hover:shadow-sm rounded-2xl transition-shadow bg-white "
  >
    <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left Side - Text */}
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-gray-600">{blog.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t mt-2">
            <div>
              <span className="font-medium text-gray-800">{blog.username}</span>
              <span className="ml-2">• {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>👁 {blog.views}</span>
              <span>❤️ {blog.likes}</span>
              <span>💬 {blog.comments?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        {blog.primaryImage && (
          <div className="w-full md:w-48 flex-shrink-0">
            <img
              src={blog.primaryImage}
              alt={blog.title}
              className="w-full h-0 md:h-28 object-cover "
            />
          </div>
        )}
      </div>
    </Link>
  </div>
))}

    </div>
  );
}
