
import User from "@/model/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";
export async function GET(req) {
   await connectDB();
  const allUsers = await User.find({});

  const now = new Date();
  const monthlyMap = new Map();

  // Step 1: Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, 0);
  }

  // Step 2: Count users per month
  allUsers.forEach((user) => {
    const createdAt = new Date(user.createdAt);
    const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}`;
    if (monthlyMap.has(key)) {
      monthlyMap.set(key, monthlyMap.get(key) + 1);
    }
  });

  // Step 3: Format data for frontend
  const monthlyUsers = Array.from(monthlyMap.entries()).map(([key, count]) => {
    const [year, month] = key.split("-");
    const date = new Date(year, month - 1);
    const monthName = date.toLocaleString("default", { month: "short" });
    return { month: monthName, count };
  });

  return NextResponse.json({
    totalUsers: allUsers.length,
    monthlyUsers,
  });
}
