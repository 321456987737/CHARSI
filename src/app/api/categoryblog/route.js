import Blog from "@/model/Blog";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET (req){
   try{
      console.log(req.url);
      if (!mongoose.connections[0].readyState) {
         await mongoose.connect(process.env.MONGODB_URI_BLOG);
      }
      console.log("Connected to MongoDB for category blog fetch", req);
      const { searchParams } = new URL(req.url);
      const category = searchParams.get("category");
      console.log(category);
      const blogs = await Blog.find({ category }).lean();
      console.log(blogs);
      return NextResponse.json({ success: true, blogs });   
   }catch(err){
      return NextResponse.json({ error: "Failed to fetch blogs", success: false }, { status: 500 });
   }
}