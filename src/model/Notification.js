import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  blogId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

