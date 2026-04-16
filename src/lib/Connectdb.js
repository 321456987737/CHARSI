import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  console.log(11)
  
  if (cached.conn) {
    // If already connected, return the connection
    return cached.conn;
  }
   console.log(cached.conn,"connection")
  console.log(11)

  if (mongoose.connection.readyState === 1) {
    // If mongoose is already connected, use that
    cached.conn = mongoose.connection;
     console.log(cached.conn,"connection")
    return cached.conn;
  }
    console.log(11)

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose.connection);
  }
    console.log(11)
  console.log(cached.conn,"connection")
  cached.conn = await cached.promise;
    console.log(11)

  return cached.conn;
}