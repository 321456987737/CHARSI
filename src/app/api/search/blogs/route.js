import { NextResponse } from "next/server";

import { connectDB } from "@/lib/blogconnectdb";
import Blog from "@/model/Blog";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  await connectDB();
  if (!q) {
    return NextResponse.json({ blogs: [] });
  }
  const blogs = await Blog.find({
    title: { $regex: q, $options: "i" },
  }).limit(5);

  return NextResponse.json({ blogs });
}
