import { connectDB } from "@/lib/connectnotify"
import { NextResponse } from "next/server"
import Notification from "@/model/Notification"
export async function POST(req){
   try{
      console.log(1)
      await connectDB();
       const data = await req.json();
      console.log(1)
      console.log(data,"this is the datat ");

    // Validate required fields
    const { blogId, email, username, title } = data;
    if ( !blogId || !email || !username || !title) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }
      console.log(1,"this si me ")
    const newNotification = await Notification.create(data);
    console.log(newNotification,"this is the new notification ");
    return NextResponse.json({ success: true, notification: newNotification }, { status: 201 });
   }catch(err){
      return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
   }
}