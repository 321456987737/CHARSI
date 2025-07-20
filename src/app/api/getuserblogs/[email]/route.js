// GET /api/getuserblogs/[email]
import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/Connectdb";

export async function GET(req, { params }) {
  await connectDB();

  const { email } = await params; // destructure the email

  try {
    console.log(email, "this is the email of the user");

    const user = await User.findOne({email: email })
    console.log("this is the userlaskdjkla;sjkladkjldsfkjl;ads",user);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user.blogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
