import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

import User from "@/model/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/blogconnectdb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { currentPassword, newPassword } = req.body;

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch)
    return res.status(400).json({ message: "Current password is incorrect" });

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
}
