import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI_BLOG;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  try {
    if (cached.conn) {
      console.log("🟢 Using cached connection");
      return cached.conn;
    }

    if (mongoose.connection.readyState === 1) {
      console.log("🟢 Already connected");
      cached.conn = mongoose.connection;
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("🟡 Connecting to MongoDB...");

      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      }).then((mongoose) => {
        console.log("✅ MongoDB Connected Successfully");
        return mongoose.connection;
      });
    }

    cached.conn = await cached.promise;

    return cached.conn;

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}