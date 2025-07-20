import { useState, useEffect } from "react";
import axios from "axios";

function LikeButton({ blogId, initialLikes, initialLiked, userEmail }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(initialLiked || false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!userEmail) return; // Optionally show login prompt
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
      handlelikeofuser();
    } catch (err) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };
    const handlelikeofuser = async () =>{
       try{
        await axios.patch("/api/likeblogofuser", {
          id: blogId,
          email: userEmail,
        });
       }catch (err){
        return console.error(err);
       } 
 }
  return (
    <button
  onClick={handleLike}
  disabled={loading || !userEmail}
  className={`
    px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
    flex items-center gap-2 shadow-md
    ${liked
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
    ${loading || !userEmail ? "opacity-50 cursor-not-allowed" : ""}
  `}
  title={userEmail ? "" : "Sign in to like"}
>
  {liked ? "❤️ Liked" : "🤍 Like"} <span>{likes}</span>
</button>

  );
}

export default LikeButton;