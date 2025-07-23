"use client";
import { useEffect } from "react";
// import SuggestTopics from "@/componenets/SuggestTopics";
import BlogList from "@/componenets/BlogList";
import SuggestedBlogs from "@/componenets/SuggestedBlogs";
import useBlogStore from "@/stores/blogStore";

export default function BlogPage() {
  const { initialized, setInitialized, fetchLatestBlogs, fetchSuggestedBlogs } = useBlogStore();

  useEffect(() => {
    if (!initialized) {
      fetchLatestBlogs();
      fetchSuggestedBlogs();
      setInitialized(true);
    }
  }, [initialized, setInitialized, fetchLatestBlogs, fetchSuggestedBlogs]);

  return (
    <div className="min-h-screen bg-white pt-[85px]">
      {/* <SuggestTopics /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <BlogList />
          </div>
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <SuggestedBlogs />
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";
// import React, { useCallback, useRef, useState } from "react";
// import Link from "next/link";
// import useBlogStore from "@/stores/blogStore";
// import axios from "axios";

// const LoadBlogs = () => {
//   const blogs = useBlogStore((state) => state.blogs);
//   const suggestedBlogs = useBlogStore((state) => state.suggestedBlogs);
//   const isFiltering = useBlogStore((state) => state.isFiltering);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const observerRef = useRef(null);

//   const fetchMoreBlogs = useCallback(async () => {
//     if (isFiltering || loadingMore || !hasMore) return;
    
//     setLoadingMore(true);
//     try {
//       const res = await axios.get(`/api/blog?skip=${blogs.length}`);
//       if (res.data.success) {
//         useBlogStore.getState().setBlogs([...blogs, ...res.data.blogs]);
//         setHasMore(res.data.hasMore);
//       }
//     } catch (error) {
//       console.error("Error fetching more blogs:", error);
//     } finally {
//       setLoadingMore(false);
//     }
//   }, [blogs, isFiltering, loadingMore, hasMore]);

//   const lastBlogRef = useCallback(
//     (node) => {
//       if (loadingMore || !hasMore || isFiltering) return;
//       if (observerRef.current) observerRef.current.disconnect();
      
//       observerRef.current = new IntersectionObserver(
//         (entries) => {
//           if (entries[0].isIntersecting) {
//             fetchMoreBlogs();
//           }
//         },
//         { threshold: 0.1 }
//       );
      
//       if (node) observerRef.current.observe(node);
//     },
//     [loadingMore, hasMore, isFiltering, fetchMoreBlogs]
//   );

//   const addViews = async (id) => {
//     try {
//       await axios.patch(`/api/blog?id=${id}`);
//     } catch (err) {
//       console.error("Error updating views");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center pt-[136px]">
//       {/* Left Content - Blogs */}
//       <div className="w-[800px] mx-auto">
//         {blogs.length === 0 && !loadingMore && (
//           <div className="text-center py-24">
//             <h3 className="text-2xl font-semibold text-gray-700">No blogs found</h3>
//             <p className="text-gray-500 mt-2">Check back later for new content</p>
//           </div>
//         )}

//         <div className="space-y-4">
//           {blogs.map((blog, index) => (
//             <article
//               key={blog._id}
//               ref={!isFiltering && index === blogs.length - 1 ? lastBlogRef : null}
//               className="group"
//             >
//               <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
//                 <div
//                   onClick={() => addViews(blog._id)}
//                   className="bg-white border-gray-200 rounded-lg overflow-hidden transition"
//                 >
//                   <div className="flex flex-col md:flex-row">
//                     {/* Text section */}
//                     <div className="p-6 flex-1 flex flex-col">
//                       <div className="flex flex-wrap items-center gap-2 text-xs mb-3 text-gray-500">
//                         {blog.category && (
//                           <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-semibold">
//                             {blog.category}
//                           </span>
//                         )}
//                         <span>
//                           {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           })}
//                         </span>
//                       </div>

//                       <h2 className="text-lg md:text-2xl font-bold text-gray-800 line-clamp-2 mb-3">
//                         {blog.title}
//                       </h2>

//                       <p className="text-gray-600 line-clamp-3 text-sm md:text-base mb-4">
//                         {blog.description}
//                       </p>

//                       <div className="text-xs text-gray-500 mt-auto border-t pt-3 flex justify-between items-center">
//                         <div className="flex gap-2">
//                           <span>{blog.views} read</span>
//                           {blog.sections?.length > 0 && (
//                             <span>
//                               • {blog.sections.length} section
//                               {blog.sections.length !== 1 ? "s" : ""}
//                             </span>
//                           )}
//                         </div>
//                         <span className="text-sm font-medium text-gray-600">Read more →</span>
//                       </div>
//                     </div>

//                     {/* Image section */}
//                     {blog.primaryImage && (
//                       <div className="w-full rounded-2xl md:w-80 h-52 flex-shrink-0 bg-gray-100">
//                         <img
//                           src={blog.primaryImage}
//                           alt={blog.title}
//                           className="w-full h-full object-cover rounded-2xl"
//                           onError={(e) => {
//                             e.target.style.display = "none";
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             </article>
//           ))}
//         </div>

//         {loadingMore && (
//           <div className="py-12 flex justify-center">
//             <div className="animate-spin h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full" />
//           </div>
//         )}

//         {!hasMore && blogs.length > 0 && !isFiltering && (
//           <div className="py-12 text-center text-gray-500">
//             <p className="font-medium text-gray-600">Youve reached the end</p>
//             <p className="text-sm mt-1">No more blogs to load</p>
//           </div>
//         )}
//       </div>

//       {/* Right Content - Suggested Blogs */}
//       <div className="mr-4 w-[450px]">
//         <span className="text-2xl font-semibold">Suggested blogs</span>
//         <div className="mt-6 space-y-4">
//           {suggestedBlogs && suggestedBlogs.length > 0 ? (
//             suggestedBlogs.map((blog, index) => (
//               <Link
//                 href={`/userdashboard/readblog/${blog._id}`}
//                 key={index}
//                 className="block"
//               >
//                 <div
//                   onClick={() => addViews(blog._id)}
//                   className="bg-white border-b border-gray-200 p-4 transition"
//                 >
//                   <div className="flex flex-col">
//                     <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
//                       {blog.category && (
//                         <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-semibold">
//                           {blog.category}
//                         </span>
//                       )}
//                       <span>
//                         {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </span>
//                     </div>

//                     <h3 className="text-md font-bold text-gray-800 line-clamp-2">
//                       {blog.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                       {blog.description}
//                     </p>

//                     <div className="text-xs text-gray-500 mt-2 flex justify-between">
//                       <span>{blog.views} read</span>
//                       {blog.sections?.length > 0 && (
//                         <span>
//                           {blog.sections.length} section
//                           {blog.sections.length !== 1 ? "s" : ""}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-gray-500">No suggested blogs available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadBlogs;


// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import Link from "next/link";
// import useBlogStore from "@/stores/blogStore";

// const Page = () => {
//   const blogStoreBlogs = useBlogStore((state) => state.blogs);
//   const clearBlogs = useBlogStore((state) => state.clearBlogs);

//   const [blogs, setBlogs] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [suggestedblogs, setSuggestedBlogs] = useState([]);

//   const observerRef = useRef(null);

//   const fetchBlogs = async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/blog?skip=${skip}`);
//       if (res.data.success) {
//         setBlogs((prev) => [...prev, ...res.data.blogs]);
//         setSkip((prev) => prev + res.data.blogs.length);
//         setHasMore(res.data.hasMore);
//       }
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//     setLoading(false);
//   };

//   const getSuggestedBlogs = async () => {
//     try {
//       const res = await axios.get(`/api/recomendedblogxcharsi`);
//       setSuggestedBlogs(res.data.blogs);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     clearBlogs(); // Clear filtered blogs when the page loads
//     fetchBlogs();
//     getSuggestedBlogs();
//   }, []);

//   const lastBlogRef = useCallback(
//     (node) => {
//       if (loading || !hasMore || blogStoreBlogs.length > 0) return;
//       if (observerRef.current) observerRef.current.disconnect();
//       observerRef.current = new IntersectionObserver(
//         (entries) => {
//           if (entries[0].isIntersecting) {
//             fetchBlogs();
//           }
//         },
//         { threshold: 0.1 }
//       );
//       if (node) observerRef.current.observe(node);
//     },
//     [loading, hasMore, blogStoreBlogs.length]
//   );

//   const addViews = async (id) => {
//     try {
//       await axios.patch(`/api/blog?id=${id}`);
//     } catch (err) {
//       console.log("Failed to add views");
//     }
//   };

//   const displayedBlogs = blogStoreBlogs.length > 0 ? blogStoreBlogs : blogs;

//   return (
//     <div className="min-h-screen flex justify-center pt-[136px]">
//       {/* Left Content - Blogs */}
//       <div className="w-[800px] mx-auto">
//         {displayedBlogs.length === 0 && !loading && (
//           <div className="text-center py-24">
//             <h3 className="text-2xl font-semibold text-gray-700">No blogs found</h3>
//             <p className="text-gray-500 mt-2">Check back later for new content</p>
//           </div>
//         )}

//         <div className="space-y-4">
//           {displayedBlogs.map((blog, index) => (
//             <article
//               key={blog._id}
//               ref={
//                 blogStoreBlogs.length === 0 && index === displayedBlogs.length - 1
//                   ? lastBlogRef
//                   : null
//               }
//               className="group"
//             >
//               <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
//                 <div
//                   onClick={() => addViews(blog._id)}
//                   className="bg-white border-gray-200 rounded-lg overflow-hidden transition"
//                 >
//                   <div className="flex flex-col md:flex-row">
//                     {/* Text section */}
//                     <div className="p-6 flex-1 flex flex-col">
//                       <div className="flex flex-wrap items-center gap-2 text-xs mb-3 text-gray-500">
//                         {blog.category && (
//                           <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-semibold">
//                             {blog.category}
//                           </span>
//                         )}
//                         <span>
//                           {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           })}
//                         </span>
//                       </div>

//                       <h2 className="text-lg md:text-2xl font-bold text-gray-800 line-clamp-2 mb-3">
//                         {blog.title}
//                       </h2>

//                       <p className="text-gray-600 line-clamp-3 text-sm md:text-base mb-4">
//                         {blog.description}
//                       </p>

//                       <div className="text-xs text-gray-500 mt-auto border-t pt-3 flex justify-between items-center">
//                         <div className="flex gap-2">
//                           <span>{blog.views} read</span>
//                           {blog.sections?.length > 0 && (
//                             <span>
//                               • {blog.sections.length} section
//                               {blog.sections.length !== 1 ? "s" : ""}
//                             </span>
//                           )}
//                         </div>
//                         <span className="text-sm font-medium text-gray-600">Read more →</span>
//                       </div>
//                     </div>

//                     {/* Image section */}
//                     {blog.primaryImage && (
//                       <div className="w-full rounded-2xl md:w-80 h-52 flex-shrink-0 bg-gray-100">
//                         <img
//                           src={blog.primaryImage}
//                           alt={blog.title}
//                           className="w-full h-full object-cover rounded-2xl"
//                           onError={(e) => {
//                             e.target.style.display = "none";
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             </article>
//           ))}
//         </div>

//         {loading && (
//           <div className="py-12 flex justify-center">
//             <div className="animate-spin h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full" />
//           </div>
//         )}

//         {!hasMore && blogs.length > 0 && blogStoreBlogs.length === 0 && (
//           <div className="py-12 text-center text-gray-500">
//             <p className="font-medium text-gray-600">You’ve reached the end</p>
//             <p className="text-sm mt-1">No more blogs to load</p>
//           </div>
//         )}
//       </div>

//       {/* Right Content - Suggested Blogs */}
//       <div className="mr-4 w-[450px]">
//         <span className="text-2xl font-semibold">Suggested blogs</span>
//         <div className="mt-6 space-y-4">
//           {suggestedblogs.map((blog, index) => (
//             <Link
//               href={`/userdashboard/readblog/${blog._id}`}
//               key={index}
//               className="block"
//             >
//               <div
//                 onClick={() => addViews(blog._id)}
//                 className="bg-white border-b border-gray-200 p-4 transition"
//               >
//                 <div className="flex flex-col">
//                   <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
//                     {blog.category && (
//                       <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-semibold">
//                         {blog.category}
//                       </span>
//                     )}
//                     <span>
//                       {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>

//                   <h3 className="text-md font-bold text-gray-800 line-clamp-2">
//                     {blog.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                     {blog.description}
//                   </p>

//                   <div className="text-xs text-gray-500 mt-2 flex justify-between">
//                     <span>{blog.views} read</span>
//                     {blog.sections?.length > 0 && (
//                       <span>
//                         {blog.sections.length} section
//                         {blog.sections.length !== 1 ? "s" : ""}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;




// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import useBlogStore from "@/stores/blogStore";
// import axios from "axios";

// const LoadBlogs = () => {
//   const blogs = useBlogStore((state) => state.blogs);
//   const isFiltering = useBlogStore((state) => state.isFiltering);

//   const [topViewed, setTopViewed] = useState([]);

//   // Fetch top viewed blogs (once)
//   useEffect(() => {
//     const fetchTopViewed = async () => {
//       try {
//         const res = await axios.get("/api/recomendedblogxcharsi"); // <- make sure this route exists
//         setTopViewed(res.data.blogs);
//       } catch (error) {
//         console.error("Failed to fetch top viewed blogs", error);
//       }
//     };

//     fetchTopViewed();
//   }, []);

//   const addViews = async (id) => {
//     try {
//       await axios.patch(`/api/blog?id=${id}`);
//     } catch (err) {
//       console.error("Error updating views");
//     }
//   };

//   const renderBlogCard = (blog) => (
//     <article key={blog._id} className="group">
//       <Link href={`/userdashboard/readblog/${blog._id}`} className="block">
//         <div
//           onClick={() => addViews(blog._id)}
//           className="bg-white border border-gray-200 rounded-lg overflow-hidden transition hover:shadow-md"
//         >
//           <div className="flex flex-col md:flex-row">
//             {/* TEXT SECTION */}
//             <div className="p-6 flex-1 flex flex-col">
//               <div className="flex flex-wrap items-center gap-2 text-xs mb-3 text-gray-500">
//                 {blog.category && (
//                   <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-semibold">
//                     {blog.category}
//                   </span>
//                 )}
//                 <span>
//                   {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>
//               <h2 className="text-lg md:text-2xl font-bold text-gray-800 line-clamp-2 mb-3">
//                 {blog.title}
//               </h2>
//               <p className="text-gray-600 line-clamp-3 text-sm md:text-base mb-4">
//                 {blog.description}
//               </p>
//               <div className="text-xs text-gray-500 mt-auto border-t pt-3 flex justify-between items-center">
//                 <div className="flex gap-2">
//                   <span>{blog.views} read</span>
//                   {blog.sections?.length > 0 && (
//                     <span>
//                       • {blog.sections.length} section
//                       {blog.sections.length !== 1 ? "s" : ""}
//                     </span>
//                   )}
//                 </div>
//                 <span className="text-sm font-medium text-gray-600">
//                   Read more →
//                 </span>
//               </div>
//             </div>

//             {/* IMAGE SECTION */}
//             {blog.primaryImage && (
//               <div className="w-full rounded-2xl md:w-80 h-52 flex-shrink-0 bg-gray-100">
//                 <img
//                   src={blog.primaryImage}
//                   alt={blog.title}
//                   className="w-full h-full object-cover rounded-2xl"
//                   onError={(e) => (e.target.style.display = "none")}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </Link>
//     </article>
//   );

//   return (
//     <div className="min-h-screen pt-10">
//       {/* Section 1: Top Viewed */}
//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">🔥 Top Viewed Blogs</h2>
//         {topViewed.length === 0 ? (
//           <p className="text-gray-500">No top viewed blogs yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {topViewed.map((blog) => renderBlogCard(blog))}
//           </div>
//         )}
//       </div>

//       {/* Section 2: For You */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">✨ For You</h2>
//         {blogs.length === 0 ? (
//           <div className="text-center py-24">
//             <h3 className="text-2xl font-semibold text-gray-700">
//               No blogs found
//             </h3>
//             <p className="text-gray-500 mt-2">Check back later for new content</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {[...blogs]
//               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//               .map((blog) => renderBlogCard(blog))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoadBlogs;

