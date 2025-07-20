"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Image from "next/image";

export default function Getusersbloginprofile({ email }) {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  
  const observer = useRef();
  const limit = 6;

  // Reset state when email changes
  useEffect(() => {
    if (email) {
      setBlogs([]);
      setPage(1);
      setHasMore(true);
      setInitialLoading(true);
      setError(null);
    }
  }, [email]);

  // Fetch blogs with useCallback to prevent unnecessary re-renders
  const fetchBlogs = useCallback(async (pageNum = 1, isInitial = false) => {
    if (!email) return;

    try {
      if (isInitial) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await axios.get(`/api/getblogsforuserinprofile`, {
        params: { 
          email, 
          page: pageNum, 
          limit,
          skip: (pageNum - 1) * limit // Calculate skip on frontend
        },
      });

      if (res.data.success) {
        const newBlogs = res.data.data;
        
        if (pageNum === 1) {
          // First load or reset
          setBlogs(newBlogs);
        } else {
          // Append new blogs, avoiding duplicates
          setBlogs(prevBlogs => {
            const existingIds = new Set(prevBlogs.map(blog => blog._id));
            const uniqueNewBlogs = newBlogs.filter(blog => !existingIds.has(blog._id));
            return [...prevBlogs, ...uniqueNewBlogs];
          });
        }

        setTotal(res.data.total);
        setHasMore(newBlogs.length === limit && (pageNum * limit) < res.data.total);
      } else {
        setError(res.data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [email, limit]);

  // Initial load
  useEffect(() => {
    if (email) {
      fetchBlogs(1, true);
    }
  }, [email, fetchBlogs]);

  // Load more blogs when page changes
  const loadMoreBlogs = useCallback(() => {
    if (!loading && hasMore && !initialLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBlogs(nextPage, false);
    }
  }, [loading, hasMore, page, fetchBlogs, initialLoading]);

  // Intersection Observer callback for infinite scroll
  const lastBlogElementRef = useCallback(node => {
    if (loading || initialLoading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreBlogs();
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px' // Start loading 50px before the element is visible
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreBlogs, initialLoading]);

  // Manual load more function
  const handleLoadMore = () => {
    loadMoreBlogs();
  };

  // Retry function
  const handleRetry = () => {
    if (blogs.length === 0) {
      fetchBlogs(1, true);
    } else {
      loadMoreBlogs();
    }
  };

  if (!email) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Users Blogs</h2>
        <p className="text-gray-500">No email provided.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users Blogs</h2>
        {total > 0 && (
          <span className="text-sm text-gray-600">
            Showing {blogs.length} of {total} blogs
          </span>
        )}
      </div>

      {initialLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg  p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-gray-300 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error && blogs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No blogs found for this user.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              ref={index === blogs.length - 1 ? lastBlogElementRef : null}
              className="bg-white   overflow-hidden transition-all duration-200   cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="w-full sm:w-48 h-48 sm:h-32 relative flex-shrink-0">
                  {blog.primaryImage ? (
                    <Image
                      src={blog.primaryImage}
                      alt={blog.title || "Blog image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {blog.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <span className="text-xs text-blue-500 hover:text-blue-600 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator for infinite scroll */}
          {loading && (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg  p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-32 h-24 bg-gray-300 rounded flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state for loading more */}
          {error && blogs.length > 0 && (
            <div className="text-center py-4">
              <p className="text-red-500 mb-2 text-sm">{error}</p>
              <button
                onClick={handleRetry}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Manual load more button (backup for infinite scroll) */}
          {hasMore && !loading && !error && (
            <div className="text-center py-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-blue-500 text-white  hover:bg-blue-600 transition-colors"
              >
                Load More Blogs
              </button>
            </div>
          )}

          {/* End of results indicator */}
          {!hasMore && blogs.length > 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">
                You ve reached the end! No more blogs to load.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}