import { auth } from "@/lib/auth";
import User from "@/model/User";
import { connectDB } from "@/lib/Connectdb";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Use session-based authentication
  const session = await auth();
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json({ bio: user.bio || "" });
}

export async function PATCH(req) {
  // Use session-based authentication
  const session = await auth();
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  const body = await req.json();
  const { bio } = body;
  user.bio = bio || "";
  await user.save();
  return NextResponse.json({ message: "Bio updated" });
}
