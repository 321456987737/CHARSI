import mongoose from "mongoose";
import Blog from "@/model/Blog";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI_BLOG);
    }   // e.g. ?page=2'
    const { searchParams } = new URL(req.url);
    const currentid = searchParams.get("id");
    console.log(currentid);
    const limit = 6;

    const blogs = await Blog.find({ _id: { $ne: currentid } })  // exclude current blog
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      { error: "Failed to fetch blogs", success: false },
      { status: 500 }
    );
  }
}
