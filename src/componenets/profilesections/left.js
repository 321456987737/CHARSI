"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileStories({
  userimage,
  username,
  followers = [],
  following = [],
  userid,
  useremail,
  bio,
}) {
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email;

  const [followerCount, setFollowerCount] = useState(followers.length);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState({
    check: true,
    follow: false,
  });
  const [userblogs, setUserblogs] = useState([]);

  // Check if user is following
  useEffect(() => {
    if (!currentUserEmail || !userid) return;

    const checkFollowStatus = async () => {
      setIsLoading((prev) => ({ ...prev, check: true }));
      try {
        const res = await axios.get("/api/check-follow-status", {
          params: {
            followerId: currentUserEmail,
            followingId: userid,
          },
        });
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        console.error("Error checking follow status:", err);
      } finally {
        setIsLoading((prev) => ({ ...prev, check: false }));
      }
    };

    checkFollowStatus();
  }, [currentUserEmail, userid]);
const [orginalusersblogs, setOrginalusersblogs] = useState([])
  // Fetch user blogs
  useEffect(() => {
    if (!userid) return;

    const getlistofblogs = async () => {
      try {
        const blogofuser = await axios.get(`/api/getuserblogs/${useremail}`);
        setUserblogs(blogofuser.data.data);
        if (blogofuser.data.success) {
          const getblogfromdatabseofusers = await axios.get(`/api/getuserblogswithemail/${useremail}`);
        setOrginalusersblogs(getblogfromdatabseofusers.data.blogs)
        console.log(getblogfromdatabseofusers.data.blogs)
        }
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      }
    };

    getlistofblogs();
  }, [userid]);

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (!currentUserEmail || isLoading.follow) return;

    setIsLoading((prev) => ({ ...prev, follow: true }));

    try {
      const action = isFollowing ? "unfollow" : "follow";
      await axios.patch("/api/follow", {
        action,
        followerId: currentUserEmail,
        followingId: userid,
      });

      setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
      setIsFollowing((prev) => !prev);
    } catch (err) {
      console.error("Follow/Unfollow error:", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, follow: false }));
    }
  };

  const formattedFollowers =
    followerCount >= 1000 ? `${(followerCount / 1000).toFixed(1)}K` : followerCount;

  // Show loader if user id or session isn't ready
  if (!userid || isLoading.check) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="rounded-full bg-gray-200 h-24 w-24 mx-auto"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 flex items-center justify-center rounded-full">
          <img
            src={userimage || "/default-avatar.png"}
            alt={username}
            width={0}
            height={0}
            className="object-cover rounded-full w-full h-full"
          />
        </div>
      </div>

      {/* Info & Follow */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold">{username}</h1>
        <p className="text-sm text-gray-500">
          {formattedFollowers} followers • {following.length} following
        </p>
        <p className="text-gray-600 text-sm">{bio}</p>

        {currentUserEmail && currentUserEmail !== userid && (
          <button
            onClick={handleFollowToggle}
            disabled={isLoading.follow}
            className={`mt-3 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              isFollowing
                ? "bg-white text-black border border-gray-300 hover:border-red-300 hover:text-red-500"
                : "bg-black text-white hover:bg-gray-800"
            } ${isLoading.follow ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading.follow ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Blogs */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Recent Blogs</h3>
        {userblogs.length === 0 ? (
          <p className="text-gray-500 text-sm">No blogs published yet.</p>
        ) : (
          <ul className="space-y-4">
  {orginalusersblogs.map((blog, index) => (
    <li key={index} className="flex gap-4 p-4  rounded-lg ">
      {/* Blog Image */}
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={blog.primaryImage || "/default-thumbnail.png"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Info */}
      <div className="flex flex-col justify-between">
        <h4 className="text-base font-semibold">{blog.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{blog.description}</p>
        <div className="text-xs text-gray-500">
          By <span className="font-medium">{blog.username}</span> •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </div>
    </li>
  ))}
</ul>

        )}
      </div>
    </div>
  );
}
