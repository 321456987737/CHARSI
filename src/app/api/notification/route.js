import { connectDB } from "@/lib/connectnotify";
import User from "@/model/User";
import Notification from "@/model/Notification";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Step 1: Find the current user by email
    const user = await User.findOne({ email });

    // Step 2: Handle empty following
    if (!user || !user.following || user.following.length === 0) {
      return NextResponse.json({ success: true, notifications: [] });
    }

    // Step 3: Get emails of all followed users (whose IDs are in user.following)
    const followedUsers = await User.find(
      { _id: { $in: user.following } },
      "email"
    );

    const followedEmails = followedUsers.map((u) => u.email);

    // Step 4: Find notifications where email is in followedEmails
    const notifications = await Notification.find({
      email: { $in: followedEmails },
      read: false, // Change to true if you want to show read notifications
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, notifications });

  } catch (err) {
    console.error("Error fetching notifications:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
await connectDB();

    await Notification.findByIdAndUpdate(id, { read: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
