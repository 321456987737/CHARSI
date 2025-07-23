import { NextResponse } from "next/server";
import connectDB from "@/lib/blogconnectdb";
import User from "@/model/User"; // your User model

export async function GET() {
  try {
    await connectDB();
   console.log(1)
    const admins = await User.find({ role: "admin" }).select("email");
   console.log(1)

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}
