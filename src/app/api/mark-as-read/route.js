import { NextResponse } from "next/server";
import User from "@/model/User";
import Blog from "@/model/Blog";
import { connectDB } from "@/lib/Connectdb";

export async function PATCH(req) {
  try {
    await connectDB();

    const { id, email } = await req.json(); // id = blogId

    // Get user by email instead of ID if that's your auth model
    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    // Push blogId into readblogs if not already present
    if (!user.readblogs.includes(id)) {
      user.readblogs.push(id);
      await user.save();
      return NextResponse.json({ success: true, message: "Marked as read" });
    } else {
      return NextResponse.json({ success: true, message: "Already marked as read" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to update" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    await connectDB();
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    const blogs = await Blog.find({ _id: { $in: user.readblogs } });

    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to fetch read blogs" }, { status: 500 });
  }
}
