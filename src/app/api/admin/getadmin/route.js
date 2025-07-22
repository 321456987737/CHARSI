import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";
import User from "@/model/User";
export async function GET (){
   try{
      await connectDB();
      const users = await User.find({role:"admin"});
      if(!users){
         return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }
      console.log(users);
      return NextResponse.json({ success: true, users: users });
   }catch(err){
      return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
   }
}