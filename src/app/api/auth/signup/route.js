import { NextResponse } from "next/server";
import { connectDB } from "@/lib/Connectdb";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const { username, email, password } = await request.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email please sign in" },
        { status: 409 } // Conflict
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Exclude password from response
    const { password: _, ...userData } = user.toObject();

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: userData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
