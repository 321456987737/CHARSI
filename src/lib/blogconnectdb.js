import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI_BLOG;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    // If already connected, return the connection
    return cached.conn;
  }
  if (mongoose.connection.readyState === 1) {
    // If mongoose is already connected, use that
    cached.conn = mongoose.connection;
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}