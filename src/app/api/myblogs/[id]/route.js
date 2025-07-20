import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blogs from "@/model/Blog";
export async function GET (req, {params}){
   await mongoose.connect(process.env.MONGODB_URI_BLOG);
  try{
    const { id } = await params;
   const email = id;
   const blogs = await Blogs.find({email}).lean().limit(4);
   return NextResponse.json({blogs});
  }catch(err){
     return NextResponse.json({ error: "Failed to fetch blogs", success: false }, { status: 500 });
  }
}
