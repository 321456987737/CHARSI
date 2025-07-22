import { writeFile } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/blogconnectdb";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await connectDB();

    // Parse FormData using Web API
    const formData = await req.formData();
    const file = formData.get("image");
    const email = formData.get("email");

    if (!file || !email) {
      return NextResponse.json({ success: false, message: "Missing image or email" }, { status: 400 });
    }

    // Get buffer from the uploaded file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename and path
    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    // Save the file
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`; // This can be accessed directly from public

    // Update user document
    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { profileImage: imageUrl },
      { new: true }
    );

    return NextResponse.json({ success: true, image: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
