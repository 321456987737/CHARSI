import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  html: String,
  image: String,
});
const commentSchema = new mongoose.Schema({
 user: {
  name: String,
  email: String,
  image: String,
  id: String,
  username: String
},
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    primaryImage: { type: String },
    sections: [sectionSchema],
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
    comments: [commentSchema],
    views: { type: Number, default: 0 },
   email: { type: String, required: true },     
   category: { type: String , required: true}, // 👈 include this
  username: { type: String, required: true },     
  status: { type: String, default: "draft" }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, 
},
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
