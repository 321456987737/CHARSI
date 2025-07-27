import { useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";

function LikeButton({ blogId, initialLikes, initialLiked, userEmail }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(initialLiked || false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!userEmail || loading) return;
    setLoading(true);
    try {
      const res = await axios.patch("/api/likeblog", {
        id: blogId,
        email: userEmail,
      });
      if (res.data) {
        setLikes(res.data.likes);
        setLiked(res.data.liked);
      }
      await axios.patch("/api/likeblogofuser", {
        id: blogId,
        email: userEmail,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  items-center justify-center  ">
      {/* <span className="text-sm text-gray-700 font-medium">
        {likes} {likes === 1 ? "like" : "likes"}
      </span> */}
      <button
        onClick={handleLike}
        disabled={!userEmail || loading}
        title={userEmail ? (liked ? "Unlike" : "Like") : "Sign in to like"}
        className={`
          p-3 rounded-full transition-all duration-200 ease-in-out
          ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}
          ${loading || !userEmail ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
        `}
      >
        <Heart
          size={22}
          className={`transition-all duration-300 ease-in-out
            ${liked ? "fill-red-500" : "fill-transparent"}
          `}
          strokeWidth={2}
        />
      </button>

    </div>
  );
}

export default LikeButton;
