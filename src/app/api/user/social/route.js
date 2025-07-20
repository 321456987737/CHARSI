import { auth } from "@/lib/auth";
import User from "@/model/User";
import { connectDB } from "@/lib/Connectdb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email })
    .populate("followers", "name email image")
    .populate("following", "name email image");

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    followers: user.followers,
    following: user.following,
  });
}