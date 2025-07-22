// app/api/search/users/route.js

import User from "@/model/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.trim() === "") {
      return NextResponse.json({ users: [] });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ],
    }).limit(5);

    return NextResponse.json({ users });
  } catch (error) {
    console.error("User search error:", error);
    return NextResponse.json(
      { message: "Failed to search users" },
      { status: 500 }
    );
  }
}
