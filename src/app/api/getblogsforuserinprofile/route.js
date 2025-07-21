import { NextResponse } from "next/server";
import Blog from "@/model/Blog";

import { connectDB } from "@/lib/blogconnectdb";
export async function GET(req) {
  try {
    await connectDB();
    // Connect to MongoDB

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const skip = parseInt(searchParams.get("skip")) || 0;

    // Validate required parameters
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate page and limit
    if (page < 1) {
      return NextResponse.json(
        { success: false, message: "Page must be greater than 0" },
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { success: false, message: "Limit must be between 1 and 50" },
        { status: 400 }
      );
    }

    if (skip < 0) {
      return NextResponse.json(
        { success: false, message: "Skip must be 0 or greater" },
        { status: 400 }
      );
    }

    // Calculate skip value (use provided skip or calculate from page)
    const actualSkip = skip > 0 ? skip : (page - 1) * limit;

    // Get total count for pagination info
    const total = await Blog.countDocuments({ email });

    // Fetch blogs with pagination
    const blogs = await Blog.find({ email })
      .sort({ createdAt: -1 }) // newest first
      .skip(actualSkip)
      .limit(limit)
      .select("title description createdAt primaryImage")
      .lean(); // Use lean() for better performance

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasMore = (actualSkip + blogs.length) < total;
    const currentPage = Math.floor(actualSkip / limit) + 1;

    return NextResponse.json({
      success: true,
      data: blogs,
      total,
      page: currentPage,
      pages: totalPages,
      hasMore,
      loaded: actualSkip + blogs.length,
      remaining: Math.max(0, total - (actualSkip + blogs.length)),
      skip: actualSkip,
      limit
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongooseError') {
      return NextResponse.json(
        { success: false, message: "Database connection error" },
        { status: 503 }
      );
    }

    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, message: "Invalid parameter format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}