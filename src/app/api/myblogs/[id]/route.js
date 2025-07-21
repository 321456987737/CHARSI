import { NextResponse } from "next/server";

import { connectDB } from "@/lib/blogconnectdb";
import Blogs from "@/model/Blog";
export async function GET (req, {params}){
   await connectDB();
  try{
    const { id } = await params;
   const email = id;
   const blogs = await Blogs.find({email}).lean().limit(4);
   return NextResponse.json({blogs});
  }catch(err){
     return NextResponse.json({ error: "Failed to fetch blogs", success: false }, { status: 500 });
  }
}
