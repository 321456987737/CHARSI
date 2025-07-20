// /model/BlogView.js
import mongoose from "mongoose";

const BlogViewSchema = new mongoose.Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    ip: String, // optional, if tracking by IP
  },
  { timestamps: true }
);

export default mongoose.models.BlogView || mongoose.model("BlogView", BlogViewSchema);
