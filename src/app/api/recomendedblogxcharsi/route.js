import mongoose from "mongoose";
import Blog from "@/model/Blog";
import { NextResponse } from "next/server";
export async function GET(){
try{
   if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI_BLOG);
   }
   const blogs = await Blog.find({})
  .sort({ views: -1 }) // Sort by views, highest first
  .limit(6)
  .lean();

   return NextResponse.json({ success: true, blogs });
}catch(err){
   return NextResponse.json({ error: "Failed to fetch blogs", success: false }, { status: 500 });
}
}