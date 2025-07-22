import { auth } from "@/lib/auth";
import User from "@/model/User";
import { connectDB } from "@/lib/blogconnectdb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user.notificationSettings || {});
}

export async function PATCH(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const body = await req.json();
  user.notificationSettings = body;
  await user.save();
  return NextResponse.json({ message: "Notification settings updated" });
}