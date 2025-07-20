import { NextResponse } from "next/server";
import { connectDB } from "@/lib/Connectdb";
import User from "@/model/User";

export async function PATCH(req) {
  try {
    const { blogId, email } = await req.json();
    console.log(blogId, email);
   console.log(1)
    if (!blogId || !email) {
      return NextResponse.json({ error: "Missing blogId or email" }, { status: 400 });
    }
   console.log(1)

    await connectDB();
   console.log(1)

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
   console.log(1)

    // Ensure savedblogs is always an array
    user.savedblogs = user.savedblogs || [];
   console.log(1)

    const isSaved = user.savedblogs.includes(blogId);
   console.log(1)

    if (isSaved) {
      user.savedblogs = user.savedblogs.filter((id) => id !== blogId);
    } else {
      user.savedblogs.push(blogId);
    }
   console.log(111)

   await User.updateOne(
  { email },
  isSaved
    ? { $pull: { savedblogs: blogId } }
    : { $addToSet: { savedblogs: blogId } }
);
    return NextResponse.json({ success: true, saved: !isSaved });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}