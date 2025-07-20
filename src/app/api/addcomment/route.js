import Blog from "@/model/Blog";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI_BLOG);

    const { id, user, text } = await req.json();
   console.log(id, user, text);
   console.log(1)
    // new comment object
    const newComment = {
      user, // can be name/email/image as a string, or whole object
      comment: text,
      createdAt: new Date(),
    };
console.log(1)
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $push: { comments: newComment },
        $inc: { commentsCount: 1 },
      },
      { new: true }
    );
console.log(1)
    if (!updatedBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updatedBlog }, { status: 200 });
  } catch (err) {
    console.error("PATCH /addcomment error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
