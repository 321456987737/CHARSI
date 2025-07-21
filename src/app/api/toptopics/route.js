
import { connectDB } from "@/lib/blogconnectdb";
import { NextResponse } from "next/server";
import Blog from "@/model/Blog";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();
    // Aggregate categories and count how many times each has been used
    const topCategories = await Blog.aggregate([
      {
        $group: {
          _id: "$category", // group by category field
          count: { $sum: 1 } // count how many blogs in each category
        }
      },
      {
        $sort: { count: -1 } // sort by count descending
      },
      {
        $limit: 7 // optional: get only top 10 categories
      }
    ]);

    return NextResponse.json({ success: true, category:topCategories }, { status: 200 });
  } catch (err) {
    console.error("Top Categories Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch top categories" },
      { status: 500 }
    );
  }
}
