import User from "@/model/User";
import Blog from "@/model/Blog";
import { connectDB } from "@/lib/Connectdb";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB(); // Ensure DB is connected

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  // Ensure savedblogs is always an array
  const savedblogs = user.savedblogs || [];

  // Find all blogs whose _id is in user.savedblogs
  const blogs = await Blog.find({ _id: { $in: savedblogs } });

  return NextResponse.json({ success: true, data: blogs });
}