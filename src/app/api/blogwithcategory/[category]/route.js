// /api/blogwithcategory/[category]/route.js
import { NextResponse } from "next/server";
import Blog from "@/model/Blog";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    await mongoose.connect(process.env.MONGODB_URI_BLOG);
    
    const blogs = await Blog.find({ category }).skip(skip).limit(limit).lean();

    return NextResponse.json({ blogs, success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
