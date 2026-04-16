
import { connectDB } from "@/lib/blogconnectdb";
import Blog from "@/model/Blog";
import { NextResponse } from "next/server";
export async function GET(){
   try{
      console.log(1)
      await connectDB();
   const blogs = await Blog.find({})
  .sort({ views: -1 }) // Sort by views, highest first
  .limit(6)
//   .populate("author", "username profileImage") // ✅ populate only specific fields
  .lean();
      console.log(2)

   return NextResponse.json({ success: true, blogs });
}catch(err){
   return NextResponse.json({ error: "Failed to fetch blogs", success: false }, { status: 500 });
}
}