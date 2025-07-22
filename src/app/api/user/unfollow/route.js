import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

import User from "@/model/User";
import { connectDB } from "@/lib/blogconnectdb";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Missing email" });

  await connectDB();

  const currentUser = await User.findOne({ email: session.user.email });
  const targetUser = await User.findOne({ email });

  if (!currentUser || !targetUser)
    return res.status(404).json({ message: "User not found" });

  currentUser.following.pull(targetUser._id);
  targetUser.followers.pull(currentUser._id);

  await currentUser.save();
  await targetUser.save();

  res.status(200).json({ message: "Unfollowed successfully" });
}
