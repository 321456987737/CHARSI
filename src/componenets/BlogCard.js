"use client";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BlogCardSkeleton = ({ compact = false }) => {
  return (
    <article className="group">
      <div
        className={`${
          compact
            ? "py-6 border-b border-gray-100 last:border-b-0"
            : "p-6 mb-6"
        } transition-all duration-200 animate-pulse`}
      >
        <div className="flex items-start gap-4">
          {/* Small colored icon skeleton */}
          <div className="w-8 h-8 rounded-sm bg-gray-300 flex-shrink-0 mt-1"></div>

          <div className="flex-1 min-w-0">
            {/* Category and author info skeleton */}
            <div className="text-sm mb-2 flex items-center gap-1">
              <div className="h-3 bg-gray-300 rounded w-8"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
              <div className="h-3 bg-gray-300 rounded w-6"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>

            {/* Title skeleton */}
            <div className="mb-3">
              <div className={`h-5 bg-gray-300 rounded w-3/4 ${compact ? 'mb-1' : 'mb-2'}`}></div>
              <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Date skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>

          {/* Optional image skeleton for non-compact view */}
          {!compact && (
            <div className="w-20 h-20 flex-shrink-0 bg-gray-300 rounded-lg"></div>
          )}
        </div>

        {/* Description skeleton for non-compact view */}
        {!compact && (
          <div className="mt-3 ml-12">
            <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        )}
      </div>
    </article>
  );
};

const BlogCard = React.forwardRef(({ blog, compact = false, isLoading = false }, ref) => {
  const router = useRouter();
  const [image, setImage] = useState(null);

  // Show skeleton if loading or no blog data
  if (isLoading || !blog) {
    return <BlogCardSkeleton compact={compact} />;
  }

  const addViews = async () => {
    try {
      await axios.patch(`/api/blog?id=${blog._id}`);
    } catch (err) {
      console.error("Error updating views:", err);
    }
  };

  const getimage = async () => {
    try {
      const res = await axios.get("/api/getimage", {
        params: { email: blog?.email },
      });
      setImage(res.data.image);
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };
  useEffect(() => {
    if (blog?.email) {
     getimage();
    }
  }, [blog?.email]);

  return (
    <article ref={ref} className="group">
      <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
        <div
          onClick={addViews}
          className={`${
            compact
              ? " border-b border-gray-100 last:border-b-0"
              : "p-6 mb-6"
          } transition-all duration-200 `}
        >
          <div className="flex items-start gap-4">
            {/* Small icon */}
            <div className="w-8 h-8 rounded-sm bg-gray-200 flex-shrink-0 flex items-center justify-center mt-1">
              {image ? (
                <img
                  src={image}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : (
                <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* Category and author info */}
              <div className="text-sm text-gray-600 mb-2">
                <span>In </span>
                {blog.category && (
                  <>
                    <span className="font-medium text-gray-800">
                      {blog.category}
                    </span>
                    <span> by </span>
                  </>
                )}

                <span
                  className="font-medium text-gray-800 hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`/userdashboard/Usersprofilepage/${blog.email}`);
                  }}
                >
                  {blog.author ||
                    blog?.name ||
                    blog?.username ||
                    blog?.email.split("@")[0] ||
                    blog?.email}
                </span>

                {blog.verified && (
                  <span className="inline-block ml-1">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                className={`${
                  compact ? "text-lg" : "text-xl"
                } font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-gray-700 transition-colors`}
              >
                {blog.title}
              </h2>

              {/* Date with star icon */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Optional image for non-compact view */}
            {!compact && blog.primaryImage && (
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={blog.primaryImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>

          {/* Description for non-compact view */}
          {!compact && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-3 ml-12">
              {blog.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
});

BlogCard.displayName = "BlogCard";
export default BlogCard;