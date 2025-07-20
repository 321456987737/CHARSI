"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Clock } from "lucide-react";

const StaffPickedPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const observer = useRef();
  const limit = 6;

  const fetchStaffPicks = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/blog/staffpicked", {
        params: { page, limit },
      });

      if (res.data.success) {
        setBlogs((prev) => {
          const existingIds = new Set(prev.map((blog) => blog._id));
          const newUniqueBlogs = res.data.blogs.filter(
            (blog) => !existingIds.has(blog._id)
          );
          return [...prev, ...newUniqueBlogs];
        });
        setHasMore(res.data.blogs.length === limit);
      }
    } catch (error) {
      console.error("Error fetching staff picks:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [page]);

  useEffect(() => {
    fetchStaffPicks();
  }, [fetchStaffPicks]);

  const lastBlogRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 0.5 }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // Custom skeleton loader component
  const BlogCardSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200 w-full"></div>
      <div className="p-5">
        <div className="h-6 w-24 rounded-full bg-gray-200 mb-4"></div>
        <div className="h-5 bg-gray-200 rounded mb-3 w-4/5"></div>
        <div className="h-5 bg-gray-200 rounded mb-3 w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-3/5"></div>
        <div className="flex justify-between mt-6 pt-4 shadow-t border-gray-100">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="flex gap-4">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] pb-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Staff Picks
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Curated stories worth your time, hand-selected by our editors
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isInitialLoad
          ? Array(6)
              .fill(0)
              .map((_, i) => <BlogCardSkeleton key={i} />)
          : blogs.map((blog, i) => (
              <article
                key={blog._id}
                ref={i === blogs.length - 1 ? lastBlogRef : null}
                className="bg-white rounded-xl overflow-hidden  border border-gray-100 transition-all duration-300 flex flex-col h-full  group"
              >
                <Link href={`/userdashboard/readblog/${blog._id}`}>
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {blog.primaryImage ? (
                    <Image
                      src={blog.primaryImage}
                      alt={blog.title}
                      fill
                      className="object-cover  transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 3}
                    />
                  ) : (
                    <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                      <Clock className="text-gray-400 h-12 w-12" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white bg-green-600 px-3 py-1 rounded-full mb-4">
                      {blog.category}
                    </span>

                    
                      <h2 className="text-xl font-semibold text-gray-900  transition-colors duration-200 mb-3 line-clamp-2 leading-tight">
                        {blog.title}
                      </h2>
                    

                    <p className="text-gray-600 mt-2 line-clamp-3 text-sm leading-relaxed">
                      {blog.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4  flex justify-between items-center text-sm">
                    <time className="text-gray-500 font-medium">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <div className="flex gap-4 items-center">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Heart
                          size={16}
                          className="text-red-500 fill-red-500/20"
                          />
                        <span className="font-medium">
                          {blog.likes?.toLocaleString() || 0}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Eye size={16} className="text-blue-500" />
                        <span className="font-medium">
                          {blog.views?.toLocaleString() || 0}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                          </Link>
              </article>
            ))}
      </div>

      {/* Loading State */}
      {isLoading && !isInitialLoad && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 "></div>
            <span>Loading more stories...</span>
          </div>
        </div>
      )}

      {/* No More Content */}
      {!hasMore && !isInitialLoad && (
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm font-medium">
            Youe reached the end of our staff picks
          </p>
          <Link
            href="/"
            className="inline-block mt-2 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Browse all articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default StaffPickedPage;