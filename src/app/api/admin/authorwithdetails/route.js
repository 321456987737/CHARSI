import { connectDB } from "@/lib/Connectdb";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const Users = await User.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // ✅ fetch only needed fields
   console.log(Users);
    const totalusers = await User.countDocuments();
    const totalPages = Math.ceil(totalusers / limit);

    return NextResponse.json({ Users, totalPages });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { message: "Failed", Users: [], totalPages: 1 },
      { status: 500 }
    );
  }
}
