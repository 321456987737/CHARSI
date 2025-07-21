import Blog from "@/model/Blog";

import { connectDB } from "@/lib/blogconnectdb";
import { NextResponse } from "next/server";

export async function GET (req){
   try{
      console.log(req.url);
      await connectDB();
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