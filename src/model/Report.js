import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);
