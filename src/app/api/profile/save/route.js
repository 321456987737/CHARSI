// app/api/profile/save/route.js
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/Connectdb";
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
   // console.log("Received form data:", formData);
    // Always lowercase and trim email for consistency
    const email = formData.get("email");
    const aboutText = formData.get("aboutText");
    const file = formData.get("image"); // type: File
   console.log(aboutText);
    let imageUrl = null;

    // Save image if uploaded
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${uuidv4()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", filename);

      await writeFile(uploadPath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // Only update profileImage if a new image is uploaded
    const updateFields = { aboutText };
    if (imageUrl) {
      updateFields.profileImage = imageUrl;
    }

    // Upsert user profile (create or update)
    const updated = await User.findOneAndUpdate(
      { email },
      updateFields,
      { upsert: true, new: true }
    );
    console.log("Profile updated:", updated);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}


export async function GET (req){
 try{
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: user });
 }catch(err){
  return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
 } 
}