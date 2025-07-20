import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/Connectdb";

export async function PATCH(req) {
  try {
    await connectDB();

    // Parse email from query string, blogId from JSON body
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const { blogId } = await req.json();
    console.log(email, blogId);
    if (!email || !blogId) {
      return NextResponse.json(
        { success: false, message: "Email and blogId required" },
        { status: 400 }
      );
    }

    // Add blogId to user's blogs array (avoiding duplicates)
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $addToSet: { blogs: blogId } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("setuserblog error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}