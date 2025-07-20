import { NextResponse } from "next/server";
import { connectDB } from "@/lib/Connectdb";
import fs from "fs";
import path from "path";
import User from "@/model/User";
import mongoose from "mongoose";
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const { role } = await req.json();

    console.log("Updating user:", id, "to role:", role);

    // Validate input
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    if (!["user", "admin", "writer"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified" },
        { status: 400 }
      );
    }

    // Find and update in one operation
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("Successfully updated user:", updatedUser);

    return NextResponse.json({
      success: true,
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

  } catch (err) {
    console.error("PATCH Error:", err);
    return NextResponse.json(
      { 
        error: err.message || "Server error",
        details: err.errors || null 
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🧹 Delete user's profile image if it exists and is stored in 'uploads'
    if (user.image && user.image.startsWith("/uploads/")) {
      const imagePath = path.join(process.cwd(), "public", user.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("User image deleted:", imagePath);
      }
    }

    // 🗑️ Delete user from DB
    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "User and image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
