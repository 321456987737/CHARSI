import { connectDB } from "@/lib/blogconnectdb";
import User from "@/model/User";
import Blog from "@/model/Blog";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
   console.log(1)
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const user = await User.findOne({ email }); // <-- Find by email!
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
       console.log(1)


    // Find all blogs whose _id is in user.likedblogs
    const blogs = await Blog.find({ _id: { $in: user.likedblogs || [] } });

    return NextResponse.json({ success: true, data: blogs });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}