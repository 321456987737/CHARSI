import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    console.log("Connected to database 1");
    const { username, email, password } = await request.json();
    console.log("Connected to database 2 ");

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    console.log("Connected to database 3");


    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email please sign in" },
        { status: 409 } // Conflict
      );
    }
    console.log("Connected to database 4");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username, email, password, hashedPassword);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("Connected to database 55");

    // Exclude password from response
    const { password: _, ...userData } = user.toObject();
    console.log("Connected to database 6" );

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
