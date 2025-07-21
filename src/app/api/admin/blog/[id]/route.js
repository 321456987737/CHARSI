import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";

import Blog from "@/model/Blog"; // adjust path based on your setup
import fs from "fs";
import path from "path";
export async function PATCH(req, { params }) {
  try {
      await connectDB();
    const { id } = await params;
    const { status } = await req.json();
    const updated = await Blog.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ blog: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
     await connectDB();
    const {id} = await params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // 1. Delete primary image
    if (blog.primaryImage) {
      const primaryPath = path.join(process.cwd(), "public", blog.primaryImage);
      if (fs.existsSync(primaryPath)) {
        fs.unlinkSync(primaryPath);
      }
    }

    // 2. Delete secondary images (array)
    if (Array.isArray(blog.secondaryImages)) {
      blog.secondaryImages.forEach((imgPath) => {
        const fullPath = path.join(process.cwd(), "public", imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    // 3. Delete blog from DB
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: "Blog and images deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
