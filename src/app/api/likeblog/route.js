import { NextResponse } from "next/server";
import Blog from "@/model/Blog";

import { connectDB } from "@/lib/blogconnectdb";
export async function PATCH(req) {
  try {
    
    const { id, email } = await req.json();
    await connectDB();
    const blog = await Blog.findById(id);
     

    if (!blog) return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
   

    let liked;
    
    if (blog.likedBy.includes(email)) {
      // Unlike
      blog.likedBy = blog.likedBy.filter((e) => e !== email);
      blog.likes = Math.max(0, blog.likes - 1);
      liked = false;
    } else {
      // Like
      blog.likedBy.push(email);
      blog.likes += 1;
      liked = true;
    }
    await blog.save();

    return NextResponse.json({ success: true, likes: blog.likes, liked });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Failed to update like" }, { status: 500 });
  }
}