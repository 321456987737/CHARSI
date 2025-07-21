import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import Blog from "@/model/Blog";

import { connectDB } from "@/lib/blogconnectdb";
// import connectDB from "@/lib/mongo";

export async function GET(req) {
  //   await connectDB();4
  await connectDB();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const elevenMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 10, 1);

  // Get all blogs by this user from the last 11 months
  const blogs = await Blog.find({
    email: userEmail,
    createdAt: { $gte: elevenMonthsAgo },
  });

  // Init monthly views
  const monthlyViews = {};
  for (let i = 0; i < 11; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - (10 - i), 1);
    const key = date.toLocaleString("default", { month: "short" });
    monthlyViews[key] = 0;
  }

  let totalViews = 0;
  let totalSaved = 0;
  let totalLikes = 0;

  blogs.forEach((blog) => {
    const created = new Date(blog.createdAt);
    const monthKey = created.toLocaleString("default", { month: "short" });

    if (monthlyViews[monthKey] !== undefined) {
      monthlyViews[monthKey] += blog.views;
    }

    // Totals
    totalViews += blog.views || 0;
    totalLikes += blog.likes || 0;
    totalSaved += blog.likedBy?.length || 0; // Change to savedBy.length if using savedBy
  });

  const formattedData = Object.entries(monthlyViews).map(([month, views]) => ({
    month,
    views,
  }));

  return NextResponse.json({
    data: formattedData,
    totalViews,
    totalSaved,
    totalLikes,
  });
}
