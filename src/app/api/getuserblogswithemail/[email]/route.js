import Blog from "@/model/Blog";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/blogconnectdb";
export async function GET (req, { params }) {
   await connectDB();
   const { email } =await params;
   try {
      const blogs = await Blog.find({ email }).lean().limit(4);
      return NextResponse.json({ success: true, blogs });
   } catch (err) {
      return NextResponse.json({ error: "Failed to fetch blogs", success: false }, { status: 500 });
   }
}