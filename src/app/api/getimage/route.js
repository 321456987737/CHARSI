import { connectDB } from "@/lib/Connectdb";
import { NextResponse } from "next/server";
import User from "@/model/User";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "email is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne(
      { email },
      { profileImage: 1, _id: 0 }
    );

    if (!user || !user.profileImage) {
      return NextResponse.json({ success: false, message: "User or profile image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, image: user.profileImage }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to fetch profile image" }, { status: 500 });
  }
}