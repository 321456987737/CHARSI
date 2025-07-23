import { NextResponse } from "next/server";
import Blog from "@/model/Blog";
import { connectDB } from "@/lib/blogconnectdb";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const formData = await req.formData();
    console.log(1)
    const json = JSON.parse(formData.get("data")); // blog data as JSON string
    const { email, username, category } = json;
    console.log(11)
    
    // handle primary image
    const primaryImage = formData.get("primaryImage");
    let primaryImagePath = null;
        console.log(111)

    if (primaryImage && primaryImage.name) {
      const bytes = await primaryImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageName = `${uuidv4()}-${primaryImage.name}`;
      const imagePath = path.join(process.cwd(), "public/uploads", imageName);
      await writeFile(imagePath, buffer);
      primaryImagePath = `/uploads/${imageName}`;
    }
        console.log(1111)

    // handle section images
    const sections = await Promise.all(
      json.sections.map(async (section, idx) => {
        const file = formData.get(`sectionImage-${idx}`);
        let imagePath = null;
        if (file && file.name) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const imageName = `${uuidv4()}-${file.name}`;
          const imagePathFull = path.join(
            process.cwd(),
            "public/uploads",
            imageName
          );
          await writeFile(imagePathFull, buffer);
          imagePath = `/uploads/${imageName}`;
        }
        return {
          ...section,
          image: imagePath,
        };
      })
    );
    await connectDB();
    const newBlog = await Blog.create({
      ...json,
      username: username,
      category: category,
      email: email,
      primaryImage: primaryImagePath,
      sections: sections,
    });
        console.log(11111)

    console.log(newBlog);
    console.log(1);
    const notification = {
        userId: newBlog.userId,
        blogId: newBlog._id,
        email: newBlog.email,
        username: newBlog.username,
        title: newBlog.title,
        read: false
     }
         console.log(111111)

    return NextResponse.json({ success: true, blog: newBlog,notification:notification }, { status: 201 });
  } catch (err) {
    console.error("Error saving blog:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create blog" },
      { status: 500 }
    );
  }
}

// ... existing code ...

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip")) || 0;
    const limit = parseInt(searchParams.get("limit")) || 2;
    await connectDB();
    const totalBlogs = await Blog.countDocuments();

    // Fetch blogs with pagination
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Calculate if there are more blogs
    const hasMore = skip + blogs.length < totalBlogs;

    return NextResponse.json({
      success: true,
      blogs,
      hasMore,
      total: totalBlogs,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
export async function PATCH(req) {
  try {
    // Extract ID from search params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    // Connect to MongoDB if not already connected
  await connectDB();
    // Increment the views field by 1
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // Increment `views` field by 1
      { new: true, upsert: false } // Return updated document, do not create if not found
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, blog: updatedBlog },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
