
import { connectDB } from "@/lib/blogconnectdb";
import Blog from "@/model/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const allBlogs = await Blog.find({}).lean(); // lean for performance
  const totalViews = allBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

  const now = new Date();
  const monthlyMap = new Map();
  const blogGroups = new Map(); // For top 5 blogs/month

  // Step 1: Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, 0);
    blogGroups.set(key, []);
  }

  // Step 2: Group blogs per month and sum views
  allBlogs.forEach((blog) => {
    const createdAt = new Date(blog.createdAt);
    const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}`;

    if (monthlyMap.has(key)) {
      monthlyMap.set(key, monthlyMap.get(key) + (blog.views || 0));
      blogGroups.get(key).push(blog);
    }
  });

  // Step 3: Format monthly views and top blogs per month
  const monthlyViews = [];
  const topBlogsPerMonth = [];

  for (let [key, views] of monthlyMap.entries()) {
    const [year, month] = key.split("-");
    const date = new Date(year, month - 1);
    const monthName = date.toLocaleString("default", { month: "short" });

    monthlyViews.push({ month: monthName, views });

    const blogs = blogGroups.get(key);
    blogs.sort((a, b) => (b.views || 0) - (a.views || 0));

    topBlogsPerMonth.push({
      month: monthName,
      blogs: blogs.slice(0, 5).map((blog) => ({
        _id: blog._id,
        title: blog.title,
        views: blog.views || 0,
        slug: blog.slug,
        category: blog.category,
        createdAt: blog.createdAt,
      })),
    });
  }

  // Step 4: Get latest 5 blogs (sorted by createdAt desc)
  const latestBlogs = allBlogs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((blog) => ({
      _id: blog._id,
      title: blog.title,
      views: blog.views || 0,
      slug: blog.slug,
      category: blog.category,
      createdAt: blog.createdAt,
    }));

  return NextResponse.json({
    totalViews,
    monthlyViews,
    topBlogsPerMonth,
    latestBlogs, // ✅ added this
  });
}
