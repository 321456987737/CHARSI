import Blog from "@/model/Blog";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI_BLOG);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("_id title status createdAt views category username"); // ✅ fetch only needed fields
   console.log(blogs);
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    return NextResponse.json({ blogs, totalPages });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { message: "Failed", blogs: [], totalPages: 1 },
      { status: 500 }
    );
  }
}
