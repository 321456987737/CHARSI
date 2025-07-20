import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

import User from "@/model/User";
import {connectDB} from "@/lib/Connectdb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  await connectDB();

  try {
    const user = await User.findOneAndDelete({ email: session.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: delete user’s blogs or other linked content here

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Server error" });
  }
}
