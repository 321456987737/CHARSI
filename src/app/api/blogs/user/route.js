import { auth } from "@/lib/auth"; // ⬅️ use this instead of getServerSession
import Blog from "@/model/Blog";

import { connectDB } from "@/lib/blogconnectdb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth(); // ✅ this works in App Router
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  await connectDB();
  try {
    const blogs = await Blog.find({ email: session.user.email }).sort({ createdAt: -1 });
    return NextResponse.json({ blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 });
  }
}
