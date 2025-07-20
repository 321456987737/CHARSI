"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { ImageIcon, Lock, MoreHorizontal, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// Left Section Component
export function ProfileLeftSection() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("home");
  const [aboutText, setAboutText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const [readblogs, setReadblogs] = useState([]);

  const username = session?.user?.name || "Ifti Hazara";
  const userImage = session?.user?.image;

  const handlePhotoInsert = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleSave = async () => {
    if (!session?.user?.email) return alert("User not authenticated");

    const formData = new FormData();
    formData.append("email", session.user.email);
    formData.append("aboutText", aboutText);
    if (fileInputRef.current?.files?.[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/profile/save", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        alert("Profile saved successfully!");
      } else {
        alert("Failed to save profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error while saving.");
    }
    setLoading(false);
  };

  const getreadblogs = async () => {
    const response = await axios.get("/api/mark-as-read", {
      params: { email: session?.user?.email }
    });
    setReadblogs(response.data.blogs || []);
  };

  useEffect(() => {
    if (session?.user?.email) {
      getreadblogs();
    }
  }, [session?.user?.email]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await axios.get("/api/profile/save", {
          params: { email: session.user.email }
        });
        if (res.data.success && res.data.data?.aboutText) {
          setAboutText(res.data.data.aboutText);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchProfile();
  }, [session?.user?.email]);

  return (
    <div className="w-full md:w-2/3 md:pr-10">
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-bold">{username}</h1>
        <MoreHorizontal className="text-gray-500 cursor-pointer" />
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 mt-6 border-b border-gray-300 text-sm font-medium">
        <button
          onClick={() => setActiveTab("home")}
          className={`pb-3 ${
            activeTab === "home"
              ? "border-black border-b-2 text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`pb-3 ${
            activeTab === "about"
              ? "border-black border-b-2 text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          About
        </button>
      </div>

      {/* Content: Home */}
      {activeTab === "home" && (
        <div className="mt-6 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              {userImage ? (
                <img
                  src={userImage}
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="User Avatar"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <UserRound size={16} />
                </div>
              )}
              <span className="font-medium text-sm">{username}</span>
            </div>
            <MoreHorizontal className="text-gray-500" size={18} />
          </div>
          <div className="px-4 py-6">
            <h2 className="text-lg font-bold mb-2">Reading list</h2>
            {readblogs.length === 0 ? (
              <p className="text-gray-500 text-sm flex items-center">
                No stories <Lock size={14} className="ml-1" />
              </p>
            ) : (
              <ul>
                {readblogs.map((blog) => (
                  <li key={blog._id} className="border-b py-4">
                    <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
                      <div className="flex items-center gap-4">
                        {blog.primaryImage && (
                          <img
                            src={blog.primaryImage}
                            alt={blog.title}
                            className="w-24 h-20 object-cover rounded-md border"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{blog.title}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2 mb-1">{blog.description}</p>
                          <div className="flex items-center text-xs text-gray-400 gap-4">
                            <span>By {blog.username}</span>
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span>{blog.category}</span>
                            <span>Likes: {blog.likes}</span>
                            <span>Views: {blog.views}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Content: About */}
      {activeTab === "about" && (
        <form
          className="mt-6 space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSave();
          }}
        >
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Write something about yourself..."
            rows={4}
            className="w-full border-none border-b focus:outline-none resize-none placeholder-gray-400 text-base"
          />

          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-40 h-auto rounded-md border"
              />
            </div>
          )}

          {/* Insert photo & Save */}
          <div className="flex items-center justify-between">
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="text-green-600 flex items-center text-sm font-medium hover:underline"
              >
                <ImageIcon className="w-4 h-4 mr-1" /> Insert photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoInsert}
                className="hidden"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="px-5 py-1.5 rounded-full border text-sm"
                onClick={() => {
                  setAboutText("");
                  setSelectedImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-1.5 rounded-full bg-black text-white text-sm"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          <p className="text-green-600 text-sm">1 following</p>
        </form>
      )}
    </div>
  );
}

// Right Section Component
export function ProfileRightSection() {
  const { data: session } = useSession();
  const username = session?.user?.name || "Ifti Hazara";
  const userImage = session?.user?.image;

  return (
    <aside className="hidden md:block w-1/3 border-l pl-10">
      <div className="flex flex-col items-center">
        {userImage ? (
          <img
            src={userImage}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {username.charAt(0)}
          </div>
        )}
        <h2 className="mt-4 font-semibold">{username}</h2>
        <Link
          href="/userdashboard/settings"
          className="text-green-600 mt-2 text-sm hover:underline"
        >
          Edit profile
        </Link>
      </div>
    </aside>
  );
}

// Main Profile Page Component
export default function ProfilePage() {
  return (
    <div className="flex pt-[150px] justify-center w-full max-w-screen-xl mx-auto px-4 md:px-10 py-10">
      <ProfileLeftSection />
      <ProfileRightSection />
    </div>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useSession } from "next-auth/react";
// import { ImageIcon, Lock, MoreHorizontal, UserRound } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";

// export default function ProfilePage() {
//   const { data: session } = useSession();
//   const [activeTab, setActiveTab] = useState("home");
//   const [aboutText, setAboutText] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef();

//   const username = session?.user?.name || "Ifti Hazara";
//   const userImage = session?.user?.image;

//   const handlePhotoInsert = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setSelectedImage(imageURL);
//     }
//   };

//   const handleSave = async () => {
//     if (!session?.user?.email) return alert("User not authenticated");

//     const formData = new FormData();
//     formData.append("email", session.user.email);
//     formData.append("aboutText", aboutText);
//     if (fileInputRef.current?.files?.[0]) {
//       formData.append("image", fileInputRef.current.files[0]);
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/profile/save", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await res.json();
//       if (result.success) {
//         alert("Profile saved successfully!");
//       } else {
//         alert("Failed to save profile.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error while saving.");
//     }
//     setLoading(false);
//   };
// const [readblogs, setReadblogs] = useState([]);
//   const getreadblogs = async () => {
//    const response = await axios.get("/api/mark-as-read", {
//   params: { email: session?.user?.email }
// });
//    setReadblogs(response.data.blogs || []);
//   console.log(response.data.blogs);
//   }
// useEffect(() => {
//   if (session?.user?.email) {
//     getreadblogs();
//   }
// }, [session?.user?.email]);

// useEffect(() => {
//   const fetchProfile = async () => {
//     if (!session?.user?.email) return;
//     try {
//       const res = await axios.get("/api/profile/save", {
//         params: { email: session.user.email }
//       });
//       if (res.data.success && res.data.data?.aboutText) {
//         setAboutText(res.data.data.aboutText);
//       }
//     } catch (err) {
//       // Optionally handle error
//     }
//   };
//   fetchProfile();
// }, [session?.user?.email]);

//   return (
//     <div className="flex pt-[150px] justify-center w-full max-w-screen-xl mx-auto px-4 md:px-10 py-10">
//       {/* Left Side */}
//       <div className="w-full md:w-2/3 md:pr-10">
//         <div className="flex justify-between items-start">
//           <h1 className="text-4xl font-bold">{username}</h1>
//           <MoreHorizontal className="text-gray-500 cursor-pointer" />
//         </div>

//         {/* Tabs */}
//         <div className="flex space-x-6 mt-6 border-b border-gray-300 text-sm font-medium">
//           <button
//             onClick={() => setActiveTab("home")}
//             className={`pb-3 ${
//               activeTab === "home"
//                 ? "border-black border-b-2 text-black"
//                 : "text-gray-500 hover:text-black"
//             }`}
//           >
//             Home
//           </button>
//           <button
//             onClick={() => setActiveTab("about")}
//             className={`pb-3 ${
//               activeTab === "about"
//                 ? "border-black border-b-2 text-black"
//                 : "text-gray-500 hover:text-black"
//             }`}
//           >
//             About
//           </button>
//         </div>

//         {/* Content: Home */}
//         {activeTab === "home" && (
//           <div className="mt-6 overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <div className="flex items-center gap-2">
//                 {userImage ? (
//                   <img
//                     src={userImage}
//                     width={32}
//                     height={32}
//                     className="rounded-full"
//                     alt="User Avatar"
//                   />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
//                     <UserRound size={16} />
//                   </div>
//                 )}
//                 <span className="font-medium text-sm">{username}</span>
//               </div>
//               <MoreHorizontal className="text-gray-500" size={18} />
//             </div>
//             <div className="px-4 py-6">
//               <h2 className="text-lg font-bold mb-2">Reading list</h2>
//               {readblogs.length === 0 ? (
//                 <p className="text-gray-500 text-sm flex items-center">
//                   No stories <Lock size={14} className="ml-1" />
//                 </p>
//               ) : (
//                 <ul>
//                   {readblogs.map((blog) => (
//                     <li key={blog._id} className="border-b py-4">
//                       <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
//                         <div className="flex items-center gap-4">
//                           {blog.primaryImage && (
//                             <img
//                               src={blog.primaryImage}
//                               alt={blog.title}
//                               className="w-24 h-20 object-cover rounded-md border"
//                             />
//                           )}
//                           <div className="flex-1">
//                             <h3 className="text-lg font-semibold mb-1 line-clamp-1">{blog.title}</h3>
//                             <p className="text-gray-500 text-sm line-clamp-2 mb-1">{blog.description}</p>
//                             <div className="flex items-center text-xs text-gray-400 gap-4">
//                               <span>By {blog.username}</span>
//                               <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//                               <span>{blog.category}</span>
//                               <span>Likes: {blog.likes}</span>
//                               <span>Views: {blog.views}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Content: About */}
//         {activeTab === "about" && (
//           <form
//             className="mt-6 space-y-6"
//             onSubmit={async (e) => {
//               e.preventDefault();
//               await handleSave();
//             }}
//           >
//             <textarea
//               value={aboutText}
//               onChange={(e) => setAboutText(e.target.value)}
//               placeholder="Write something about yourself..."
//               rows={4}
//               className="w-full border-none border-b focus:outline-none resize-none placeholder-gray-400 text-base"
//             />

//             {selectedImage && (
//               <div className="mt-4">
//                 <img
//                   src={selectedImage}
//                   alt="Selected"
//                   className="w-40 h-auto rounded-md border"
//                 />
//               </div>
//             )}

//             {/* Insert photo & Save */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current.click()}
//                   className="text-green-600 flex items-center text-sm font-medium hover:underline"
//                 >
//                   <ImageIcon className="w-4 h-4 mr-1" /> Insert photo
//                 </button>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={fileInputRef}
//                   onChange={handlePhotoInsert}
//                   className="hidden"
//                 />
//               </div>

//               <div className="flex space-x-4">
//                 <button
//                   type="button"
//                   className="px-5 py-1.5 rounded-full border text-sm"
//                   onClick={() => {
//                     setAboutText("");
//                     setSelectedImage(null);
//                     if (fileInputRef.current) fileInputRef.current.value = "";
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-5 py-1.5 rounded-full bg-black text-white text-sm"
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </button>
//               </div>
//             </div>

//             <p className="text-green-600 text-sm">1 following</p>
//           </form>
//         )}
//       </div>

//       {/* Right Sidebar */}
//       <aside className="hidden md:block w-1/3 border-l pl-10">
//         <div className="flex flex-col items-center">
//           {userImage ? (
//             <img
//               src={userImage}
//               alt="Profile Picture"
//               width={100}
//               height={100}
//               className="rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
//               {username.charAt(0)}
//             </div>
//           )}
//           <h2 className="mt-4 font-semibold">{username}</h2>
//           <Link
//             href="/userdashboard/settings"
//             className="text-green-600 mt-2 text-sm hover:underline"
//           >
//             Edit profile
//           </Link>
//         </div>
//       </aside>
//     </div>
//   );
// }

