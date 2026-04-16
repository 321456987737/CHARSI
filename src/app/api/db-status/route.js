import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";
import Blog from "@/model/Blog";

export async function GET() {
  try {
    await connectDB();

    const count = await Blog.countDocuments();

    return NextResponse.json({
      success: true,
      message: "Database connected",
      totalBlogs: count,
    });

  } catch (error) {
    console.error("DB STATUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}