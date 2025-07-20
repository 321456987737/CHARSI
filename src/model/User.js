import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    aboutText: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    readblogs: { type: [String], default: [] }, // Array of blog IDs
    likedblogs: { type: [String], default: [] }, // Array of blog IDs
    savedblogs: { type: [String], default: [] }, // Array of blog IDs
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    status: { type: String, default: "active" },
    role: {
  type: String,
  enum: ["user", "admin", "writer"],
  default: "user"
},
    bio: {
      type: String,
      default: "a",
    },
    notificationSettings: {
      emailNotifications: { type: Boolean, default: true },
      followerAlerts: { type: Boolean, default: true },
      blogActivity: { type: Boolean, default: true },
    },

    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    content: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
