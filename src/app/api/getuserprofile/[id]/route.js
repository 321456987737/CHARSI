import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/blogconnectdb";

export async function GET(req,{params}) {
   await connectDB();
   const {id} = await params;
   const email = id;
   const user = await User.findOne({ email });
   if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
   }
   return NextResponse.json({ success: true, data: user });
}