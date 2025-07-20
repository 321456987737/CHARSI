import { NextResponse } from "next/server";
import Blog from "@/model/Blog";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI_BLOG);
    }
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10"); // default: 10 comments
  const skip = (page - 1) * limit;

  try {
   
    console.log("Fetching blog with ID:", id);
    const blog = await Blog.findById(id).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const totalComments = blog.comments.length;

    // Return only the paginated slice of comments
    const paginatedComments = blog.comments
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
      .slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      blog: {
        ...blog,
        comments: paginatedComments,
        totalComments,
        page,
        totalPages: Math.ceil(totalComments / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
