import { NextResponse } from "next/server";
import Blog from "@/model/Blog";

import { connectDB } from "@/lib/blogconnectdb";
export async function GET(req, { params }) {
  console.log(1)
  await connectDB();
  const { id } =await params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ blog });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  
  await connectDB();
  const { id } = await params;

  try {
    const body = await req.json();

    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        email: body.email,
        title: body.title,
        description: body.description,
        category: body.category,
        primaryImage: body.primaryImage,
        sections: body.sections, // contains html + image url
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
