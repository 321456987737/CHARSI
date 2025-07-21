// /pages/api/admin/searchblogs.js

import Blog from "@/model/Blog"; // Your Blog model
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/blogconnectdb";
export  async function GET(req) {
  await connectDB();
    const { searchParams } = new URL(req.url); // ✅ Correct way
  const q = searchParams.get("q"); // ✅ Get 'q' value

   console.log(q);
  if (!q || q.trim() === "") {
    return NextResponse.json({ blogs: [], success: true }, { status: 200 });
  }

  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { "author.name": { $regex: q, $options: "i" } }
      ]
    })
      .limit(10)
      .select("_id title username description createdAt");

   return NextResponse.json({ blogs, success: true }, { status: 200 });
  } catch (err) {
    console.error("Admin Search Error:", err);
    return NextResponse.json({ error: "Failed to search blogs" }, { status: 500 });
  }
}
