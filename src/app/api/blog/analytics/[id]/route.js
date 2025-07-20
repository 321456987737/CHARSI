// /app/api/blog/analytics/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/model/Blog";

export async function GET(req, { params }) {
  try {
    // connect (use your shared util if you have it)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI_BLOG);
    }

    const { id } = await params;
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Build last 12 months window
    const now = new Date();
    const last12Months = Array.from({ length: 12 }).map((_, i) => {
      const dt = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      return {
        label: dt.toLocaleString("default", { month: "short" }), // e.g. "Jan"
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
      };
    });

    // Map monthly views from blog doc
    const mv = blog.monthlyViews || [];
    const views = last12Months.map(({ label, year, month }) => {
      const found = mv.find((v) => v.year === year && v.month === month);
      return { month: label, views: found?.count || 0 };
    });

    // Calculate total views properly
    const monthlyTotal = views.reduce((a, c) => a + c.views, 0);
    const totalViews = blog.views ?? monthlyTotal;

    // If no monthly data but we have total views, distribute views to current month
    if (monthlyTotal === 0 && totalViews > 0) {
      const currentMonth = now.toLocaleString("default", { month: "short" });
      const currentMonthIndex = views.findIndex(v => v.month === currentMonth);
      if (currentMonthIndex !== -1) {
        views[currentMonthIndex].views = totalViews;
      }
    }
    
    const likes = blog.likes ?? 0;
    const commentsCount = blog.comments?.length ?? 0;
    const status = blog.status ?? "draft";
    return NextResponse.json(
      {
        blog: {
          _id: blog._id,
          title: blog.title,
          username: blog.username,
          status: status,
          category: blog.category,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
          likes,
          commentsCount,
          views: totalViews,
        },
        views, // [{month:"Aug",views:10},...]
        totalViews,
        monthlyTotal, // Add this for debugging
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Analytics Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}