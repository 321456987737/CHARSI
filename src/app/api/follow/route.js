// /app/api/check-follow-status/route.js
import { connectDB } from "@/lib/Connectdb";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  console.log(1)
  try {
    const body = await req.json();
    const { followerId, followingId } = body;
  console.log(1)

    console.log("Checking follow status:", { followerId, followingId });

    if (!followerId || !followingId) {
      return NextResponse.json(
        { error: "Missing required fields: followerId, followingId" },
        { status: 400 }
      );
    }

    await connectDB();
  console.log(1)

    // Find users
    const followerUser = await User.findOne({ email: followerId });
    const followingUser = await User.findById(followingId);

    if (!followerUser || !followingUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

  console.log(1)
    // Check if follower is following the target user
    const isFollowing = followerUser.following.includes(followingUser._id);
  console.log(1)

    return NextResponse.json({
      isFollowing,
      followerId: followerUser._id,
      followingId: followingUser._id,
    }, { status: 200 });

  } catch (err) {
    console.error("Check follow status error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}