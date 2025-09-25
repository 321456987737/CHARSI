"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Extrablogs from "@/componenets/extrablogs/page";
import { useSession } from "next-auth/react";
import { UserRound } from "lucide-react";
import LikeButton from "@/componenets/likebutton/page";
import MarkasRead from "@/componenets/readbutton/page";
import MarkasSaved from "@/componenets/savedbutton/page";
import Inpagefooter from "@/componenets/footer/inpagefooter"
const COMMENTS_LIMIT = 10;

const ReadBlogPage = () => {
  const { data: session } = useSession();
  const { id } = useParams();
  const email = session?.user?.email;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlog = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/singalblog/${id}?page=${page}&limit=${COMMENTS_LIMIT}`);
      setBlog(res.data.blog);
      setTotalPages(res.data.blog.totalPages);
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  const addComment = async () => {
    if (!comment.trim()) return;
    try {
      setSubmitting(true);
      await axios.patch("/api/addcomment", {
        id,
        user: {
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
          id: session?.user?.sub,
          username: session?.user?.name,
        },
        text: comment.trim(),
      });
      setComment("");
      fetchBlog();
    } catch (err) {
      console.error("Failed to submit comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-blue-500"><ReadBlogSkeleton/></div>;
  if (!blog) return <div className="text-center py-20 text-red-500">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pt-[135px]">
      <h1 className="text-3xl font-bold mb-2 leading-tight text-gray-900">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>

      {blog.primaryImage && (
        <img
          src={blog.primaryImage}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8 shadow"
        />
      )}

      <div className="prose prose-lg max-w-none mb-12">
        <p>{blog.description}</p>
        {blog.sections?.map((section, i) => (
          <div key={i} className="my-8">
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
            {section.image && (
              <img
                src={section.image}
                alt={`Section ${i + 1}`}
                className="rounded-lg mt-4 w-full shadow max-h-[400px] object-cover" 
              />
            )}
          </div>
        ))}
      </div>

      {/* Buttons Row */}
      <div className="flex justify-center gap-6 mb-12 ">
        <LikeButton
          blogId={blog._id}
          initialLikes={blog.likes}
          initialLiked={blog.likedBy?.includes(session?.user?.email)}
          userEmail={session?.user?.email}
        />
        <MarkasRead
          blogId={blog._id}
          initialRead={blog.readBy?.includes(session?.user?.email)}
          userEmail={session?.user?.email}
        />
        <MarkasSaved
          blogId={blog._id}
          initialSaved={blog.savedBy?.includes(session?.user?.email)}
          userEmail={session?.user?.email}
        />
      </div>

      {/* Comments Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Comments</h2>

        <div className="space-y-5 max-h-64 overflow-y-auto pr-2">
          {blog.comments?.length > 0 ? (
            blog.comments.map((comment, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {comment.user?.image ? (
                  <img
                    src={comment.user.image}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full">
                    <UserRound className="text-gray-600" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {comment.user?.username || comment.user?.name || "User"}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">{comment.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((p) => p - 1);
              fetchBlog(page - 1);
            }}
            className="text-blue-600 disabled:text-gray-400"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage((p) => p + 1);
              fetchBlog(page + 1);
            }}
            className="text-blue-600 disabled:text-gray-400"
          >
            Next
          </button>
        </div>

        {/* Comment Input */}
        <div className="mt-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={addComment}
              disabled={submitting}
              className="bg-slate-600 text-white px-5 py-2 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </div>

      {/* Extra Blogs */}
      <div className="border-t border-gray-200 mt-12 pt-6">
        <Extrablogs />
      </div>
      
    </div>
  );
};

export default ReadBlogPage;
export function ReadBlogSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
      {/* Title */}
      <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>

      {/* User info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Content blocks */}
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Image */}
      <div className="w-full h-64 bg-gray-200 rounded-lg mt-10 mb-6"></div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>

      {/* Comment Input */}
      <div className="mt-12 border-t pt-6">
        <div className="h-10 bg-gray-200 rounded mb-4 w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}
