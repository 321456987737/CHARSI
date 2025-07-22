// /pages/api/admin/searchblogs.js

import User from "@/model/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";
export  async function GET(req) {
   await connectDB();
   console.log("papajonson")
    const { searchParams } = new URL(req.url); // ✅ Correct way
  const q = searchParams.get("q"); // ✅ Get 'q' value

   console.log(q);
  if (!q || q.trim() === "") {
    return NextResponse.json({ users: [], success: true }, { status: 200 });
  }

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { "email": { $regex: q, $options: "i" } }
      ]
    })
      .limit(10)
      .select(
  "_id username email aboutText profileImage readblogs likedblogs savedblogs blogs status role bio notificationSettings followers following content password createdAt updatedAt"
)
   console.log(users);

   return NextResponse.json({ users, success: true }, { status: 200 });
  } catch (err) {
    console.error("Admin Search Error:", err);
    return NextResponse.json({ error: "Failed to search users" }, { status: 500 });
  }
}
