import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/model/Blog"; // adjust if needed

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI_BLOG);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    const total = await Blog.countDocuments();

    const blogs = await Blog.find({})
      .sort({ views: -1, likes: -1 }) // 🟢 Sort: Highest views first, then likes
      .skip(skip)
      .limit(limit)
      .lean(); // 🟢 You can keep or remove `.select(...)` to get full blog
    console.log(blogs);
    return NextResponse.json({
      success: true,
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Popular blogs fetch failed:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
