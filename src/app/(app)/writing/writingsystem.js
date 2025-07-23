"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

const TOOLBAR_OPTIONS = [
  { label: "H1", type: "custom", level: 1 },
  { label: "H2", type: "custom", level: 2 },
  { label: "Normal", type: "custom", level: "normal" },
  { label: "B", command: "bold", title: "Bold" },
  { label: "I", command: "italic", title: "Italic" },
  { label: "UL", command: "insertUnorderedList", title: "Bullet List" },
];

const BlogEditor = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [primaryImage, setPrimaryImage] = useState(null);
  const [primaryImageFile, setPrimaryImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [sections, setSections] = useState([
    { id: Date.now(), html: "<p><br></p>", image: null, imageFile: null },
  ]);
  const username =
    session?.user?.name ||
    session?.user?.username ||
    session?.user?.email.split("@")[0];
  const fileInputs = useRef({});
  const sectionImageInputs = useRef({});
  const sectionRefs = useRef({});

  const handlePrimaryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrimaryImage(URL.createObjectURL(file));
      setPrimaryImageFile(file);
    }
  };

  const handleSectionImageChange = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, image: url, imageFile: file } : s))
    );
  };

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        html: "<p><br></p>",
        image: null,
        imageFile: null,
      },
    ]);
  };

  const handleRemoveSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSectionInput = (e, id) => {
    const html = e.currentTarget.innerHTML;
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, html } : s)));
  };

  const handleRemoveSectionImage = (id) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, image: null, imageFile: null } : s
      )
    );
    if (sectionImageInputs.current[id])
      sectionImageInputs.current[id].value = null;
  };

  const applyCommand = (command, value = null, id) => {
    const ref = sectionRefs.current[id];
    if (!ref) return;
    ref.focus();
    document.execCommand(command, false, value);
  };

  const insertHeading = (level, id) => {
    const ref = sectionRefs.current[id];
    if (!ref) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const block = document.createElement("p");

    if (level === 1) {
      block.className = "text-3xl font-bold mb-2";
      block.textContent = "Heading 1";
    } else if (level === 2) {
      block.className = "text-2xl font-semibold mb-2";
      block.textContent = "Heading 2";
    } else {
      block.className = "mb-2 text-[16px]";
      block.textContent = "Normal text";
    }

    range.deleteContents();
    range.insertNode(block);
    range.setStartAfter(block);
    range.setEndAfter(block);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const handleSaveBlog = async () => {
    try {
      const formData = new FormData();

      // Format section data
      const formattedSections = sections.map(({ id, html }) => ({
        id,
        html,
      }));

      const blogPayload = {
        email,
        username,
        title,
        category: selectedCategory, // 👈 include this
        description: blogDesc,
        sections: formattedSections,
      };

      formData.append("data", JSON.stringify(blogPayload));

      if (primaryImageFile) {
        formData.append("primaryImage", primaryImageFile);
      }

      sections.forEach((section, index) => {
        if (section.imageFile) {
          formData.append(`sectionImage-${index}`, section.imageFile);
        }
      });
      const res = await axios.post("/api/blog", formData);
      console.log(res.data);
      if (res.data.success) {
       await axios.post("/api/notify", res.data.notification);
      }
      await axios.patch(`/api/setuserblog?email=${email}`, {
        blogId: res.data.blog._id, // blogId must be a string (the MongoDB ObjectId)
      });
      // Reset form
      setTitle("");
      setBlogDesc("");
      setPrimaryImage(null);
      setPrimaryImageFile(null);
      setSections([
        { id: Date.now(), html: "<p><br></p>", image: null, imageFile: null },
      ]);
    } catch (err) {
      toast.error("Error saving blog.");
      console.error(err);
    }
  };

  useEffect(() => {
    sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (el && section.html) {
        el.innerHTML = section.html;
      }
    });
  }, []);

  const categories = [
    "Self Improvement",
    "Technology",
    "Data Science",
    "Writing",
    "Relationships",
    "Machine Learning",
    "Productivity",
    "Business",
    "Money",
    "Psychology",
    "Politics",
    "Python",
    "Health",
    "Mental Health",
    "Life",
    "JavaScript",
    "Design",
    "Startup",
    "Culture",
    "Entrepreneurship",
    "Artificial Intelligence",
    "Coding",
    "Books",
    "Work",
    "Blockchain",
    "Education",
    "Marketing",
    "Humor",
    "Social Media",
    "Society",
    "Software Development",
    "Cryptocurrency",
    "Science",
    "Deep Learning",
    "Leadership",
    "History",
    "Web Development",
    "Apple",
    "Women",
    "Nft",
    "Lifestyle",
    "UX",
    "React",
    "Software Engineering",
    "Android",
    "Mindfulness",
    "Sexuality",
    "Programming",
  ];

  return (
    <div className="mx-auto mt-8 w-[95%] md:w-[80%] lg:w-[60%] pb-20">
  {/* Primary Image */}
  <div className="mb-6 flex flex-col items-center">
    <div className="relative w-full flex justify-center">
      {primaryImage ? (
        <div className="relative w-full">
          <img
            src={primaryImage}
            alt="Primary"
            className="w-full max-h-72 object-cover rounded-xl border"
          />
          <button
            onClick={() => {
              setPrimaryImage(null);
              setPrimaryImageFile(null);
            }}
            className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputs.current.primary.click()}
          className="px-6 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-200 text-center w-full sm:w-auto"
        >
          + Add Primary Image
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        ref={(el) => (fileInputs.current.primary = el)}
        onChange={handlePrimaryImageChange}
        style={{ display: "none" }}
      />
    </div>
  </div>

  {/* Title */}
  <div className="mb-4">
    <input
      type="text"
      placeholder="Blog Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="text-2xl md:text-3xl font-semibold placeholder-gray-500 outline-none px-4 py-3 rounded-xl bg-gray-100 w-full shadow-sm focus:ring-2 focus:ring-gray-300"
    />
  </div>

  {/* Blog Description */}
  <div className="mb-8">
    <textarea
      placeholder="Blog Description"
      value={blogDesc}
      onChange={(e) => setBlogDesc(e.target.value)}
      className="w-full p-4 rounded-lg bg-gray-50 outline-none resize-none text-base leading-relaxed placeholder-gray-500 shadow-sm border border-gray-200 focus:ring-2 focus:ring-gray-300"
      rows={2}
    />
  </div>

  {/* Category Selector */}
  <div className="w-full flex items-center justify-center mb-6">
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-md text-sm sm:text-base"
    >
      <option value="" disabled>
        Select a category
      </option>
      {categories.map((category, index) => (
        <option value={category} key={index}>
          {category}
        </option>
      ))}
    </select>
  </div>

  {/* Blog Sections */}
  <h2 className="text-lg sm:text-xl font-bold mb-4">Blog Sections</h2>
  {sections.map((section) => (
    <div
      key={section.id}
      className="relative mb-8 p-4 bg-white rounded-xl shadow border border-gray-200"
    >
      {/* Delete Button */}
      <button
        onClick={() => handleRemoveSection(section.id)}
        title="Delete section"
        className="absolute top-2 right-2 text-red-600 hover:bg-red-100 border border-red-200 rounded-full h-[28px] w-[28px] flex items-center justify-center"
      >
        ×
      </button>

      {/* Toolbar */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {TOOLBAR_OPTIONS.map((tool) => (
          <button
            key={tool.label}
            onClick={() =>
              tool.type === "custom"
                ? insertHeading(tool.level, section.id)
                : applyCommand(tool.command, tool.value || null, section.id)
            }
            title={tool.title}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Section Image */}
      <div className="mb-3">
        {section.image ? (
          <div className="relative">
            <img
              src={section.image}
              alt="Section"
              className="w-full max-h-56 object-cover rounded-lg border"
            />
            <button
              onClick={() => handleRemoveSectionImage(section.id)}
              className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm"
              title="Remove image"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={() => sectionImageInputs.current[section.id]?.click()}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 w-full sm:w-auto"
          >
            + Add Section Image
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={(el) => (sectionImageInputs.current[section.id] = el)}
          onChange={(e) => handleSectionImageChange(e, section.id)}
          style={{ display: "none" }}
        />
      </div>

      {/* Editable Section */}
      <div
        ref={(el) => (sectionRefs.current[section.id] = el)}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => handleSectionInput(e, section.id)}
        className="w-full p-4 rounded-lg bg-gray-50 outline-none min-h-[100px] text-base leading-relaxed shadow-sm border border-gray-200 focus:ring-2 focus:ring-gray-300 whitespace-pre-wrap break-words"
      ></div>
    </div>
  ))}

  {/* Add Section */}
  <div className="flex justify-center mt-4">
    <button
      onClick={handleAddSection}
      className="h-[36px] w-[36px] text-xl rounded-full bg-green-100 border border-green-300 hover:bg-green-200 transition flex items-center justify-center"
      title="Add section"
    >
      +
    </button>
  </div>

  {/* Save Button */}
  <div className="flex justify-end mt-6">
    <button
      onClick={handleSaveBlog}
      className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
    >
      Publish Blog
    </button>
  </div>
</div>
  );
};

export default BlogEditor;
