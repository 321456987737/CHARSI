"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

// Skeleton Loader Component
const BlogCardSkeleton = () => (
  <div className="animate-pulse rounded-xl border border-gray-300 p-4 shadow-sm bg-white">
    <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="flex justify-between items-center mt-auto">
      <div className="flex gap-4">
        <div className="h-3 w-10 bg-gray-200 rounded" />
        <div className="h-3 w-10 bg-gray-200 rounded" />
      </div>
      <div className="h-6 w-20 bg-gray-200 rounded" />
    </div>
  </div>
);

const Page = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const fetchBlogs = async (pageNo) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/blogwithcategory/${category}?page=${pageNo}`
      );
      const newBlogs = res.data.blogs;

      if (newBlogs.length === 0) {
        setIsEnd(true);
        setLoading(false);
        return;
      }

      setBlogs((prev) => [...prev, ...newBlogs]);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setBlogs([]);
      setPage(1);
      setIsEnd(false);
    }
  }, [category]);

  useEffect(() => {
    if (!isEnd) fetchBlogs(page);
  }, [page, isEnd]);

  // Infinite Scroll Observer
  const lastBlogRef = useCallback(
    (node) => {
      if (isEnd) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isEnd]
  );

  return (
    <div className="pt-[130px] px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        Blogs in {category?.replace(/%20/g, " ")}
      </h1>

      {loading && blogs.length === 0 ? (
        // Show skeletons during initial load
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found for this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {blogs.map((blog, i) => (
    <Link
      href={`/userdashboard/readblog/${blog._id}`}
      key={blog._id}
      ref={i === blogs.length - 1 ? lastBlogRef : null}
      className="group"
    >
      <div className="rounded-xl  p-4 border-gray-300 border  transition-all bg-white flex flex-col h-full">
        {/* Image */}
        {blog.primaryImage && (
          <div className="w-full h-40 relative rounded-md overflow-hidden mb-4">
            <Image
              src={blog.primaryImage}
              alt={blog.title}
              fill
              className="object-cover  transition-transform"
            />
          </div>
        )}

        {/* Title */}
        <h2 className="h-5 text-base font-semibold text-gray-900 line-clamp-2 mb-2">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="h-10 text-sm text-gray-600 line-clamp-2 mb-3">
          {blog.description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <div className="flex gap-4">
            <span>👁️ {blog.views}</span>
            <span>❤️ {blog.likes}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-800 font-medium">
              {blog.author?.username ||
                blog?.name ||
                blog?.username ||
                blog?.email?.split("@")[0] ||
                blog?.email}
            </span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

      )}
    </div>
  );
};

export default Page;
